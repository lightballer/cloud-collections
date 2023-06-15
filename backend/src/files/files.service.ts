import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  create(createFileDto: CreateFileDto) {
    return this.fileRepository.save(createFileDto);
  }

  async findAllUserFiles(userId) {
    return this.fileRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  findOne(id: number, userId: number) {
    return this.fileRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
    });
  }

  update(id: number, userId: number, updateFileDto: UpdateFileDto) {
    return this.fileRepository.update(
      { id, user: { id: userId } },
      { name: updateFileDto.name },
    );
  }

  remove(id: number, userId: number) {
    return this.fileRepository.delete({ id, user: { id: userId } });
  }
}
