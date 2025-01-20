import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserToCreateDTO } from "../types/user/dtos";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CONFIG } from "../configs/constants";
import { UserPresenter } from "../types/user/presenters";
import { userToCreateInput } from "../types/user/Inputs";

export class UserService {
  private userRepository = new UserRepository();

  async registerUser(userToCreate: UserToCreateDTO): Promise<UserEntity> {
    // ON CHECK SI L'UTILISATEUR EXISTE DÉJÀ DANS LE REPOSITORY

    // ON HASH LE MOT DE PASSE
    const password_hash = await bcrypt.hash(userToCreate.password, 10);

    // ON CRÉE L'UTILISATEUR
    const createdUser = this.userRepository.create({
      firstname: userToCreate.firstname,
      lastname: userToCreate.lastname,
      email: userToCreate.email,
      is18: userToCreate.is18,
      password_hash,
      isAdmin: userToCreate.isAdmin, // Add this line
    });

    // ON SAUVEGARDE L'UTILISATEUR
    const savedUser = await this.userRepository.save(createdUser);

    // APPELER LE EMAIL SERVICE POUR ENVOYER UNE NOTIFICATION DE CREATION DE COMPTE A L'UTILISATEUR NOUVELLEMENT CRÉÉ

    // ON RETOURNE L'UTILISATEUR CRÉÉ
    return savedUser;
  }

  async loginUser(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const accessToken = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, CONFIG.JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, CONFIG.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  async getUserById(id: number): Promise<UserPresenter | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      is18: user.is18,
      isActive: user.isActive,
      isAdmin: user.isAdmin, 
    };
  }

  async getAllUsers(): Promise<UserPresenter[]> {
    return this.userRepository.findAll();
  }

  async updateUser(
    id: number,
    updatedData: Partial<userToCreateInput>
  ): Promise<void> {
    const update = await this.userRepository.update(id, updatedData);
    if (update === null) {
      throw new Error("User not found");
    }
    return;
  }

  async deleteUser(id: number): Promise<void> {
    return await this.userRepository.delete(id);
  }
}

