import { Router  } from "express";
import  * as ReplyController from "../controllers/reply.controller";

const router = Router()

router.route('/')
.put(ReplyController.reply_Comment)

router.route('/:replyId/like')
.put(ReplyController.like_reply)

router.route('/deleteReply')
.delete(ReplyController.delete_reply)

export default router