import prisma from "@repo/db/client";
import { Router } from "express";

const router = Router();

router.get("/available", async (req, res) => {
  const availableActions = await prisma.availableAction.findMany({});

  res.json({
    availableActions,
  });
});

export const actionRouter = router;
