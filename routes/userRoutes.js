import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUserPosts } from "../controllers/UserController.js";

const userRoutes = express.Router();

userRoutes.get("/stories", authMiddleware, getUserPosts);

export default userRoutes;