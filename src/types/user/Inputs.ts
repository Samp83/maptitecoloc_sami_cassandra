import { Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";

export class userToCreateInput {
  @Expose()
  @IsString()
  firstname: UserEntity['firstname'];

  @Expose()
  @IsString()
  lastname: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  password_hash: UserEntity['password_hash'];
}