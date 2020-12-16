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
import InfoAdmin from "./InfoAdmin";
import RequestsHours from "./RequestsHours";



@Entity("logsRequestHours")
class LogsRequestHours {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  request_hour_id: string;

  @ManyToOne(() => RequestsHours)
  @JoinColumn({name: 'request_hour_id'})
  requestsHours: RequestsHours;

  @Column()
  type_hour_id: string;

  @ManyToOne(() => TypeHours)
  @JoinColumn({name: 'type_hour_id'})
  typeHours: TypeHours;

  @Column()
  especify_type_hour_id: string;

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
  solicitation_id: number;

  @ManyToOne(() => Solicitation)
  @JoinColumn({name: 'solicitation_id'})
  solicitation: Solicitation;

  @Column()
  updated_by_admin_id: string;

  @ManyToOne(() => InfoAdmin)
  @JoinColumn({name: 'updated_by_admin_id'})
  infoAdmin: InfoAdmin;

  @Column()
  hour: number;

  @Column()
  calculated_hours: number;

  @Column()
  comments: string;

  @Column()
  eventType: number;

  @Column()
  dateOfIssue: Date;

  @CreateDateColumn()
  created_at: Date;
}

export default LogsRequestHours;
