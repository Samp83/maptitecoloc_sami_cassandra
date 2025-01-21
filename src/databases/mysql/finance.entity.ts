import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { ColocEntity } from "./coloc.entity";

@Entity("finances")
export class FinanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  type: string; 

  @Column()
  montant: number;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => UserEntity, user => user.finances)
  user: UserEntity;

  @ManyToOne(() => ColocEntity, coloc => coloc.finances)
  coloc: ColocEntity;
}