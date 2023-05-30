import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UploadedFile,
  UseInterceptors,
  Req,
  Injectable,
  NestMiddleware,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { raw } from 'body-parser';
import { createWriteStream } from 'fs';
import { Response } from 'express';

export const FileBuffer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.fileBuffer || null;
  },
);

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@FileBuffer() fileBuffer, @Res() response: Response) {
    console.log({ fileBuffer });
    if (fileBuffer === null) throw new BadRequestException('File is required');
    const writeStream = createWriteStream(`./uploads/video.mkv`);
    writeStream.write(fileBuffer);

    return response
      .status(HttpStatus.CREATED)
      .send({ HttpCode: 201, Message: 'File uploaded.' });
    // console.log(req['fileBuffer']);
    // const fileData = Buffer.from(body);
    // const fileName = body.originalname;
    // console.log({ fileName });
    // const writeStream = createWriteStream(`./uploads/${fileName}`);
    // writeStream.write(fileData);
    // writeStream.end();
    // return 'hmm';
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
