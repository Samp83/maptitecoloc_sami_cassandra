import { Expose } from "class-transformer";
import { IsString, IsNumber, IsDate } from "class-validator";
import { FinanceEntity } from "../../databases/mysql/finance.entity";

export class FinanceInput {
  @Expose()
  @IsString()
  type: FinanceEntity['type'];

  @Expose()
  @IsNumber()
  montant: FinanceEntity['montant'];

  @Expose()
  @IsDate()
  date: FinanceEntity['date'];
}