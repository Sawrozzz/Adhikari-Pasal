import express from "express";
const router = express.Router();
import {uploadProfileImage} from '../middleware/multer.js'
import { allUsers, login, logout, profile, register, uploadProfilePicture } from "../controllers/authController.js";

router.get("/",(req, res)=>{
res.send("Working fine on user route")
});

router.post("/register", register);

router.post("/login", login);

router.post("/logout",logout);

router.get("/profile/:id", profile)

router.post(
  "/profile/upload",
  uploadProfileImage.single("profileImage"),
  uploadProfilePicture
);

router.get("/allUsers",allUsers)



export default router;