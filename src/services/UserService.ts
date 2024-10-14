import { Repository } from "typeorm";
import { UserData } from "../controllers/AuthController";
import { User } from "../entity/User";

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        const user = await this.userRepository.save({
            firstName,
            lastName,
            email,
            password,
        });
        return user;
    }
}
