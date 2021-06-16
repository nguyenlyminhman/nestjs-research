import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TasksStatus } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TasksModule } from './tasks.module';
import { FilterTaskDTO } from './dto/filter-task.dto';


@Injectable()
export class TasksService {
    private rs: Task[] = [];

    getAllTask(): Task[] {
        return this.rs;
    }

    getFilterTask(filterDTO: FilterTaskDTO): Task[] {
        const { status, search } = filterDTO;
        let task = this.getAllTask();
        if (status) {
            task = task.filter(task => task.status == status)
        }
        if (search) {
            task = task.filter(task => task.title.includes(search) || task.description.includes(search))
        }
        return task;
    }

    getTaskById(id: string): Task {
        let found =  this.rs.find(val => val.id === id);
        if(!found){
            throw new NotFoundException("Task not found");
        }

        return found;
    }

    deleteTask(id: string): void {
        let found = this.getTaskById(id);
        this.rs = this.rs.filter(task => task.id !== found.id)
    }

    updateTaskStatus(id: string, status: TasksStatus): Task {
        const task = this.getTaskById(id);
        task.status = status
        return task;
    }

    creatTask(createTaskDTO: CreateTaskDTO): Task {
        const { title, description } = createTaskDTO;
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TasksStatus.OPEN
        }
        this.rs.push(task);
        return task;
    }
}
