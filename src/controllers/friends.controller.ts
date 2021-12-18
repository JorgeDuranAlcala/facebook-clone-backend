import { Request, Response } from "express";
import { IUser } from "src/models/user";
import * as actions from '../actions/friendship-action'

export const FriendRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { user_requested } = req.body
        await actions.requestFriendship(req.user as IUser, user_requested)
        return res.status(200).send({
            message: 'Friend request sent'
        })
    } catch (error) {
        if(!(error instanceof Error)) throw error;
        return res.status(400).send({error: error.message})
    }
}
export const AcceptFriendRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { friend_requester } = req.body
        await actions.acceptRequest(req.user as IUser, friend_requester)
        return res.status(200).send({
            message: 'These users are friends now'
        })
    } catch (error) {
        if(!(error instanceof Error)) throw error;
        return res.status(400).send({error: error.message})
    }
}

export const GetFriends = async (req:Request, res: Response) => {
        try {
            const user = req.user as IUser
            const friends = await actions.getFriendsList(user._id)
            return res
                    .status(200)
                    .send({
                        friends,
                        message: 'Friends list'
                    })
        } catch (error) {
            if(!(error instanceof Error)) return;
            return res.status(400).send({error: error.message})
        }
}