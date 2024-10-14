import express from "express";
import { AuthController } from "../controllers/AuthController";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import { UserService } from "../services/UserService";

const router = express.Router();

// Use Dependency Injection for DeCoupling
// Inversify JS - it helps in identify the class contructor in inject the the dependency in larger project
const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

// since this should bind to class not to the current context so there are two ways to achieve this
// router.post("/register", authController.register.bind(this))
router.post("/register", (req, res) => {
    void authController.register(req, res);
});

export default router;
