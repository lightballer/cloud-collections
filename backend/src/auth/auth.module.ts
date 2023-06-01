import { Module } from '@nestjs/common';

import { JwtStrategy } from '../jwt/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule],
  providers: [AuthService, JwtStrategy, JwtService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
