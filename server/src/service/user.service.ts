import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import * as uuid from "uuid";
import { IUserDto, UserDto } from "../dtos/user.dto";
import { TokenService } from "./token.service";
import { MailService } from "../service/mail.service";
import { ApiException } from "../exception/api.exception";

export class UserService {
  static async createUser(email: string, password: string) {
    const isCreated = await userModel.findOne({ email: email });

    if (isCreated) {
      throw ApiException.BadRequest(`User with ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const activationLink = uuid.v4();
    const newUser = await userModel.create({
      email: email,
      password: hashedPassword,
      activationLink,
    });
    const userDto = new UserDto(newUser);
    const tokens = await TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    MailService.sendActivationLink(
      userDto.email,
      `${process.env.APP_URL}/api/activation/${activationLink}`
    );

    return {
      ...tokens,
      user: userDto,
    };
  }

  static async activate(link: string) {
    const user = await userModel.findOne({ activationLink: link });
    if (user) {
      if (user.isActivated)
        throw ApiException.BadRequest("User was activated earlier");
      user.isActivated = true;
      await user.save();
      return new UserDto(user);
    } else {
      throw ApiException.BadRequest("User does not exist");
    }
  }

  static async login(email: IUserDto["email"], password: string) {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw ApiException.BadRequest("User with such email does not exist");
    }

    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      throw ApiException.BadRequest("Password is incorrect");
    }

    const userDto = new UserDto(user);
    const tokens = await TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  static async logout(refreshToken: string) {
    const result = await TokenService.deleteToken(refreshToken);
    return result;
  }

  static async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiException.UnauthorizedError();
    }

    const verified = TokenService.verifyRefresh(refreshToken);
    const isInDB = await TokenService.findRefresh(refreshToken);

    if (!verified || !isInDB) {
      throw ApiException.UnauthorizedError();
    }

    const user = await userModel.findById(isInDB.user);
    if (!user) throw ApiException.UnauthorizedError();
    const userDto = new UserDto(user);
    const tokens = await TokenService.generateToken({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export interface IUserService extends UserService {}
