/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://sqmhdyqy:I5rOa1UcynmDZhPModz8nUQ7aVIGEAma@puffin.rmq2.cloudamqp.com/sqmhdyqy'],
      queue: 'task-add-queue',
      queueOptions: {
        durable: true,
      },
      noAck:false,
    },
  });

  console.log('Connecting to RabbitMQ...');
  await app.startAllMicroservices();
  console.log('RabbitMQ Microservice started.');
  await app.listen(3001);
  console.log('HTTP server started on port 3001');
}
bootstrap();