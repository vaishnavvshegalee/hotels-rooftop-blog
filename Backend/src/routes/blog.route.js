import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlog, relatedPost, updateBlog } from "../controllers/blog.controller.js";

const router = express.Router();

router.get('/blogs',getAllBlogs);
router.post('/create',createBlog);
router.delete('/delete/:id',deleteBlog);
router.patch('/update/:id',updateBlog);
router.get('/blog/:id',getBlog)
router.get('/blog/related/:id',relatedPost)
export default router;