import express from "express";
import { editProfile, removeProfile } from "../controllers/profileController.js";
import checkAuth from "../middleware/checkAuth.js";
import { loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/editprofile", checkAuth, editProfile);
router.post("/removeprofile", checkAuth, removeProfile);

export default router;
