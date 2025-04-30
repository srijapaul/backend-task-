/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RMQ_PATTERNS } from './constants/rmq-patterns';

@Injectable()
export class RmqProducerService {
  private clientAdd: ClientProxy;
  private clientDelete: ClientProxy;
  private clientUpdate: ClientProxy;

  constructor() {
    this.clientAdd = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ["amqps://sqmhdyqy:I5rOa1UcynmDZhPModz8nUQ7aVIGEAma@puffin.rmq2.cloudamqp.com/sqmhdyqy"],
        queue: 'task-add-queue',
        queueOptions: {
          durable: true,
        },
      },
    });
  this.clientDelete = ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ["amqps://sqmhdyqy:I5rOa1UcynmDZhPModz8nUQ7aVIGEAma@puffin.rmq2.cloudamqp.com/sqmhdyqy"],
      queue: 'task-delete-queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  
  this.clientUpdate = ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ["amqps://sqmhdyqy:I5rOa1UcynmDZhPModz8nUQ7aVIGEAma@puffin.rmq2.cloudamqp.com/sqmhdyqy"],
      queue: 'task-update-queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  }
 async addTask(taskId:string, title:string) {
  console.log("payload",taskId,title)
  return this.clientAdd.emit(RMQ_PATTERNS.ADD_TASK, {id:taskId,title });
}

  async deleteTask(taskId: string) {
    return this.clientDelete.emit(RMQ_PATTERNS.DELETE_TASK, { id: taskId });
  }

  async updateTask(taskId: string) {
    return this.clientUpdate.emit(RMQ_PATTERNS.UPDATE_TASK, {id:taskId});
  }
}
