import mongoose, { Schema } from 'mongoose';

export interface IToken {
  token: string;
}

const blackListSchema: Schema = new Schema<IToken>(
  {
    token: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const BlackList = mongoose.model<IToken>('BlackList', blackListSchema);
