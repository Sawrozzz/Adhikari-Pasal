import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';

//all the routes are import here
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import paymentRouter from "./routes/paymentRouter.js"

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

//all the routes are used here
app.use("/users", userRouter);
app.use("/products",productRouter)
app.use("/carts", cartRouter);
app.use("/payment",paymentRouter);


app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
