import { Schema, Document, ObjectId } from 'mongoose'
import { IUser, User } from '../user';

export interface Friend {
    user: string;
    status: string
    created_at?: Date;
}


export const FriendsSchema: Schema<Friend> = new Schema<Friend>({
    user: String,
    status: String,
    created_at: { type: Date, default: Date.now }
})