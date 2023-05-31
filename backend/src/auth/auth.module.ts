import { Module } from '@nestjs/common';
import { JwtAuthModule } from '../jwt/jwt.module';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtAuthModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
