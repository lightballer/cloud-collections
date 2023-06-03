import {
  Controller,
  Body,
  Post,
  Req,
  UnauthorizedException,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { isTokenValid } from './isTokenValid';
import { CustomAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const { access_token } = await this.authService.login(loginDto);
    return { access_token };
  }

  @Put('/verify')
  async verify(@Req() request: Request) {
    const token = request.headers.authorization;
    if (isTokenValid(token)) return {};
    throw new UnauthorizedException('Token is not valid');
  }

  @Get('/protected')
  @UseGuards(CustomAuthGuard)
  async protectedRoute() {
    return true;
  }
}
