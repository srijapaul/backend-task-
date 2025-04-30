/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Task, TaskDocument } from './schema/task.schema';
import { TaskLoggerService } from './task-logger.service';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name)private readonly taskModel:Model<TaskDocument>,
    @Inject('Task-Service-Add') private readonly addClient:ClientProxy,
    @Inject('Task-Service-Delete') private readonly deleteClient:ClientProxy,
    @Inject('Task-Service-Update') private readonly updateClient:ClientProxy,
    private readonly taskLoggerService: TaskLoggerService) {}
    //fetch
    async getAllTasks(page: number, limit: number, status?: string): Promise<{ tasks: Task[]; hasMore: boolean }> {
        const pageNo=Math.max(1,page);
        const skip = (pageNo - 1) * limit; // Calculate the number of documents to skip
        const query = status && status !== "all" ? { status } : {}; // Filter by status if provided and not "all"
      
        const tasks = await this.taskModel
          .find(query)
          .skip(skip) // Skip the documents for pagination
          .limit(limit) // Limit the number of documents returned
          .exec();
      
        const totalTasks = await this.taskModel.countDocuments(query); // Get the total number of tasks
        const hasMore = skip + tasks.length < totalTasks; // Determine if there are more tasks to load
      
        return { tasks, hasMore };
      }
    //create
    async createTask(createTaskDto:{title:string,desc?:string,status:string,dueDate:Date}): Promise<Task> {
        const newTask = new this.taskModel(createTaskDto);
        const savedData= await newTask.save();
        this.taskLoggerService.log(`Task created: ${newTask.title}`); // Log the task creation
        this.addClient.emit("task.add", { id:savedData._id, title: createTaskDto.title })
        return savedData;
    }
    //delete
    async deleteTask(id:string): Promise<Task> {
        if(!isValidObjectId(id)){
            throw new Error('Invalid ID format');
        }
        console.log("id",id)
        const deletedTask= await this.taskModel.findByIdAndDelete(id);
        if(!deletedTask){
            throw new Error('Task not found');
        }
        this.taskLoggerService.log(`Task deleted: ${deletedTask.title}`); // Log the task deletion
        this.deleteClient.emit('task.delete',{id});
        return deletedTask;
    }
    //update
    async updateTask(id:string,status:string): Promise<Task> {
        if(!['todo','doing','done'].includes(status)){
            throw new Error('Invalid status');
        }
        const updatedTask = await this.taskModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedTask) {
            throw new Error('Task not found');
        }
        this.taskLoggerService.log(`Task updated: ${updatedTask.title}`); // Log the task update
        this.updateClient.emit("task.update.status",{id,status});  
    return updatedTask.save();
    }


}
