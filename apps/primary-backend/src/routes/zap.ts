import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, (req: Request, res: Response) => {
  console.log("create a zap");
});

router.get("/", authMiddleware, (req: Request, res: Response) => {
  console.log("get zap");
});

router.get("/:zapId", authMiddleware, (req: Request, res: Response) => {
  console.log("get a zap");
});

export const zapRouter = router;
