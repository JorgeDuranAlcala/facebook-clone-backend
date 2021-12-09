import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import {createUser, validateUser} from "../actions/user-action";
import dotenv from 'dotenv'
dotenv.config()

export const Register = async (req: Request, res: Response): Promise<Response> => {

    try {

        const New_user = await createUser(req.body)
        const token = JWT.sign({ user: New_user }, process.env.JWT_SECRET as string)
        return res
                .status(201)
                .cookie("token", token)
                .json({
                    message: "User registered Successfuly",
                    New_user
                })
    } catch (error) {
        if(error instanceof Error)
            return res.status(400).send({error: error.message})
        throw error
    }

}

export const Login = async (req: Request, res: Response): Promise<Response> => {

    try {
        //const { username, password } = req.body
        const user = await validateUser(req.body.username, req.body.password)
        const token = JWT.sign({ user }, process.env.JWT_SECRET as string)
        return res
                .status(200)
                .cookie("token", token)
                .json({
                    message: "User logged in",
                    user,
                    token
                })
    } catch (error) {
        if(error instanceof Error)
            return res.status(400).send({error: error.message})
        throw error
    }

}