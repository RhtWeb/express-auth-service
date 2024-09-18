import express from "express";
import { AuthController } from "../controllers/AuthController";

const router = express.Router();

const authController = new AuthController();
// since this should bind to class not to the current context so there are two ways to achieve this
// router.post("/register", authController.register.bind(this))
router.post("/register", (req, res) => {
    authController.register(req, res);
});

export default router;
