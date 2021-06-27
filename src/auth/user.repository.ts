import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth.credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        const { username, password } = authCredentialsDTO;
        const user = new User();
        user.username = username;
        user.password = password;
        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505')
                throw new ConflictException('Username already exist.')
            throw new InternalServerErrorException()
        }
    }
    async signIn() {

    }

}