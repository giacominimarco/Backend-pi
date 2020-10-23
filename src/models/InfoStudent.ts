import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import User  from './User';

@Entity("infoStudent")
class infoStudent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => User, {nullable: true})
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

  @CreateDateColumn()
  created_at: Date;
}

export default infoStudent;
