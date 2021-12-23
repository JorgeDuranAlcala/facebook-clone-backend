import colors from 'colors';
import mongoose from 'mongoose';
import { app } from './src/app'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { friendHandler } from './src/friends/friend-handler';


mongoose.connect(`${process.env.DB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
.catch(error => {
   throw new Error(error)
}) 

mongoose.connection.once('open', () => {
    console.log(colors.yellow("DB is connected"))

    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change', change => {
        console.log(change)
    })
})

const server = http.createServer(app)
const io = new Server(server);

const onConnection = (socket: Socket) => {
    console.log("User connected")
  friendHandler(socket);
}

io.on("connection", onConnection);

app.listen(app.get('port'), () => {
    console.log(`Server running on ${colors.black.bgBlue(`http://localhost:${app.get('port')}`)}`);
})