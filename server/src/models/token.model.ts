import { Schema, model, Model } from "mongoose";

interface IToken {
  user: Schema.Types.ObjectId;
  refreshToken: string;
}

export interface ITokenDocument extends Document, IToken {}
export interface ITokenModel extends Model<ITokenDocument> {}

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
});

export default model<ITokenDocument>("Token", TokenSchema);
