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
import { UsersService } from 'src/users/users.service';

export const FileBuffer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.fileBuffer || null;
  },
);

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly usersService: UsersService,
  ) {}

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
      const uploadDate = Date.now();
      const filename = `${sub}-${uploadDate}`;
      const fileExtension = name.substring(name.lastIndexOf('.') + 1);

      const filePath = `./uploads/${filename}.${fileExtension}`;
      const writeStream = createWriteStream(filePath);
      writeStream.write(fileBuffer);

      writeStream.on('finish', async () => {
        const fileSize = statSync(filePath).size;
        const userId = sub;
        const user = await this.usersService.findById(userId);

        const savedFile = await this.filesService.create({
          name,
          size: BigInt(fileSize),
          upload_date: new Date(uploadDate),
          user,
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
  @UseGuards(CustomAuthGuard)
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const token = request.headers.authorization.split('Bearer ')[1];
    const { sub }: any = jwtDecode(token);

    return this.filesService.findOne(+id, sub);
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

  @Get(':id/raw')
  @UseGuards(CustomAuthGuard)
  async getRawOne(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log({ id });
    const token = request.headers.authorization.split('Bearer ')[1];
    const { sub }: any = jwtDecode(token);
    const file = await this.filesService.findOne(+id, sub);
    console.log({ file });
    if (!file) {
      throw new NotFoundException('File not found');
    }

    const { upload_date, name } = file;

    const fileExtension = name.substring(name.lastIndexOf('.') + 1);

    const filename = `${sub}-${new Date(upload_date).getTime()}`;

    console.log({ filename });

    const path = `./uploads/${filename}.${fileExtension}`;

    const fileBuffer = await this.getFileBuffer(path);

    console.log({ fileBuffer });

    const mimeType = mime.lookup(path);

    res.setHeader('Content-Type', mimeType);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${filename}.${fileExtension}"`,
    );

    res.send(fileBuffer);
  }

  @Patch(':id')
  @UseGuards(CustomAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateFileDto: UpdateFileDto,
    @Req() request: Request,
  ) {
    const token = request.headers.authorization.split('Bearer ')[1];
    const { sub }: any = jwtDecode(token);

    const updateResult = await this.filesService.update(
      +id,
      sub,
      updateFileDto,
    );

    return;
  }

  @Delete(':id')
  @UseGuards(CustomAuthGuard)
  async remove(@Param('id') id: string, @Req() request: Request) {
    const token = request.headers.authorization.split('Bearer ')[1];
    const { sub }: any = jwtDecode(token);
    await this.filesService.remove(+id, sub);

    return { message: 'ok' };
  }
}
