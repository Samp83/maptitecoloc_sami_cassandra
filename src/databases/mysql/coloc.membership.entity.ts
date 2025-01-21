import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { ColocEntity } from "./coloc.entity";

@Entity("coloc_memberships")
export class ColocMembershipEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.memberships)
  user: UserEntity;

  @ManyToOne(() => ColocEntity, coloc => coloc.membres)
  coloc: ColocEntity;
}