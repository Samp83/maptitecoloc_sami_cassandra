import { Expose, Type } from "class-transformer";
import { IsString, IsNumber, IsDate } from "class-validator";
import { FinanceEntity } from "../../databases/mysql/finance.entity";

export class FinanceDTO {
  @Expose()
  @IsString()
  type: FinanceEntity['type'];

  @Expose()
  @IsNumber()
  montant: FinanceEntity['montant'];

  @Expose()
  @IsString()
  date: FinanceEntity['date'];
}