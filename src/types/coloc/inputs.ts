import { Expose } from "class-transformer";
import { IsString, IsNumber } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";

export class ColocInputs {
  @Expose()
  @IsString()
  admin_coloc: string;

  @Expose()
  @IsString()
  addresse: string;

  @Expose()
  @IsNumber()
  surface: number;

  @Expose()
  @IsNumber()
  nb_de_piece: number;

  @Expose()
  @IsNumber()
  loyer: number;

  @Expose()
  proprietaire: UserEntity; 
}