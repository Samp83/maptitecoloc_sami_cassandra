import { Repository } from "typeorm";
import { UserEntity } from "../databases/mysql/user.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { userToCreateInput } from "../types/user/Inputs";

export class UserRepository {
  private userDB: Repository<UserEntity>;

  constructor() {
    this.userDB = connectMySQLDB.getRepository(UserEntity);
  }

  create(user: userToCreateInput): UserEntity {
    const newUser = this.userDB.create(user);
    return newUser;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.userDB.save(user);
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.userDB.findOneBy({ id });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userDB.find();
  }

  async update(
    id: number,
    updatedData: Partial<userToCreateInput>
  ): Promise<UserEntity | null> {
    await this.userDB.update(id, updatedData);
    return this.userDB.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    this.userDB.delete(id);
  }
}
