import express from "express";
import { fetchComments,addComment,fetchNumberOfComments } from "../controllers/commentsController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"

const router = express.Router();

router.get('/:teamId/tasks/:taskId/comments', protect, fetchComments);
router.get('/:teamId/tasks/:taskId/comments/count', protect, fetchNumberOfComments);
router.post('/:teamId/tasks/:taskId/comments', protect, upload.array("images", 10), addComment);



export default router;