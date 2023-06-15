import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user: CreateUserDto = {
      email,
      password: `${hashedPassword}|${salt}`,
    };

    return this.userRepository.save(user);
  }

  async findById(id: number) {
    return this.userRepository.findOneBy({ id });    
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
