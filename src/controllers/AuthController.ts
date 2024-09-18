// if u make a class first letter to be capital its just a convention
// its a personal choice to use class or function some feel goos to group in class

import { Request, Response } from "express";

export class AuthController {
    register(req: Request, res: Response) {
        res.status(201).json();
    }
}

// Normally we make a instance of class and export it acc to Singleton pattern

// But Since we want to do Dependency Injestion - we will export the class itself and instansiate it after import
