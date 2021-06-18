import { Delete, Param, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TasksStatus } from './task-status.enum';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTask(@Query(ValidationPipe) filterDTO: FilterTaskDTO): Task[] {
        if (Object.keys(filterDTO).length) {
            return this.tasksService.getFilterTask(filterDTO);
        }
        return this.tasksService.getAllTask();
    }

    @Get("/:id")
    getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(id);
    }

    @Delete("/:id")
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(id)
    }

    @Patch("/:id/status")
    updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TasksStatus) {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
        return this.tasksService.creatTask(createTaskDTO)
    }

}
