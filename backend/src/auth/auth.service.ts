import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    const [storedPassword, salt] = user.password.split('|');
    const hashedPassword = await bcrypt.hash(password, salt);

    if (storedPassword === hashedPassword) return user;

    return null;
  }

  async login(loginUserDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);

    if (user) {
      const payload = {
        email,
        sub: user.id,
        expirationDate: Math.floor(Date.now() / 1000) + 3600,
      };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
        }),
      };
    }

    throw new UnauthorizedException();
  }
}
