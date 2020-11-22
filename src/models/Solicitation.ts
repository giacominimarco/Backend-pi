import { request } from "express";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import RequestsHours from './RequestsHours';

@Entity("solicitations")
class Solicitation {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => RequestsHours, request => request.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'solicitation_id'})
  requestsHours: RequestsHours[]
}

export default Solicitation;
