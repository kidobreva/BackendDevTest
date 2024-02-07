import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  userId: Schema.Types.ObjectId;
}

// Create a Schema corresponding to the document interface.
const postSchema: Schema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 3. Create a Model.
export const Post = mongoose.model<IPost>('Post', postSchema);
