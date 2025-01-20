import { Repository } from "typeorm";
import { ColocEntity } from "../databases/mysql/coloc.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { ColocInputs } from "../types/coloc/inputs";

export class ColocRepository {
  private colocDB: Repository<ColocEntity>;

  constructor() {
    this.colocDB = connectMySQLDB.getRepository(ColocEntity);
  }

  create(coloc: ColocInputs): ColocEntity {
    const newColoc = this.colocDB.create(coloc);
    return newColoc;
  }

  async save(coloc: ColocEntity): Promise<ColocEntity> {
    return this.colocDB.save(coloc);
  }

  async findById(id: number): Promise<ColocEntity | null> {
    return this.colocDB.findOneBy({ id });
  }

  async findAll(): Promise<ColocEntity[]> {
    return this.colocDB.find();
  }

  async update(
    id: number,
    updatedData: Partial<ColocInputs>
  ): Promise<ColocEntity | null> {
    await this.colocDB.update(id, updatedData);
    return this.colocDB.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    this.colocDB.delete(id);
  }
}