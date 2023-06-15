import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { File } from 'src/files/entities/file.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => File, (file) => file.user)
  files: File[];
}
