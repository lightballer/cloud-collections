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
    const files = await this.fileRepository
      .createQueryBuilder('files')
      .where('files.user_id = :userId', { userId })
      .getMany();

    return files;
  }

  findOne(id: number, userId: string) {
    return this.fileRepository
      .createQueryBuilder('files')
      .where('files.user_id = :userId', { userId })
      .where('files.id = :id', { id })
      .getOne();
  }

  update(id: number, userId: string, updateFileDto: UpdateFileDto) {
    return this.fileRepository
      .createQueryBuilder('files')
      .update()
      .set({ ...updateFileDto })
      .where('user_id = :userId', { userId })
      .andWhere('id = :id', { id })
      .execute();
  }

  remove(id: number, userId: string) {
    return this.fileRepository
      .createQueryBuilder('files')
      .where('files.user_id = :userId', { userId })
      .where('files.id = :id', { id })
      .delete()
      .execute();
  }
}
