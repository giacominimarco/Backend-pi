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
  typeHour_id: string;

  @ManyToOne(() => TypeHour)
  @JoinColumn({name: 'typeHour_id'})
  typeHours: TypeHour;

  @Column()
  activity: string;

  @Column()
  workload_equivalent: string;

  @Column()
  documentation_required: string;

  @Column()
  comments: string;

  @CreateDateColumn()
  created_at: Date;
}

export default EspecifyTypeHour;
