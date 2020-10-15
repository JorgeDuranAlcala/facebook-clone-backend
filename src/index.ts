import express, { Application } from 'express'
import cors from 'cors'
import router from './routes'
import colors from 'colors'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
const app: Application = express()

// settings
app.set('port', process.env.PORT || 3500)
dotenv.config()
// middlewares 

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/api/v1', router)

// initialization

mongoose.connect(`${process.env.DB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log(colors.yellow("DB is Connected")))
.catch(error => {
   throw new Error(error)
}) 

app.use('/uploads', express.static(path.resolve('uploads')))

app.listen(app.get('port'), () => {
    console.log(`Server running on ${colors.black.bgBlue(`http://localhost:${app.get('port')}`)}`);
})

