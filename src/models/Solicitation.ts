import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import InfoStudent from "./InfoStudent";
import RequestsHours from './RequestsHours';

@Entity("solicitations")
class Solicitation {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  description: string;

  @Column()
  student_id: string;

  @ManyToOne(() => InfoStudent)
  @JoinColumn({name: 'student_id'})
  infoStudent: InfoStudent;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => RequestsHours, request => request.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'solicitation_id'})
  requestsHours: RequestsHours[]
}

export default Solicitation;
