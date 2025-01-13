import express from "express";
const router = express.Router();

import { allUsers, login, logout, profile, register } from "../controllers/authController.js";

router.get("/",(req, res)=>{
res.send("Working fine on user route")
});

router.post("/register", register);

router.post("/login", login);

router.post("/logout",logout);

router.get("/profile/:id", profile)

router.get("/allUsers",allUsers)



export default router;