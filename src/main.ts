import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { implementDoc } from './Doc/doc';
import * as config from './config.json';
const mongoose = require('mongoose');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await mongoose.connect(config.mongoDB.linkConnection, {
    useNewUrlParser: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  implementDoc('api/doc', app);
  await app.listen(4200);
}
bootstrap();
