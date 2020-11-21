import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from "typeorm";

@Entity("solicitations")
class Solicitation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Solicitation;
