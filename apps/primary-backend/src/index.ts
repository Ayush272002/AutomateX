import express from "express";
import { userRouter } from "./routes/user";
import { zapRouter } from "./routes/zap";
import cors from "cors";
import dotenv from "dotenv";
import { triggerRouter } from "./routes/trigger";
import { actionRouter } from "./routes/action";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8001;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/action", actionRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port} \nhttp://localhost:${port}`);
});
