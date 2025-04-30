import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
 
  app.enableCors(
    {
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  )
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: false,
   // forbidNonWhitelisted: true,

  }));
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Application is running on: http://127.0.0.1:${port}`);
}
bootstrap();
