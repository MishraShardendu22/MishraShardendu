import { Schema,Document } from 'mongoose';

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

export const MessageSchema: Schema = new Schema(
    {
        content: {
            type: String,
            required: [true," This field is required"],
        },
        createdAt: {
            type: Date,
            required: [true," This field is required"],
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
)