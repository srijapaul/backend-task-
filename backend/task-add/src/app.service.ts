/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
// filepath: c:\Users\IT-FS-01\Documents\task1\backend\task-update\src\app.service.ts
import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class AddTaskService {
  async handleAddTask( id:string,title:string, context: RmqContext) {
    console.log('Adding task:',id);
    console.log("Title:",title)
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      // Perform task update logic here
      console.log("Task added successfully.");
      channel.ack(originalMsg); // Acknowledge the message
    } catch (error) {
      console.error('Error updating task:', error);
      channel.nack(originalMsg); // Reject the message if an error occurs
    }
  }
}