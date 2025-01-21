import { Repository } from "typeorm";
import { FinanceEntity } from "../databases/mysql/finance.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { FinanceDTO } from "../types/finance/dtos";

export class FinanceRepository {
  private financeDB: Repository<FinanceEntity>;

  constructor() {
    this.financeDB = connectMySQLDB.getRepository(FinanceEntity);
  }

  create(finance: Partial<FinanceEntity>): FinanceEntity {
    const newFinance = this.financeDB.create(finance);
    return newFinance;
  }

  async save(finance: FinanceEntity): Promise<FinanceEntity> {
    return this.financeDB.save(finance);
  }

  async findById(id: number): Promise<FinanceEntity | null> {
    return this.financeDB.findOne({ where: { id }, relations: ["user", "coloc"] });
  }

  async delete(id: number): Promise<void> {
    this.financeDB.delete(id);
  }
}