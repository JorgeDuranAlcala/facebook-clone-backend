import * as Express from "express";

export default (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    
    /* const token = req.cookies.token
    console.log(req.user)

    if (!token) return res.status(401).send("Unnautorized") */

    /* console.log(res.cookie)
    console.log("user", req.user) */

    next()

}