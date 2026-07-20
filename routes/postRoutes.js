const express = require("express");
const {myPosts, createPost, fypPosts} = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/published', authMiddleware, myPosts);

router.post('/publish', authMiddleware, createPost);

router.get('/fyp', authMiddleware, fypPosts);
// router.post('/submission', authMiddleware, makePost);

module.exports = router;