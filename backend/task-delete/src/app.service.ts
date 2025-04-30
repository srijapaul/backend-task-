/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class DeleteTaskService {
  async handleDeleteTask(id: string, context: RmqContext) {
    console.log('Deleting task:', id);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      // Perform task deletion logic here
      console.log(`Task ${id} deleted successfully.`);
      channel.ack(originalMsg); // Acknowledge the message
    } catch (error) {
      console.error('Error deleting task:', error);
      channel.nack(originalMsg); // Reject the message if an error occurs
    }
  }
}