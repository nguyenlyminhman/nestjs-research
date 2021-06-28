import { Delete, Param, Patch, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TasksStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTask(@Query(ValidationPipe) filterDTO: FilterTaskDTO): Promise<TaskEntity[]> {
        return this.tasksService.getTask(filterDTO);
    }

    @Get("/:id")
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
        return this.tasksService.getTaskById(id);
    }

    @Delete("/:id")
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id)
    }

    @Patch("/:id/status")
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TasksStatus) {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDTO: CreateTaskDTO,
        @GetUser() user: User
    ): Promise<TaskEntity> {
        return this.tasksService.creatTask(createTaskDTO, user)
    }
}
