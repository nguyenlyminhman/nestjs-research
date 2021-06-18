import { TasksStatus } from "./task-status.enum";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TasksStatus;
}

