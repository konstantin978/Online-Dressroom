import cors from "cors";
import express from "express";
import aiRouter from "./routes/ai.routes.js";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes.js";
import clothesRouter from "./routes/clothes.routes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/ai", aiRouter);
app.use("/user", userRouter);
app.use("/clothes", clothesRouter);

export default app;
