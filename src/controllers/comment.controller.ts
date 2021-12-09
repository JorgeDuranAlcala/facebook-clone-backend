import { Request, Response } from "express";
import Post from "../models/Post";

export const add_Comment = async (req: Request, res: Response): Promise<Response> => {
    try {

        const id = req.postId

        const { commentBody, user } = req.body

        const new_comment = await Post.findOneAndUpdate({ _id: id },
            {
                $push: {
                    comments: {
                        commentBody,
                        user
                    }
                }
            },
         {
             useFindAndModify: false
         }   
        )

        return res.status(200).send({
            message: 'comment added succesfuly',
            new_comment
        })
        
    } catch (error) {
        if(error instanceof Error)
            return res.status(400).send({ message: error.message })
        throw error
    }
}


export const like_Comment = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { commentId } = req.params
        const { postId } = req

        const new_comment = await Post.findOneAndUpdate(
            {
                "_id": postId,
                "comments._id": commentId
            },
            {
                $inc: { 'comments.$.likes': 1 }
            },
            { useFindAndModify: false }
        )

        
        return res.status(200).send({
            message: 'You gave a like to this comment',
            new_comment
        })

    } catch (error) {
        if(error instanceof Error)
            return res.status(400).send({ message: error.message })
        throw error
    }
}

export const delete_Comment = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { postId } = req
        const { comment } = req.body

        await Post.findOneAndUpdate(
            { 
                _id: postId,
            },
            { 
                $pull: { comments: comment }
            },
            { useFindAndModify: false }
        )

        return res.status(200).send({
            message: 'Comment removed successfuly'
        })

    } catch (error) {
        if(error instanceof Error)
            return res.status(400).send({ message: error.message})
        throw error        
    }
}
