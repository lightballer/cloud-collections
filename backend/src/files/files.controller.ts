import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { createWriteStream } from 'fs';
import { Response } from 'express';
import { FilesService } from './files.service';
import { UpdateFileDto } from './dto/update-file.dto';

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
    if (fileBuffer === null) throw new BadRequestException('File is required');
    const writeStream = createWriteStream(`./uploads/video.mkv`);
    writeStream.write(fileBuffer);

    return response
      .status(HttpStatus.CREATED)
      .send({ HttpCode: 201, Message: 'File uploaded.' });
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
