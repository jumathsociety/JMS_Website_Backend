import express from "express";
import { fetchUsers } from "../controllers/adminController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/users", checkAuth, fetchUsers);

export default router;
