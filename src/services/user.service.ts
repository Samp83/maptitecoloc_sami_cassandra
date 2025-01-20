import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserToCreateDTO } from "../types/user/dtos";
import bcrypt from "bcrypt";
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
      ...userToCreate,
      password_hash,
    });

    // ON SAUVEGARDE L'UTILISATEUR
    const savedUser = await this.userRepository.save(createdUser);

    // APPELER LE EMAIL SERVICE POUR ENVOYER UNE NOTIFICATION DE CREATION DE COMPTE A L'UTILISATEUR NOUVELLEMENT CRÉÉ

    // ON RETOURNE L'UTILISATEUR CRÉÉ
    return savedUser;
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
