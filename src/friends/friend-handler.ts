import { Socket } from "socket.io";
import { acceptRequest } from "../actions/friendship-action";

export function friendHandler(socket: Socket)
{
    socket.on("requestAccepted", async ([user_one_id, user_two_id]) => {
        await acceptRequest(user_one_id, user_two_id)
    })  
}