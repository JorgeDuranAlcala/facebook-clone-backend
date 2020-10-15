import { Schema, model, Document } from 'mongoose'

export interface IPost extends Document {
    title: string;
    desc: string;
    img_path?: string;
    likes: number;
    num_comments: number;
}

const Post = new Schema({
    title: String,
    desc: String,
    img_path: String,
    likes: { type: Number, default: 0 },
    num_comments: { type: Number, default: 0 },
})

export default model<IPost>('post', Post)
