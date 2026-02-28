import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(bodyParser.json());
app.use("/user", userRouter);

export default app;