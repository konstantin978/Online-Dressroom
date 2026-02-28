import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes.js";
import clothesRouter from "./routes/clothes.routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/clothes", clothesRouter);

export default app;
