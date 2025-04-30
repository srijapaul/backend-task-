/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: string;
//   dueDate:string;
// }
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { AddTaskService } from './app.service'; // Import the service


@Controller()
export class AppController {
  constructor(private readonly addTaskService: AddTaskService) {} // Inject the service

  @EventPattern('task.add')
  async handleAddTask(@Payload() payload: { id: string;title:string }, @Ctx() context: RmqContext) {
    const { id,title} = payload;
    console.log('Task to AddTaskService');
    await this.addTaskService.handleAddTask(id,title, context); 
  }
}