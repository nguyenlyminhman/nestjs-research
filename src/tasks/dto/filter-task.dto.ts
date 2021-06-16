import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TasksStatus } from "../tasks.model";

export class FilterTaskDTO {
    @IsOptional()
    @IsIn([TasksStatus.IN_GROGRESS, TasksStatus.OPEN, TasksStatus.DONE])
    status: TasksStatus;
    
    @IsOptional()
    @IsNotEmpty()
    search: string;
}