import { Module } from '@nestjs/common';
import { JwtAuthModule } from '../jwt/jwt.module';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtAuthModule, UsersModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
