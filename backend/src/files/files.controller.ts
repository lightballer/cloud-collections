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
  NotFoundException,
} from '@nestjs/common';
import { createWriteStream, statSync, createReadStream } from 'fs';
import { Response, Request } from 'express';
import { FilesService } from './files.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { CustomAuthGuard } from 'src/auth/auth.guard';
import jwtDecode from 'jwt-decode';
// import { fileTypeFromFile } from 'file-type';
import * as mime from 'mime-types';

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

  private async getFileBuffer(path): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      const fileStream = createReadStream(path);

      fileStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      fileStream.on('end', () => {
        const fileBuffer = Buffer.concat(chunks);
        resolve(fileBuffer);
      });

      fileStream.on('error', (error) => {
        reject(error);
      });
    });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    const token = request.headers.authorization.split('Bearer ')[1];
    const { sub }: any = jwtDecode(token);
    const file = await this.filesService.findOne(+id, sub);
    if (!file) {
      throw new NotFoundException('File not found');
    }

    const { name } = file;

    const filename = `${sub}-${name}`;

    const path = `./uploads/${filename}`;

    const fileBuffer = await this.getFileBuffer(path);

    const mimeType = mime.contentType(filename);

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    res.send(fileBuffer);
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
