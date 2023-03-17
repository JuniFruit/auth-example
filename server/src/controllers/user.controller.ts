import { RequestHandler } from "express";
import { UserService } from "../service/user.service";
import { validationResult } from "express-validator/src/validation-result";
import { ApiException } from "../exception/api.exception";

const USER_COOKIE_AGE = 30 * 24 * 60 * 60 * 1000;

export class UserController {
  static logout: RequestHandler = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const result = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      console.log(result);
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  };
  static refresh: RequestHandler = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const payload = await UserService.refresh(refreshToken);
      res.json(payload);
    } catch (error) {
      next(error);
    }
  };

  static activate: RequestHandler = async (req, res, next) => {
    try {
      const activationLink = req.params.link;
      await UserService.activate(activationLink);

      res.redirect(process.env.CLIENT_URL!);
    } catch (error) {
      next(error);
    }
  };

  static create: RequestHandler = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiException.BadRequest("Registration failed", errors.array())
        );
      }
      const { email, password } = req.body;
      const payload = await UserService.createUser(email, password);
      res.cookie("refreshToken", payload!.refreshToken, {
        maxAge: USER_COOKIE_AGE,
        httpOnly: true,
      });
      res.json(payload);
    } catch (error) {
      next(error);
    }
  };

  static login: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const payload = await UserService.login(email, password);
      res.cookie("refreshToken", payload!.refreshToken, {
        maxAge: USER_COOKIE_AGE,
        httpOnly: true,
      });
      res.json(payload);
    } catch (error) {
      next(error);
    }
  };
  static getAllUsers: RequestHandler = async (req, res, next) => {
    try {
      res.json({ message: "Hello" });
    } catch (error) {
      next(error);
    }
  };
}
