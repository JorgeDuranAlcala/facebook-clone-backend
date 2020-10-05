import express, { Application } from 'express'
import cors from 'cors'
import router from './routes'
import colors from 'colors'
import path from 'path'
const app: Application = express()

// settings
app.set('port', process.env.PORT || 3500)

// middlewares 

app.use(cors())
app.use(express.json())
app.use('/api/v1', router)

// initialization

app.use('/uploads', express.static(path.resolve('uploads')))

app.listen(app.get('port'), () => {
    console.log(`Server running on ${colors.black.bgBlue(`http://localhost:${app.get('port')}`)}`);
})

