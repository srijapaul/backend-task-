/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
//import { PassportModule } from '@nestjs/passport';
//import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { ClientsModule, Transport } from '@nestjs/microservices';



@Module({
    imports: [
      ConfigModule.forRoot(
              {
                isGlobal: true,
                envFilePath: '.env',
                expandVariables: true
              }
            ),
        // JwtModule.registerAsync({
        //     imports: [ConfigModule.forRoot(
        //       {
        //         isGlobal: true,
        //         envFilePath: '.env',
        //         expandVariables: true
        //       }
        //     )],
           
        //     useFactory: async () => ({
        //         secret: process.env['JWT_SECRET'],
        //         signOptions: {
        //             expiresIn: '1h',
        //         },
        //     }),
        //     global: true,
        //     inject: [ConfigService],
        // }),
        ClientsModule.register([
          {
            name:'Task-Service-Add',
            transport:Transport.RMQ,
            options:{
              urls:["amqps://sqmhdyqy:I5rOa1UcynmDZhPModz8nUQ7aVIGEAma@puffin.rmq2.cloudamqp.com/sqmhdyqy"],
              queue:'task-add-queue',
              queueOptions:{
                durable:true
              }

            }
          },
          {
            name:'Task-Service-Delete',
            transport:Transport.RMQ,
            options:{
              urls:["amqps://sqmhdyqy:I5rOa1UcynmDZhPModz8nUQ7aVIGEAma@puffin.rmq2.cloudamqp.com/sqmhdyqy"],
              queue:'task-delete-queue',
              queueOptions:{
                durable:true
              }

            }
          },
          {
            name:'Task-Service-Update',
            transport:Transport.RMQ,
            options:{
              urls:["amqps://sqmhdyqy:I5rOa1UcynmDZhPModz8nUQ7aVIGEAma@puffin.rmq2.cloudamqp.com/sqmhdyqy"],
              queue:'task-update-queue',
              queueOptions:{
                durable:true
              }

            }
          }
        ]),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/form'),
        AuthModule,
        forwardRef(()=>TaskModule),
    ],
    controllers: [AppController],
    providers: [AppService],
    exports:[ClientsModule]
})
export class AppModule {}