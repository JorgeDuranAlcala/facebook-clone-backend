import { Router, Request, Response } from "express";
import { Create_new_post, get_all_post } from "../controllers/post.controller";
import multer from "../lib/multer";

const router = Router()

router.route('/posts')
.get(get_all_post)

router.route('/upload')
.post(multer.single('image'),Create_new_post)

export default router