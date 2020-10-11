import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import Role from "./Role";
import bcrypt from 'bcryptjs';

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  registration: number;

  @Column()
  phone: string;

  @Column()
  course: string;

  @Column()
  classe: string;

  @Column()
  college: string;

  @Column()
  born_date: Date;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @ManyToMany(() => Role)
  @JoinTable({
    name: "users_roles",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "role_id" }],
  })
  roles: Role[];
}

export default User;
