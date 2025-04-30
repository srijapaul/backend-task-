/* eslint-disable prettier/prettier */
//import { Transport } from '@nestjs/microservices';
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://sqmhdyqy:I5rOa1UcynmDZhPModz8nUQ7aVIGEAma@puffin.rmq2.cloudamqp.com/sqmhdyqy'],
      queue: 'task-delete-queue',
      queueOptions: {
        durable: true,
      },
      noAck:false,
    },
  });

  console.log('Connecting to RabbitMQ...');
  await app.startAllMicroservices();
  console.log('RabbitMQ Microservice started.');
  await app.listen(3002);
  console.log('HTTP server started on port 3002');
}
bootstrap();