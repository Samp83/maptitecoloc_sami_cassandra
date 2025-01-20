import { Expose } from "class-transformer";
import { IsEmail, IsString, IsBoolean } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";

export class userToCreateInput {
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
  @IsBoolean()
  is18: UserEntity['is18'];

  @Expose()
  @IsBoolean()
  isAdmin: UserEntity['isAdmin'];
}