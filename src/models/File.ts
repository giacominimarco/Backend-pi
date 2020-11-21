import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('upload_files')
class File {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  path: string;

}

export default File;
