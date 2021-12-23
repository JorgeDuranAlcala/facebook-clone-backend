import * as Express from "express";
import jwt from 'jsonwebtoken'
import { UserModel } from "../models/user";

export default (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    
    const token = req.cookies.token
    //console.log(req.user)

    if (!token) return res.status(401).send("Unnautorized")

    const id = jwt.verify(token, process.env.COOKIE_KEY as string)
    req.user_id = id as string


    next()

}