import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  userId: Schema.Types.ObjectId;
}

// 2. Create a Schema corresponding to the document interface.
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

// export default User;

// postSchema.pre<IPost>('save', async function (next) {
//   try {
//     const hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     throw error;
//   }
// });

// userSchema.methods.comparePassword = async function (password: string) {
//     if (!password) {
//         throw new Error('Invalid username or password');
//     }

//     try {
//       return await bcrypt.compare(password, this.password);
//     } catch (error) {
//         throw new Error('Invalid username or password');
//     }
//   };
