import { Schema, Document, model, Model} from 'mongoose'
// @ts-ignore
//import friends from "mongoose-friends";
import bcrypt from "bcrypt"
import { Friend, FriendsSchema } from './schemas/friend';

const SALT_ROUNDS = 10

interface IRequestFriends extends Document {
    requestFriend: (user1_id: string, user2_id: string) => void
}

export interface IUserDocument extends Document {
    userImg: string;
    username: string;
    password: string;
    friends: Friend[]
} 

export interface IUser extends IUserDocument {
    comparePassword: (data: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
    //comparePassword: (data: string) => Promise<boolean>;
    /* requestFriend: (user1_id: string, user2_id: string, callback?: Function) => void;
    getFriends: (user: IUser, conditions?: Object, select?: Object , options?: Object, callback?: (err: Error | null, friendShip: any ) => void) => void; */
}

export const User = new Schema<IUser>({
    userImg: { type: String, default: '' },
    username: String,
    password: String,
    friends: {type: [FriendsSchema], default: []}
})

User.pre("save", async function save(next) {
    if(!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch(err) {
        if(err instanceof Error)
            return next(err)
    }
})

User.methods.comparePassword = async function(data: string): Promise<boolean> {
    return await bcrypt.compare(data, this.password)
}


//User.plugin(friends())

export const UserModel: IUserModel = model<IUser, IUserModel>('Users', User)

