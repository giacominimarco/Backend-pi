import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";


@Entity("internalEvent")
class InternalEvent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  eventName: string;

  @Column()
  description: string;

  @Column()
  eventDate: Date;

  @Column()
  activeEvent: boolean;

  @Column()
  howManyHours: number;

  @Column()
  key: string;

}


export default InternalEvent;
