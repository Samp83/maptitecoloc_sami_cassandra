import { Expose } from "class-transformer";
import {
  IsNumber,
  IsString,
  IsEmail,
  IsBoolean,
  MinLength,
} from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";

export class UserPresenter {
  @Expose()
  @IsNumber()
  id: UserEntity["id"];

  @Expose()
  @IsString()
  firstname: UserEntity["firstname"];

  @Expose()
  @IsString()
  lastname: UserEntity["lastname"];

  @Expose()
  @IsEmail()
  email: UserEntity["email"];

  @Expose()
  @IsBoolean()
  is18: UserEntity["is18"];

  @Expose()
  @IsBoolean()
  isActive: UserEntity["isActive"];

  @Expose()
  @IsBoolean()
  isAdmin: UserEntity["isAdmin"]; // Add this line
}