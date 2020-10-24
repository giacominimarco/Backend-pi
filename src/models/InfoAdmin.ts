import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import User  from './User';

@Entity("infoAdmin")
class InfoAdmin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  users: User;

  @Column()
  registration: number;

  @Column()
  job: string;

  @Column()
  college: string;

  @CreateDateColumn()
  created_at: Date;
}

export default InfoAdmin;
