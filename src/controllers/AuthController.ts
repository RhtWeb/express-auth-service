// if u make a class first letter to be capital its just a convention
// its a personal choice to use class or function some feel goos to group in class

import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { Logger } from "winston";

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
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {}

    async register(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        const { firstName, lastName, email, password } = req.body;

        this.logger.debug("New Request to register a User", {
            firstName,
            lastName,
            email,
            password: "*******",
        });

        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            });
            this.logger.info("User hase been registered", { id: user.id });
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }
}

// Normally we make a instance of class and export it acc to Singleton pattern

// But Since we want to do Dependency Injestion - we will export the class itself and instansiate it after import in routes

// Service layer should not containe framework code or middleware, It should be free of it and only pure JS/TS code, So that is could easily copied from one codebase to another

// Use Dependency Injection for DeCoupling
