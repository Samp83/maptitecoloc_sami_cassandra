import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserPasswordEntity } from "../databases/mysql/user.password.entity";
import { ColocMembershipEntity } from "../databases/mysql/coloc.membership.entity";
import { FinanceEntity } from "../databases/mysql/finance.entity";
import { UserToCreateDTO } from "../types/user/dtos";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CONFIG } from "../configs/constants";
import { UserPresenter } from "../types/user/presenters";
import { connectMySQLDB } from "../configs/databases/mysql.config";

export class UserService {
  private userRepository = new UserRepository();
  private passwordRepository = connectMySQLDB.getRepository(UserPasswordEntity);
  private membershipRepository = connectMySQLDB.getRepository(ColocMembershipEntity);
  private financeRepository = connectMySQLDB.getRepository(FinanceEntity);

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
      isAdmin: userToCreate.isAdmin,
    });

    // ON SAUVEGARDE L'UTILISATEUR
    const savedUser = await this.userRepository.save(createdUser);

    // ON CRÉE L'ENTITÉ DE MOT DE PASSE
    const userPassword = this.passwordRepository.create({
      password_hash,
      user: savedUser,
    });

    // ON SAUVEGARDE L'ENTITÉ DE MOT DE PASSE
    await this.passwordRepository.save(userPassword);

    // ON RETOURNE L'UTILISATEUR CRÉÉ
    return savedUser;
  }

  async loginUser(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const userPassword = await this.passwordRepository.findOne({ where: { user } });
    if (!userPassword) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, userPassword.password_hash);
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
    updatedData: Partial<UserToCreateDTO>
  ): Promise<void> {
    const update = await this.userRepository.update(id, updatedData);
    if (update === null) {
      throw new Error("User not found");
    }
    return;
  }

  async deleteUser(id: number): Promise<void> {   
    await this.membershipRepository.delete({ user: { id } });
    await this.financeRepository.delete({ user: { id } });
    await this.passwordRepository.delete({ user: { id } });

    await this.userRepository.delete(id);
  }
}