import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import InfoAdmin from "./InfoAdmin";


@Entity("internalEvent")
class InternalEvent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  info_admin_id: string;

  @OneToOne(() => InfoAdmin)
  @JoinColumn({name: 'info_admin_id'})
  infoAdmin: InfoAdmin;

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
