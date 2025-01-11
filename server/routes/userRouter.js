import express from "express";
const router = express.Router();

import { allUsers, login, logout, register } from "../controllers/authController.js";

router.get("/",(req, res)=>{
res.send("Working fine on user route")
});

router.post("/register", register);

router.post("/login", login);

router.post("/logout",logout);

router.get("/allUsers",allUsers)


export default router;