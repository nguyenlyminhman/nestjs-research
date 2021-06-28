import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { TasksStatus } from "./task-status.enum";
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { User } from 'src/auth/user.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }


    getTask(filterDTO: FilterTaskDTO): Promise<TaskEntity[]> {
        return this.taskRepository.getTasks(filterDTO);
    }


    async getTaskById(id: number): Promise<TaskEntity> {
        let found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task ${id} not found`);
        }
        return found;
    }

    async deleteTask(id: number): Promise<void> {
        let rs = await this.taskRepository.delete(id);
        if (rs.affected === 0) {
            throw new NotFoundException(`Task ${id} not found`)
        }

    }

    async updateTaskStatus(id: number, status: TasksStatus): Promise<TaskEntity> {
        const task = await this.getTaskById(id);
        task.status = status
        task.save();
        return task;
    }


    async creatTask(createTaskDTO: CreateTaskDTO, user: User): Promise<TaskEntity> {
        const { title, description } = createTaskDTO;
        const task = new TaskEntity();

        task.title = title
        task.description = description;
        task.user = user;
        task.status = TasksStatus.OPEN;
        await task.save();
        delete task.user;
        return task;
    }
}
