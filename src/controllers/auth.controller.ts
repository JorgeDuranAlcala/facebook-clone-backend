import { Request, Response } from "express";
import UserSchema from "../models/user";

export const Register = async (req: Request, res: Response): Promise<Response> => {

    try {
        const {
            userImg,
            username,
            access_token,
            facebookId
        } = req.body;

        const myuser = new UserSchema({ username, userImg, access_token, facebookId })
        const New_user = await myuser.save()

        return res.status(201).json({
            message: "User registered Successfuly",
            New_user
        })
    } catch (error) {
        return res.status(400).send({error: error.message})
    }

}

export const Login = async (req: Request, res: Response): Promise<Response> => {

    try {
        /* const {
            username,
        } = req.body; */

        /* const myuser = new User({ username })
        const New_user = await myuser.save() */

        return res.status(201).json({
            message: "User logged Successfuly",
            New_user: req.user
        })
    } catch (error) {
        return res.status(400).send({error: error.message})
    }

}