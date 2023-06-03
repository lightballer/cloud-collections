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
  UseGuards,
  Req,
} from '@nestjs/common';
import { createWriteStream, statSync } from 'fs';
import { Response, Request } from 'express';
import { FilesService } from './files.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { CustomAuthGuard } from 'src/auth/auth.guard';
import jwtDecode from 'jwt-decode';

export const FileBuffer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.fileBuffer || null;
  },
);

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post(':name')
  @UseGuards(CustomAuthGuard)
  async create(
    @FileBuffer() fileBuffer,
    @Res() response: Response,
    @Req() request: Request,
    @Param('name') name: string,
  ) {
    const token = request.headers.authorization.split('Bearer ')[1];
    const { sub }: any = jwtDecode(token);

    if (fileBuffer === null) throw new BadRequestException('File is required');

    return new Promise((resolve, reject) => {
      const filePath = `./uploads/${sub}-${name}`;

      const writeStream = createWriteStream(filePath);
      writeStream.write(fileBuffer);

      writeStream.on('finish', async () => {
        const fileSize = statSync(filePath).size;

        const savedFile = await this.filesService.create({
          name,
          size: BigInt(fileSize),
          upload_date: new Date(),
          user_id: sub,
        });

        resolve(
          response
            .status(HttpStatus.CREATED)
            .send({ HttpCode: 201, Message: 'File uploaded.' }),
        );
      });

      writeStream.on('error', (error) => {
        reject(error);
      });

      writeStream.end();
    });
  }

  @Get()
  @UseGuards(CustomAuthGuard)
  findAllUserFiles(@Req() request: Request) {
    const token = request.headers.authorization.split('Bearer ')[1];
    const { sub }: any = jwtDecode(token);
    return this.filesService.findAllUserFiles(sub);
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
