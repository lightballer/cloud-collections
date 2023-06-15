import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FileBufferMiddleware } from './fileBuffer.middleware';
import { File } from './entities/file.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File]), TypeOrmModule.forFeature([User])],
  controllers: [FilesController],
  providers: [FilesService, UsersService],
})
export class FilesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FileBufferMiddleware).forRoutes({
      path: 'files/:name',
      method: RequestMethod.POST,
    });
  }
}
