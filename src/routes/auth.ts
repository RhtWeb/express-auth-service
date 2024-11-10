import express, { Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/AuthController";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import { UserService } from "../services/UserService";
import logger from "../config/logger";
import registerValidator from "../validators/registerValidator";
import { TokenService } from "../services/TokenService";
import { RefreshToken } from "../entity/RefreshToken";

const router = express.Router();

// Use Dependency Injection for DeCoupling
// Inversify JS - it helps in identify the class contructor in inject the the dependency in larger project
const userRepository = AppDataSource.getRepository(User);
const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

const userService = new UserService(userRepository);
const tokenService = new TokenService(refreshTokenRepository);
const authController = new AuthController(userService, logger, tokenService);

// since this should bind to class not to the current context so there are two ways to achieve this
// router.post("/register", authController.register.bind(this))
router.post(
    "/register",
    registerValidator,
    (req: Request, res: Response, next: NextFunction) => {
        void authController.register(req, res, next);
    },
);

export default router;
