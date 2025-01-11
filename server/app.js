import express from "express";
const app = express();
app.use(express.json());

import userRouter from "./routes/userRouter.js";

import "dotenv/config";
import "./config/mongoose-connection.js";

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
