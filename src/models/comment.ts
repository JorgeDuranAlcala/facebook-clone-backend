import { Schema } from 'mongoose'
import { IUser, User } from './user'

export interface IReply {
    user: IUser;
    commentBody: string;
    likes?: number;
    created_at?: Date;
}

export interface IComment {
    user: IUser;
    commentBody: string;
    likes?: number;
    replies?: IReply[];
    created_at?: Date;
}


export const RepliesSchema = new Schema<IReply>({
    user: { type: User, default: {} },
    commentBody: String,
    likes: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
})

export const CommentSchema = new Schema<IComment>({
    user: { type: User, default: {} },
    commentBody: String,
    likes: { type: Number, default: 0 },
    replies: { type: [RepliesSchema] , default: [] },
    created_at: { type: Date, default: Date.now }
})