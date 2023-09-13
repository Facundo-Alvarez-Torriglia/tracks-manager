import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, // solo pasan los que cumplen con la validacion
    forbidNonWhitelisted:true, // directamente frena el proceso
  }),
  );
  await app.listen(4000);
}
bootstrap();
