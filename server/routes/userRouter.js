import express from "express";
const router = express.Router();
import {uploadProfileImage} from '../middleware/multer.js'
import { all, allUsers, login, logout, profile, register, deleteUser, uploadProfilePicture } from "../controllers/authController.js";
import { isloggedIn } from "../middleware/isLoggedIn.js";

router.get("/",(req, res)=>{
res.send("Working fine on user route")
});

router.post("/register", register);

router.post("/login", login);

router.post("/logout",logout);

router.delete("/delete",deleteUser)

router.get("/profile/:id", profile)

router.post(
  "/profile/upload",
  uploadProfileImage.single("profileImage"),
  isloggedIn,
  uploadProfilePicture
);

router.get("/allUsers",allUsers)

router.get('/all',all)



export default router;