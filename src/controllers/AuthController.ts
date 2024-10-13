// if u make a class first letter to be capital its just a convention
// its a personal choice to use class or function some feel goos to group in class

import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
interface RegisterUserRequest extends Request {
    body: UserData;
}

export class AuthController {
    async register(req: RegisterUserRequest, res: Response) {
        const { firstName, lastName, email, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        await userRepository.save({ firstName, lastName, email, password });
        res.status(201).json();
    }
}

// Normally we make a instance of class and export it acc to Singleton pattern

// But Since we want to do Dependency Injestion - we will export the class itself and instansiate it after import
