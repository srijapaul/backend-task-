/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
//import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { UpdateTaskService } from './app.service';

@Module({
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name: 'RMQ_SERVICE',
  //       transport: Transport.RMQ,
  //       options: {
  //         urls: ['"amqps://sqmhdyqy:I5rOa1UcynmDZhPModz8nUQ7aVIGEAma@puffin.rmq2.cloudamqp.com/sqmhdyqy"'],
  //         queue: 'task_queue',
  //         queueOptions: {
  //           durable: false,
  //         },
  //       },
  //     },
  //   ]),
  // ],
  controllers: [AppController],
  providers: [UpdateTaskService],
})
export class AppModule {}