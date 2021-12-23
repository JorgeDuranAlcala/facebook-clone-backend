import { Router } from "express";
import passport from "passport";
import AuthRoute from "../middlewares/auth";
import { IUser } from "../models/user";
import { Register, Login } from "../controllers/auth.controller";
import auth from "../middlewares/auth";
import JWT from 'jsonwebtoken'

const router = Router()

/* router.get('/auth/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', passport.authenticate('facebook', 
{ failureRedirect: 'https://localhost:3000/login'}), 
(req, res) => {
    const user = req.user
    console.log(user)
    const token = JWT.sign({user}, `${process.env.COOKIE_KEY}`, { expiresIn: 3600 * 24 })
    res
    .cookie("token", token, {
        httpOnly: true,
        maxAge: 60000 * 60 * 24
    })
    .redirect(`https://localhost:3000`)
})

router.get('/success', (req, res) => {
    if(req.user) {
        const current_user = req.user as IUser
        const access_token = current_user.access_token
        res
        .send({
            message: 'Success', 
            user: req.user,
            cookies: req.cookies
        })
    }
}) */


router.get('/profile', passport.authenticate("jwt", { session: false }) ,(req, res) => {
        res
            .status(200)
            .send({
                success: true,
                data: req.user
            })
})

router.get('/logout',(req, res) => {
        
        req.logOut()

        res
            .clearCookie("token")
            .status(200)
            .send({
                success: true,
            })
})


router.get('/getCookies', auth , (req, res) => {


    res.status(200).send({
        cookies: req.cookies,
        user: req.user
    })

})

router.delete('/clearCookie', (req, res) => {


    res
        .status(200)
        .clearCookie('token')
        .send({
            message: "Token cookie cleaned"
        })

})

router.get('/failure', (req, res) => {
    res.status(400).send({
        message: "Something went wrong",
    })
})

router.get('/userList', )
router.post('/register', Register)
router.post('/login', Login)

export default router;