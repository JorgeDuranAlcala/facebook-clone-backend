import { Request, Response } from "express";
import UserSchema from "../models/user";

export const FriendRequest = async (req: Request, res: Response): Promise<Response> => {

    const {
        user_one_id,
        user_two_id
    } = req.body

    UserSchema.requestFriend(user_one_id, user_two_id,);

    return res.status(200).send({
        message: 'Friend request send it'
    })
}

export const GetFriends = async (req:Request, res: Response) => {

        const {  user_data } = req.body

        console.group("Schema")
        console.log(user_data)
        console.groupEnd()

        UserSchema.getFriends(user_data, {}, { }, {}, (err, friendShip) => {
            if(err) return res.status(400).send({ err })
            return res.status(200).send({
                friendShip
            })
        })

        

}