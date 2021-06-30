import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { FilterTaskDTO } from "./dto/filter-task.dto";
import { TaskEntity } from "./task.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity>{
    getTasks(
        filterDTO: FilterTaskDTO,
        user: User
    ): Promise<TaskEntity[]> {
        const { status, search } = filterDTO;
        let query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', {userId: user.id});

        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere('(task.title like :search or task.description like :search)', { search: `%${search}%` })
        }
        console.info(query.getSql()); // sprint sql
        let rs = query.getMany();
        return rs;
    }
}