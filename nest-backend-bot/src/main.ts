import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://manage-weather-bot-rishabh.vercel.app',
    ],
    methods: 'GET,HEAD,POST,PUT,DELETE,PATCH',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
