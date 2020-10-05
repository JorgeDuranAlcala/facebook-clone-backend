import { Router, Request, Response } from "express";

const router = Router()

router.route('/post')
.post((req: Request, res: Response) => {
    return res.status(200).send("hello")
})

export default router