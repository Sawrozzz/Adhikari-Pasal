import express from "express";
const router = express.Router();

import { register } from "../controllers/authController.js";

router.get("/",(req, res)=>{
res.send("Working fine on user route")
});

router.post("/register", register);


export default router;