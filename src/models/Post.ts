import { Schema, model, Document } from 'mongoose'
import { CommentSchema, IComment } from './comment'

export interface IPost extends Document {
    userImg: string;
    desc: string;
    img_path?: string;
    likes?: number;
    num_comments?: number;
    comments?: IComment[]
    created_at?: Date
}

const Post = new Schema<IPost>({
    userImg: String,
    desc: String,
    img_path: String,
    likes: { type: Number, default: 0 },
    num_comments: { type: Number, default: 0 },
    comments: { type: [CommentSchema], default: [] },
    created_at: { type: Date, default: Date.now }
})

export default model<IPost>('post', Post)
