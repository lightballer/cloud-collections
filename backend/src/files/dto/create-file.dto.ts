import { User } from 'src/users/entities/user.entity';

export class CreateFileDto {
  name: string;

  size: bigint;

  upload_date: Date;

  user: User;
}
