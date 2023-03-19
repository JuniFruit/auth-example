import jwt from "jsonwebtoken";
import { IUserDto } from "../dtos/user.dto";
import * as dotenv from "dotenv";
import tokenModel from "../models/token.model";

dotenv.config();

export class TokenService {
  static async generateToken(payload: IUserDto) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  static async saveToken(userId: IUserDto["id"], refreshToken: string) {
    const token = await tokenModel.findOne({ user: userId });

    if (token) {
      token.refreshToken = refreshToken;
      return await token.save();
    }

    const newToken = await tokenModel.create({ user: userId, refreshToken });
    return newToken;
  }

  static async deleteToken(refreshToken: string) {
    const result = await tokenModel.deleteOne({ refreshToken });
    return result;
  }

  static verifyRefresh(refreshToken: string) {
    try {
      const verified = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      );
      return verified;
    } catch (error) {
      return null;
    }
  }
  static verifyAccess(accessToken: string) {
    try {
      const verified = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);
      return verified;
    } catch (error) {
      return null;
    }
  }

  static async findRefresh(refreshToken: string) {
    const token = await tokenModel.findOne({ refreshToken });
    return token;
  }
}

export interface ITokenService extends TokenService {}
