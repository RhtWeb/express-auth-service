// if u make a class first letter to be capital its just a convention
// its a personal choice to use class or function some feel goos to group in class

import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
interface RegisterUserRequest extends Request {
    body: UserData;
}

export class AuthController {
    constructor(private userService: UserService) {}

    async register(req: RegisterUserRequest, res: Response) {
        const { firstName, lastName, email, password } = req.body;
        const user = await this.userService.create({
            firstName,
            lastName,
            email,
            password,
        });
        res.status(201).json(user);
    }
}

// Normally we make a instance of class and export it acc to Singleton pattern

// But Since we want to do Dependency Injestion - we will export the class itself and instansiate it after import in routes

// Service layer should not containe framework code or middleware, It should be free of it and only pure JS/TS code, So that is could easily copied from one codebase to another

// Use Dependency Injection for DeCoupling
