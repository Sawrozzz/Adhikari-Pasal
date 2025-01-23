import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';


import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({extended:true})) //allow use of complex object in url encoded 
app.use(cookieParser());
dotenv.config();



import "dotenv/config";
import "./config/mongoose-connection.js";

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/users", userRouter);
app.use("/products",productRouter)
app.use("/carts", cartRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
