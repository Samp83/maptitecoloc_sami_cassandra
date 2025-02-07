import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { UserPasswordEntity } from "./user.password.entity";
import { ColocEntity } from "./coloc.entity";
import { ColocMembershipEntity } from "./coloc.membership.entity";
import { FinanceEntity } from "./finance.entity";

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
  @Exclude()
  password: UserPasswordEntity;

  @OneToMany(() => ColocEntity, coloc => coloc.proprietaire)
  colocs: ColocEntity[];

  @OneToMany(() => ColocMembershipEntity, membership => membership.user)
  memberships: ColocMembershipEntity[];

  @OneToMany(() => FinanceEntity, finance => finance.user)
  finances: FinanceEntity[];
}