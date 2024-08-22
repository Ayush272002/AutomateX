import { Request, Response } from "express";
import { ZapCreateSchema } from "@repo/zodtypes/types";
import prisma from "@repo/db/client";
import RequestWithUser from "../interface/RequestWithUser";

const createZap = async (req: Request, res: Response) => {
  const { id } = req as RequestWithUser;
  const body = req.body;
  const parsedData = ZapCreateSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Invalid data",
    });
  }

  const zapId = await prisma.$transaction(async (tx) => {
    const zap = await prisma.zap.create({
      data: {
        userId: id,
        triggerId: "",
        actions: {
          create: parsedData.data.actions.map((x, index) => ({
            actionId: x.availableActionId,
            sortingOrder: index,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data: {
        triggerId: parsedData.data.availableTriggerId,
        zapId: zap.id,
      },
    });

    await tx.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });

    return zap.id;
  });

  res.json({
    zapId,
  });
};

const getAllZaps = async (req: Request, res: Response) => {
  const { id } = req as RequestWithUser;
  const zaps = await prisma.zap.findMany({
    where: {
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  res.json({
    zaps,
  });
};

const getZapWithId = async (req: Request, res: Response) => {
  const { id } = req as RequestWithUser;
  const zapId = req.params.zapId;

  const zap = await prisma.zap.findFirst({
    where: {
      id: zapId,
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  res.json({
    zaps: zap,
  });
};

export { createZap, getAllZaps, getZapWithId };
