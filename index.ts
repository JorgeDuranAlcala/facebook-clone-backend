import { stripColors } from 'colors';
import mongoose from 'mongoose';
import { app } from './src/app'


mongoose.connect(`${process.env.DB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
.catch(error => {
   throw new Error(error)
}) 

mongoose.connection.once('open', () => {
    console.log(stripColors.yellow("DB is connected"))

    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change', change => {
        console.log(change)
    })
})

app.listen(app.get('port'), () => {
    console.log(`Server running on ${stripColors.black.bgBlue(`http://localhost:${app.get('port')}`)}`);
})