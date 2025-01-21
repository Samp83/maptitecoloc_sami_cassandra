import { FinanceEntity } from "../databases/mysql/finance.entity";
import { FinanceRepository } from "../repositories/finance.repository";
import { UserRepository } from "../repositories/user.repository";
import { ColocRepository } from "../repositories/coloc.repository";
import { FinanceDTO } from "../types/finance/dtos";
import { FinanceResponsePresenter } from "../types/finance/presenters";
import { plainToInstance } from "class-transformer";

export class FinanceService {
  private financeRepository = new FinanceRepository();
  private userRepository = new UserRepository();
  private colocRepository = new ColocRepository();

  async addCharge(financeToCreate: FinanceDTO, userId: number, colocId: number): Promise<FinanceResponsePresenter> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const coloc = await this.colocRepository.findById(colocId);
    if (!coloc) {
      throw new Error("Coloc not found");
    }

    const createdFinance = this.financeRepository.create({
      type: financeToCreate.type,
      montant: financeToCreate.montant,
      date: financeToCreate.date,
      user: user,
      coloc: coloc,
    });

    const savedFinance = await this.financeRepository.save(createdFinance);

    return plainToInstance(FinanceResponsePresenter, {
      id: savedFinance.id,
      type: savedFinance.type,
      montant: savedFinance.montant,
      date: savedFinance.date,
      userFirstname: user.firstname,
      userLastname: user.lastname,
    });
  }

  async removeCharge(financeId: number): Promise<void> {
    const finance = await this.financeRepository.findById(financeId);
    if (!finance) {
      throw new Error("Charge not found");
    }

    await this.financeRepository.delete(financeId);
  }

  async payMember(financeId: number, montant: number): Promise<void> {
    await this.financeRepository.payMember(financeId, montant);
  }
}