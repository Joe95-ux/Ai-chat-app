import express from "express";
import { loginController, registerController } from "../controllers/auth";

const router = express.Router();

router.post("/login", loginController);

router.post("/signup", registerController);

export default router;