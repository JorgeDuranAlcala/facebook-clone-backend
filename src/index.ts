import express, { Application } from 'express'
import cors from 'cors'
import router from './routes'
import colors from 'colors'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import Pusher from "pusher";
import passport from "passport";
import UserSchema, { IUser } from "./models/user";
import expressSession from "express-session";
import FacebookStrategy from './lib/passport'
import CookieSession from "cookie-session";
import CookieParser from "cookie-parser";

// @ts-ignore
import morgan from "morgan";

const app: Application = express()

// settings
app.set('port', process.env.PORT || 3500)
dotenv.config()

const pusher = new Pusher({
    appId: "1100866",
    key: "b88e5dfc3c15df9e0133",
    secret: "533a3f69f22bf143e555",
    cluster: "mt1",
    useTLS: true
})

// pasport 

    passport.serializeUser((user, done) => {
        const my_user = user as IUser
        done(null, my_user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {

            const user = await UserSchema.findById(id)
            return done(null, user)

        } catch (error) {
            return done(error, null)
        }
    })


// middlewares 

app.use(
    CookieSession({
        name: 'user_session',
        keys: [`${process.env.COOKIE_KEY}`],
        maxAge: 24 * 60 * 60 * 100
    })
)

app.use(CookieParser())

app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
)
app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressSession({ secret: `${process.env['EXPRESS_SESSION_SECRET']}`, resave: true, saveUninitialized: true }))
passport.use(FacebookStrategy)
app.use(passport.initialize())
app.use(passport.session())

app.use(`/${process.env['SUFIX_PATHNAME']}`, router )

// initialization

mongoose.connect(`${process.env.DB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
.catch(error => {
   throw new Error(error)
}) 

mongoose.connection.once('open', () => {
    console.log(colors.yellow("DB is connected"))

    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change', change => {

        try {

            switch(change.operationType) {
                case 'insert':
                    pusher.trigger('post', 'inserted', {
                        change
                    })
                break
                case 'update':
                    pusher.trigger('post', 'updated', {
                        change
                    })
                break
                case  'delete':
                    pusher.trigger('post', 'deleted', {
                        change
                    })
                break
            }  

        } catch(e) {
            console.log(e)
        }
    })
})

app.use('/uploads', express.static(path.resolve('uploads')))

app.listen(app.get('port'), () => {
    console.log(`Server running on ${colors.black.bgBlue(`http://localhost:${app.get('port')}`)}`);
})

