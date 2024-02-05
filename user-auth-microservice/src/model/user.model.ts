import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IToken {
  token: string;
  signedAt: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  //   tokens: IToken[];
  token: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema: Schema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // tokens: [{ type: Object }],
    token: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre<IUser>('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    throw error;
  }
});

// 3. Create a Model.
export const User = mongoose.model<IUser>('User', userSchema);

// export default User;

// userSchema.virtual('posts', {
//   ref: 'Post',
//   localField: '_id',
//   foreignField: 'userId',
//   justOne: false,
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
