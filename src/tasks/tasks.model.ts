export interface Task {
    id: string;
    title: string;
    description: string;
    status: TasksStatus;
}

export enum TasksStatus {
    OPEN = 'OPEN',
    IN_GROGRESS = 'IN_GROGRESS',
    DONE = 'DONE'
}