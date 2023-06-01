import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByUsername(username);
    const [storedPassword, salt] = user.password.split('|');
    const hashedPassword = await bcrypt.hash(password, salt);

    if (storedPassword === hashedPassword) return user;

    return null;
  }

  async login(loginUserDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);
    if (user) {
      const payload = { username: email, sub: user.id };
      return { access_token: this.jwtService.sign(payload) };
    }

    throw new UnauthorizedException();
  }
}
