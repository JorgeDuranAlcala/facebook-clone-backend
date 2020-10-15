import { Request, Response } from "express";
import Post from "../models/Post";

export const Create_new_post = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { title, desc, likes, num_comments } = req.body;
        const body = { title, desc, likes, num_comments}
        const post = req.file ? {...body, img_path: req.file.path} : {...body}
        const New_post = await Post.create(post)
       
        return res.status(201).json({
            message: "Post created Successfuly",
            New_post
        })
    } catch (error) {
        return res.status(400).send({error: error.message})
    }

}

export const get_all_post = async (req: Request, res: Response): Promise<Response> => {

    try {
    
        const post_list = await Post.find()
       
        return res.status(201).json({
            message: "Post list send it",
            post_list
        })
    } catch (error) {
        return res.status(400).send({error: error.message})
    }

}