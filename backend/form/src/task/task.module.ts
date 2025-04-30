import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskSchema } from './schema/task.schema';
import { AuthModule } from '../auth/auth.module';
import { TaskLoggerService } from './task-logger.service';
import { AppModule } from '../app.module';



@Module({
  imports: [
     MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
     AuthModule,
    forwardRef(()=>AppModule)
  ],
  providers: [TaskService,TaskLoggerService],
  controllers: [TaskController],
  exports:[TaskLoggerService,TaskService]
})
export class TaskModule {}
