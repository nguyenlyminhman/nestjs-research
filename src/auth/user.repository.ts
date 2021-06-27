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
        await user.save();
    }

    async signIn() {

    }

}