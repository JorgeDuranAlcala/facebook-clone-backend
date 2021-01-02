import { Router } from "express";
import passport from "passport";
import AuthRoute from "../middlewares/auth";
import { IUser } from "../models/user";
import { Register, Login } from "../controllers/auth.controller";

const router = Router()

router.get('/auth/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/failure',
    passReqToCallback: true
}), (req, res) => {
    res.redirect(`${process.env.FRONTEND_DOMAIN}`)
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
})


router.get('/profile', AuthRoute ,(req, res) => {
        console.log(req.cookies)
        res
            .status(200)
            .send({
                success: true,
            })
})

router.get('/logout',(req, res) => {
        
        req.logOut()

        res
            .clearCookie("user_session")
            .status(200)
            .send({
                success: true,
            })
})


router.get('/getCookies', (req, res) => {


    res.status(200).send({
        cookies: req.cookies
    })
})

router.get('/failure', (req, res) => {
    res.status(400).send({
        message: "Something went wrong",
    })
})

router.post('/register', Register)
router.post('/login',passport.authenticate('local'), Login)

export default router;