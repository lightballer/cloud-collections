import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { mkdir } from 'node:fs/promises';

const createUploadsFolder = async () => {
  const path = './uploads';
  try {
    const createDir = await mkdir(path, { recursive: true });
    console.log(`created ${createDir}`);
  } catch (err) {
    console.error(err.message);
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await createUploadsFolder();
  await app.listen(3001);
}

bootstrap();
