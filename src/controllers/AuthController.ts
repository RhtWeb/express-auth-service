// if u make a class first letter to be capital its just a convention
// its a personal choice to use class or function some feel goos to group in class

import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import { JwtPayload } from "jsonwebtoken";

import { UserService } from "../services/UserService";
import { validationResult } from "express-validator";

import { TokenService } from "../services/TokenService";

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
        private tokenService: TokenService,
    ) {}

    async register(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        // Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: [...result.array()] });
        }

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

            const payload: JwtPayload = {
                sub: String(user.id),
                role: user.role,
            };

            // TokenService.prototype.generateAccessToken(payload);
            const accessToken = this.tokenService.generateAccessToken(payload);

            const newRefreshToken =
                await this.tokenService.persistRefreshToken(user);

            const refreshToken = this.tokenService.generateRefreshToken({
                ...payload,
                id: newRefreshToken,
            });

            res.cookie("accessToken", accessToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60, //1hr
                httpOnly: true, //important
                // secure: true, // https
            });

            res.cookie("refreshToken", refreshToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 365, //1yr
                httpOnly: true, //important
                // secure: true, // https
            });

            res.status(201).json({ ...user, password: undefined });
        } catch (err) {
            next(err);
        }
    }
}

// Normally we make a instance of class and export it acc to Singleton pattern

// But Since we want to do Dependency Injestion - we will export the class itself and instansiate it after import in routes

// Controller layer should not containe framework code or middleware, It should be free of it and only pure JS/TS code, So that is could easily copied from one codebase to another

// Use Dependency Injection for DeCoupling
