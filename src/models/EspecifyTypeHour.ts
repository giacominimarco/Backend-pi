import { response } from "express";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn, ManyToOne, JoinColumn
} from "typeorm";
import TypeHour from "./TypeHour";

@Entity("especify_type_hours")
class EspecifyTypeHour {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  type_hour_id: string;

  @ManyToOne(() => TypeHour)
  @JoinColumn({name: 'type_hour_id'})
  typeHours: TypeHour;

  @Column()
  activity: string;

  @Column()
  workload_equivalent: number;

  @Column()
  documentation_required: string;

  @Column()
  comments: string;

  @CreateDateColumn()
  created_at: Date;
}

export default EspecifyTypeHour;
