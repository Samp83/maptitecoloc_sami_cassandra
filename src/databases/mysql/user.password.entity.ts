import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("user_passwords")
export class UserPasswordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password_hash: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}