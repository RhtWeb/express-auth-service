import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

import { UserData } from "../controllers/AuthController";
import { User } from "../entity/User";
import { Role } from "../constants";

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });

        if (existingUser) {
            const error = createHttpError(400, "Email already exist!");
            throw error;
        }

        const saltRounds = 10; // magic number - to be readable code
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        try {
            return await this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: Role.CUSTOMER,
            });

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            const error = createHttpError(
                500,
                "Failed to throw data in database",
            );
            throw error;
        }
    }
}
