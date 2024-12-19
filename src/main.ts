import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './database/seed/seed.service';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const seedService = app.get(SeedService);
  await seedService.seedDatabase();

  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(new Logger());

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });


  Logger.log(`🚀 Aplicação rodando em: http://localhost:3000`, 'Bootstrap');
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
