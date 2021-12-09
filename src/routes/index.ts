import { Router  } from "express";
import * as PostController from "../controllers/post.controller";
import multer from "../lib/multer";
import CommentRouter from "./comments.route";
import AuthRouter from "./auth.routes";
import FriendsRouter from "./friends.routes";

const router = Router()

router.route('/posts')
.get(PostController.get_all_post)

router.route('/post/:id')
.put(PostController.Update_post)
.get(PostController.get_post_by_Id)
.delete(PostController.Delete_post)

router.route('/upload')
.post(multer.single('image'), PostController.Create_new_post)

router.use('/post/:postId/comments', (req, res, next) => {
    req.postId = req.params.postId
    next()
} , CommentRouter)

router.use('/auth', AuthRouter)

router.use('/friend', FriendsRouter)

export default router