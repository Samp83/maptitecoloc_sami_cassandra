import { Expose } from "class-transformer";
import { ColocEntity } from "../../databases/mysql/coloc.entity";
import { IsString, IsEmail, IsBoolean, MinLength, IsNumber } from "class-validator";

export class ColocDTO {
  @Expose()
  @IsString()
  proprietaire: ColocEntity['proprietaire'];

  @Expose()
  @IsString()
  admin_coloc: ColocEntity['admin_coloc'];

  @Expose()
  @IsString()
  addresse: ColocEntity['addresse'];

  @Expose()
  @IsNumber()
  surface: ColocEntity['surface'];

  @Expose()
  @IsNumber()
  nb_de_piece: ColocEntity['nb_de_piece'];

  @Expose()
  @IsNumber()
  loyer: ColocEntity['loyer'];
}