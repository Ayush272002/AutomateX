import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createZap,
  getAllZaps,
  getZapWithId,
} from "../controllers/zapController";

const router = Router();

router.post("/", authMiddleware, createZap);

router.get("/", authMiddleware, getAllZaps);

router.get("/:zapId", authMiddleware, getZapWithId);

export const zapRouter = router;
