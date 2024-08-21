import { Router } from "express";
import { createUser, getUser, signin } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/signup", createUser);

router.post("/signin", signin);

router.get("/", authMiddleware, getUser);

export const userRouter = router;
