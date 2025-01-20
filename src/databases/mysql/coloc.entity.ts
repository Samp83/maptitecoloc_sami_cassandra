import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("colocs")
export class ColocEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  proprietaire: string;

  @Column({ length: 50 })
  admin_coloc: string;

  @Column({ length: 50 })
  addresse: string;

  @Column({  })
  surface: number;

  @Column()  
  nb_de_piece: number;

  @Column({ })
  loyer: number;

}
