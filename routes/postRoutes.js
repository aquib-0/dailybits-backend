import express from "express";
import {myPosts, createPost, fypPosts} from '../controllers/postController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/published', authMiddleware, myPosts);

router.post('/publish', authMiddleware, createPost);

router.get('/fyp', authMiddleware, fypPosts);
// router.post('/submission', authMiddleware, makePost);
const postRoutes = router;

export default postRoutes;