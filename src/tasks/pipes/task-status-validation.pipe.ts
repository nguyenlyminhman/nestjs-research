import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TasksStatus } from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly whiteListStatus = [
        TasksStatus.OPEN,
        TasksStatus.IN_GROGRESS,
        TasksStatus.DONE,
    ];

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        if (!this.isValid(value)) {
            throw new BadRequestException(`"${value} is an invalid status"`)
        }
        return value;
    }

    private isValid(status: any) {
        const idx = this.whiteListStatus.indexOf(status);
        return idx != -1;
    }
}