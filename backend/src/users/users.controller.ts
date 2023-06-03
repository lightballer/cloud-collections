import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CustomAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import jwt_decode from 'jwt-decode';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByUsername(
      createUserDto.email,
    );
    if (existingUser)
      throw new BadRequestException('User with such email already exists');
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // @UseGuards(CustomAuthGuard)
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get(':id')
  @UseGuards(CustomAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Get()
  @UseGuards(CustomAuthGuard)
  getUserInfo(@Req() request: Request) {
    const token = request.headers.authorization.split('Bearer ')[1];
    console.log(token);
    const decoded: any = jwt_decode(token);
    const id = decoded.sub;
    return this.usersService.findById(+id);
  }
}
