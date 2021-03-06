import express, { Application } from 'express'
import cors from 'cors'
import router from './routes'
import path from 'path'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import passport from "passport";
// @ts-ignore
import expressSession from "express-session";
import { jwt_strategy } from './lib/passport'
import CookieSession from "cookie-session";
// @ts-ignore
import CookieParser from "cookie-parser";
// @ts-ignore
import morgan from "morgan";

export const app: Application = express()

// settings
app.set('port', process.env.PORT || 3500)
dotenv.config()

// middlewares 

app.use(
    CookieSession({
        name: 'user_session',
        keys: [`${process.env.COOKIE_KEY}`],
        maxAge: 24 * 60 * 60 * 100,
    })
)

app.use(CookieParser())

app.use(
    cors({
        origin: "https://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
)
app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressSession({ secret: `${process.env['EXPRESS_SESSION_SECRET']}`, resave: true, saveUninitialized: true }))
passport.use(jwt_strategy)
app.use(passport.initialize())
app.use(passport.session())

app.use(`/${process.env['SUFIX_PATHNAME']}`, router )


app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/public', express.static(path.join(__dirname, "public")));


