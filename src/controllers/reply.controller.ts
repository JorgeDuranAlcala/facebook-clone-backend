import { Request, Response } from "express";
import Post from "../models/Post";


export const reply_Comment = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { body: {commentBody, user}, postId, commentId } = req


        await Post.findOneAndUpdate(
            {
                "_id": postId,
                "comments._id": commentId
            },
            {
                $push: { 'comments.$.replies': { commentBody, user } }
            },
            { useFindAndModify: false }
        )

        
        return res.status(200).send({
            message: 'Your reply was successful added',
        })

    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
}

export const like_reply = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { postId, commentId, params: { replyId } } = req

        await Post.updateOne({ _id: postId }, {
            $inc: {
                'comments.$[c].replies.$[i].likes': 1
                }
        }, {
                arrayFilters: [{'c._id': commentId}, {'i._id': replyId }]
            },
        )

            
            return res.status(200).send({
                message: 'You gave a like to this reply',
            })

    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
}

export const delete_reply = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { body: { reply } , postId, commentId } = req
    

        await Post.findOneAndUpdate(
            {
                "_id": postId,
                "comments._id": commentId
            },
            {
                $pull: { 'comments.$.replies': reply }
            },
            { useFindAndModify: false }
        )

        return res.status(200).send({
            message: 'Reply removed successfuly'
        })

    } catch (error) {
        return res.status(400).send({ message: error.message})
    }
}