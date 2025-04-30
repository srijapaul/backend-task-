/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { DeleteTaskService } from './app.service'; 

@Controller()
export class AppController {
  constructor(private readonly deleteTaskService: DeleteTaskService) {} 

  @EventPattern('task.delete') // Listen for the 'task.delete' event
  async handleDeleteTask(@Payload() payload: { id: string }, @Ctx() context: RmqContext) {

    const { id } = payload; 
    console.log('Task deletion to DeleteTaskService');
    await this.deleteTaskService.handleDeleteTask(id, context);
  }
}