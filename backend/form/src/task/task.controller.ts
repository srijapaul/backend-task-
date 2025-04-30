/* eslint-disable @typescript-eslint/require-await */
import { TaskLoggerService } from './task-logger.service';
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AuthGuard } from '../auth/guards/auth.guard';
import { Controller, Delete, Get, Param, Post,Patch, Body, Query, UseGuards, InternalServerErrorException} from '@nestjs/common'; // Adjust the path as necessary
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schema/task.schema';
import { Roles } from '../auth/decorators/roles.decorators';


@Controller('task')
export class TaskController {
    constructor(
        private readonly tasksService:TaskService,
        private readonly taskLoggerService: TaskLoggerService,
    ) {}
    
    @Get()
    async getTasks(@Query('page') page: number = 1, @Query('limit') limit: number = 5,@Query('status')status?:string) {
       
        return this.tasksService.getAllTasks(page, limit,status);
    }

    @Get()
    async getAllTasks(@Query('page') page: number = 1,
    @Query('limit') limit: number = 5,) :Promise<{ tasks: Task[], hasMore: boolean }> {                 
        
        
        const { tasks, hasMore } = await this.tasksService.getAllTasks(page, limit);
        return { tasks, hasMore };
    }

    @Get('logs')
    async getLogs() {
        return this.taskLoggerService.getLogs(); // this method returns logs
    }

    @Post('add')
    async createTask(@Body() createTaskDto: CreateTaskDto) {
    try {
    console.log("Received task data:", createTaskDto);
    const task = await this.tasksService.createTask({
        ...createTaskDto,
        dueDate: new Date(createTaskDto.dueDate),
    }); // a service handles task creation
    console.log("Task created successfully:", task);
    return { message: "Task created successfully", task };
  } catch (error) {
    console.error("Error while creating task:", error);
    throw new InternalServerErrorException("Failed to create task");
  }
}
    @UseGuards(AuthGuard)
    @Roles('admin')
    @Delete(':id')
    async deleteTask(@Param('id') id: string) { 
        console.log("console id",id)
        return this.tasksService.deleteTask(id);
    }
    @Patch(':id')
    async updateTask(@Param('id') id: string, @Body('status') status: string) {
        return this.tasksService.updateTask(id, status);
    }


}
