import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth.credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        const { username, password } = authCredentialsDTO;
        const user = new User();
        const salt = await bcrypt.genSalt();

        user.username = username;
        user.password = await this.hashPassword(password, salt);
        user.salt = salt;

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
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

}