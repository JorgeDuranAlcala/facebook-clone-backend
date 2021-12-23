import { Router  } from "express";
import  * as CommentsController from "../controllers/comment.controller";
import ReplyRouter from "./reply.route";

const router = Router()

router.route('/deleteComment')
.delete(CommentsController.delete_Comment)

router.route('/createComment')
.put(CommentsController.add_Comment)

router.route('/:commentId/like')
.put(CommentsController.like_Comment)

router.use('/:commentId/reply', (req, res, next) => {
    req.commentId = req.params.commentId
    next()
} , ReplyRouter)

export default router