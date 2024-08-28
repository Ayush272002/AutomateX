import express, { Request, Response } from "express";
import { userRouter } from "./routes/user";
import { zapRouter } from "./routes/zap";
import cors from "cors";
import dotenv from "dotenv";
import { triggerRouter } from "./routes/trigger";
import { actionRouter } from "./routes/action";
import { metricsMiddleware } from "./middlewares/metrics";
import client from "prom-client";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(metricsMiddleware);

const port = process.env.PORT || 8001;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/action", actionRouter);

app.get("/metrics", async (req: Request, res: Response) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} \nhttp://localhost:${port}`);
});
