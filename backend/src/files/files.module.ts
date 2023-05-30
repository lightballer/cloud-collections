import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FileBufferMiddleware } from './fileBuffer.middleware';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FileBufferMiddleware).forRoutes({
      path: 'files',
      method: RequestMethod.POST,
    });
  }
}
