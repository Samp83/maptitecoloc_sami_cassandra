import { Expose } from "class-transformer";
import { IsString, IsNumber, IsDate, IsInt } from "class-validator";
import { FinanceEntity } from "../../databases/mysql/finance.entity";

export class FinanceResponsePresenter {
  @Expose()
  @IsInt()
  id: FinanceEntity['id'];

  @Expose()
  @IsString()
  type: FinanceEntity['type'];

  @Expose()
  @IsNumber()
  montant: FinanceEntity['montant'];

  @Expose()
  @IsDate()
  date: FinanceEntity['date'];

  @Expose()
  @IsString()
  userFirstname: string;

  @Expose()
  @IsString()
  userLastname: string;
}