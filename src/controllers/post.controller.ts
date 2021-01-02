import { Request, Response } from "express";
import Post from "../models/Post";

export const Create_new_post = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { desc, userImg } = req.body;
        const body = { desc, userImg }
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

export const Update_post = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id } = req.params
        

        const Updated_post = await Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

        return res.status(200).json({
            message: "Post updated Successfuly",
            Updated_post
        })
    } catch (error) {
        return res.status(400).send({error: error.message})
    }

}

export const Delete_post = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id } = req.params
        
        const deleted_post = await Post.findByIdAndRemove(id)

        return res.status(200).json({
            message: "Post removed Successfuly",
            deleted_post
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

export const get_post_by_Id = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id } = req.params
        const post = await Post.findById(id)
       
        return res.status(201).json({
            message: "Here's your post",
            post
        })
    } catch (error) {
        return res.status(400).send({error: error.message})
    }

}