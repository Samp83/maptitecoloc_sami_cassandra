import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { UserPasswordEntity } from "./user.password.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  is18: boolean;

  @Column('boolean', { default: true })
  isActive: boolean = true;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToOne(() => UserPasswordEntity, password => password.user)
  password: UserPasswordEntity;
}