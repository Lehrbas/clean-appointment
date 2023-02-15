import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/ioc/app.module';
import { LoggerService } from './infra/log/logger.service';
import { AllExceptionsFilter } from './infra/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter(new LoggerService()));

  await app.listen(3000);
}
bootstrap();
