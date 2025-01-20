import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class ColocEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  proprietaire: string;

  @Column({ length: 50 })
  admin_coloc: string;

  @Column({ length: 50 })
  addresse: string;

  @Column({ length: 50 })
  surface: number;

  @Column({ length: 50 })  
  nb_de_piece: number;

  @Column({ length: 50 })
  loyer: number;

}
