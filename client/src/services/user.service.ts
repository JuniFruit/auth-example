import { api } from "@/api/axios.setup";
import { IAuth } from "@/types/auth.types";
import { IUser } from "@/types/user.types";
import { AxiosResponse } from "axios";

export class UserService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuth>> {
    return api.post<IAuth>("api/login", {
      data: {
        email,
        password,
      },
    });
  }

  static async register(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuth>> {
    return api.post<IAuth>("api/register", {
      data: {
        email,
        password,
      },
    });
  }

  static async logout(): Promise<number> {
    return api.post("api/logout");
  }

  static async getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>("api/users");
  }
}
