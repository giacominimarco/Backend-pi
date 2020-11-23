import { request } from "express";
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
import RequestsHours from './RequestsHours';
import TypeHour from "./TypeHour";
import User from "./User";

@Entity("solicitations")
class Solicitation {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  description: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  users: User;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => RequestsHours, request => request.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'solicitation_id'})
  requestsHours: RequestsHours[]
}

export default Solicitation;
