import { Expose } from "class-transformer";
import { IsString, IsEmail, IsBoolean, MinLength } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";

export class UserToCreateDTO {
  @Expose()
  @IsString()
  firstname: UserEntity['firstname'];

  @Expose()
  @IsString()
  lastname: UserEntity['lastname'];

  @Expose()
  @IsEmail()
  email: UserEntity['email'];

  @Expose()
  @IsString()
  @MinLength(6)
  password: string;

  @Expose()
  @IsBoolean()
  is18: boolean;

  @Expose()
  @IsBoolean()
  isAdmin: boolean; // Add this line
}