import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne, Timestamp, OneToMany
} from "typeorm";
import User  from './User';
import TypeHours  from './TypeHour';
import States  from './States';
import Solicitation  from './Solicitation';
import File from './File';


@Entity("requestsHours")
class RequestsHours {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  users: User;

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
  solicitation_id: string;

  @ManyToOne(() => Solicitation)
  @JoinColumn({name: 'solicitation_id'})
  solicitations: Solicitation;

  @Column()
  file_id: string;

  @ManyToOne(() => File)
  @JoinColumn({name: 'file_id'})
  upload_file: File;

  @Column()
  hour: number;

  @Column()
  calculated_hours: number;

  @CreateDateColumn()
  created_at: Date;
}

export default RequestsHours;
