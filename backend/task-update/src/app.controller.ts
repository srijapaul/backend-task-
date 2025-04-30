/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { UpdateTaskService } from './app.service'; 

@Controller()
export class AppController {
  constructor(private readonly updateTaskService: UpdateTaskService) {} 

  @EventPattern('task.update.status')
  async handleUpdateTask(@Payload() payload:{id:string}, @Ctx() context: RmqContext) {
    const {id}=payload
    console.log('Task to UpdateTaskService');
    await this.updateTaskService.handleUpdateTask(id,context); 
  }


}