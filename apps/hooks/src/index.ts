import express, { Request, Response } from "express";
import prisma from "@repo/db/client";

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;

// eg -  "https://hooks.zapier.com/hooks/catch/123456 -> userId/923749 -> zapId"

app.post("/hooks/catch/:userId/:zapId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  if (!zapId) {
    return res.status(400).json({ message: "zapId is required" });
  }

  // console.log("control here 1");
  await prisma.$transaction(async (tx) => {
    //   console.log("control here 2");
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });

    // console.log("control here 3");

    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });

    // console.log("control here 4");
  });

  res.json({
    message: "Webhook received",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} \n http://localhost:${port}`);
});
