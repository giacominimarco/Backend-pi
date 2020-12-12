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

  @OneToOne(() => User)
  @JoinColumn({name: 'user_id'})
  users: User;

  @Column()
  registration: number;

  @Column()
  course: string;

  @Column()
  team: string;

  @Column()
  college: string;

  @Column()
  yearOfEntry: Date;

  @CreateDateColumn()
  created_at: Date;
}

export default InfoStudent;
