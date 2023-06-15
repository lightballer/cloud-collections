import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'bigint' })
  size: bigint;

  @Column({ type: 'timestamp' })
  upload_date: Date;

  @ManyToOne(() => User, user => user.files)
  user: User;
}
