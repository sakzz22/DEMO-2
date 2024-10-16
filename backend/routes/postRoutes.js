import express from "express";
import { createPost, deletePost, getPost, likeUnlikePost, replyToPost, getFeedPosts, getUserPosts } from "../controllers/postCongtroller.js";
import protectRoute from "../middlewares/protectRoutes.js";

const router = express.Router();
router.get("/feed",protectRoute, getFeedPosts)
router.get("/:id", getPost)
router.get("/user/:username", getUserPosts)
router.post("/create", protectRoute ,createPost)
router.delete("/:id",protectRoute, deletePost)
router.put("/like/:id",protectRoute, likeUnlikePost)
router.put("/reply/:id",protectRoute, replyToPost)
export default router;