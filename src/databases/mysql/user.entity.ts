import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  @Column()
  password_hash: string; // grosse faille de sécurité -> à ne pas faire en prod -> A mettre dans une autre table avec une relation

  @Column('boolean', {default: true})
  isActive: boolean = true;
}
