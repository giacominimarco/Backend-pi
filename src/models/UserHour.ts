import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne
} from "typeorm";
import InfoStudent  from './InfoStudent';

@Entity("user_hours")
class UserHour {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  student_id: string;

  @OneToOne(() => InfoStudent, student => student.id)
  @JoinColumn({name: 'student_id'})
  infoStudent: InfoStudent;

  @Column()
  user_hour: number;

  @CreateDateColumn()
  created_at: Date;
}

export default UserHour;
