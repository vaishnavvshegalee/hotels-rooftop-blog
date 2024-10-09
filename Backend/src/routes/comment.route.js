import express from "express";
import { createComment, getAllComments } from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.get('/',getAllComments);
commentRouter.post('/create',createComment);

export default commentRouter;