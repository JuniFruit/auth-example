import { RequestHandler } from "express";
import { ApiException } from "../exception/api.exception";
import userModel from "../models/user.model";
import { TokenService } from "../service/token.service";
export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return next(ApiException.UnauthorizedError());

    const token = header.split(" ")[1];
    if (!token) return next(ApiException.UnauthorizedError());

    const isVerified = TokenService.verifyAccess(token);

    if (!isVerified) return next(ApiException.UnauthorizedError());

    const user = await userModel.findById((isVerified as any).id);

    if (!user) return next(ApiException.UnauthorizedError());
    (req as any).user = user;
    next();
  } catch (error) {
    return next(ApiException.UnauthorizedError());
  }
};
