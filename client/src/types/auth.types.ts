import { IUser } from "./user.types";

export interface IAuth {
  refreshToken: string;
  accessToken: string;
  user: IUser;
}
