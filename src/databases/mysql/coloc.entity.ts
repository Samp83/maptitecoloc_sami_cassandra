import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { ColocMembershipEntity } from "./coloc.membership.entity";

@Entity("colocs")
export class ColocEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  admin_coloc: string;

  @Column({ length: 50 })
  addresse: string;

  @Column()
  surface: number;

  @Column()
  nb_de_piece: number;

  @Column()
  loyer: number;

  @ManyToOne(() => UserEntity, user => user.colocs)
  proprietaire: UserEntity;

  @OneToMany(() => ColocMembershipEntity, membership => membership.coloc)
  membres: ColocMembershipEntity[];
}