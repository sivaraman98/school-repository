import { NestFactory } from '@nestjs/core';
import { AppModule } from './school.module';
const Dotenv = require('dotenv-webpack');

new Dotenv();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
