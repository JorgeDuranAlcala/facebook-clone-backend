import { Schema, Document, model, Model} from 'mongoose'
// @ts-ignore
import friends from "mongoose-friends";

interface IRequestFriends extends Document {
    requestFriend: (user1_id: string, user2_id: string) => void
}

export interface IUserDocument extends Document {
    userImg: string;
    username: string;
    access_token?: string;
    facebookId: string;
} 

export interface IUser extends IUserDocument {

}

export interface IUserModel extends Model<IUser> {
    requestFriend: (user1_id: string, user2_id: string, callback?: Function) => void;
    getFriends: (user: IUser, conditions?: Object, select?: Object , options?: Object, callback?: (err: Error | null, friendShip: any ) => void) => void;
}

export const User = new Schema<IUser>({
    userImg: { type: String, default: '' },
    username: String,
    access_token: String,
    facebookId: String
})

User.plugin(friends())

export const UserModel: IUserModel = model<IUser, IUserModel>('Users', User)

export default UserModel