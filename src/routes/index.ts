import { Router  } from "express";
import * as PostController from "../controllers/post.controller";
import multer from "../lib/multer";
import CommentRouter from "./comments.route";
import AuthRouter from "./auth.routes";
import FriendsRouter from "./friends.routes";

const postRouter = Router()

postRouter.route('/posts')
.get(PostController.get_all_post)

postRouter.route('/post/:id')
.put(PostController.Update_post)
.get(PostController.get_post_by_Id)
.delete(PostController.Delete_post)

postRouter.route('/upload')
.post(multer.single('image'), PostController.Create_new_post)

postRouter.use('/post/:postId/comments', (req, res, next) => {
    req.postId = req.params.postId
    next()
} , CommentRouter)

postRouter.use('/', AuthRouter)

postRouter.use('/friend', FriendsRouter)

export default postRouter