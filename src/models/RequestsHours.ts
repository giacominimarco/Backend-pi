import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne, Timestamp, OneToMany, ManyToMany
} from "typeorm";
import TypeHours  from './TypeHour';
import States  from './States';
import Solicitation  from './Solicitation';
import File from './File';
import InternalEvent from "./InternalEvent";


@Entity("requestsHours")
class RequestsHours {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  type_hour_id: string;

  @ManyToOne(() => TypeHours)
  @JoinColumn({name: 'type_hour_id'})
  typeHours: TypeHours;

  @Column()
  state_id: string;

  @ManyToOne(() => States)
  @JoinColumn({name: 'state_id'})
  states: States;

  @Column()
  file_id: string;

  @ManyToOne(() => File)
  @JoinColumn({name: 'file_id'})
  upload_file: File;

  @Column()
  solicitation_id: string;

  @ManyToOne(() => Solicitation)
  @JoinColumn({name: 'solicitation_id'})
  solicitation: Solicitation;

  @Column()
  hour: number;

  @Column()
  calculated_hours: number;

  @CreateDateColumn()
  created_at: Date;
}

export default RequestsHours;
