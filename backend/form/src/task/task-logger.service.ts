import { Injectable, OnModuleInit } from "@nestjs/common";
import { Subject } from "rxjs";

@Injectable()
export class TaskLoggerService implements OnModuleInit{
    onModuleInit() {
        this.tasklog$.subscribe((log) => {
            console.log("LOG RECORD",log); // Log messages to the console
        })
    }
    private tasklog$=new Subject<string>(); //observable and observer (dollar to indicate stream of data)

 log(message:string){
        this.tasklog$.next(message); //adding log messages
    }

    getLogs(){
        return this.tasklog$.asObservable(); //returning observable to subscribe to logs
    }
}