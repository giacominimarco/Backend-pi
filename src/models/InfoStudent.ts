import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne, OneToOne
} from "typeorm";
import User  from './User';

@Entity("infoStudent")
class InfoStudent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn({name: 'user_id'})
  users: User;

  @Column()
  hour: number;

  @Column()
  registration: number;

  @Column()
  course: string;

  @Column()
  team: string;

  @Column()
  college: string;

  @CreateDateColumn()
  created_at: Date;
}

export default InfoStudent;
