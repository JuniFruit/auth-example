import { Schema, model, Document, Model } from "mongoose";

interface IUser {
  email: string;
  isActivated: boolean;
  password: string;
  activationLink: string;
}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: String,
});

export default model<IUserDocument>("User", UserSchema);
