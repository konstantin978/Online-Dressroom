const express = require("express");
const bodyParser = require('body-parser');
const userRouter = require("./routes/user.routes");

const app = express();
app.use(bodyParser.json());
app.use("/user", userRouter);

module.exports = app;
