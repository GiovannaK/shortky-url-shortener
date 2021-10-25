import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: [process.env.CLIENT_URL, process.env.API_URL],
  });
  await app.listen(parseInt(process.env.PORT) | 4000);
}
bootstrap();
