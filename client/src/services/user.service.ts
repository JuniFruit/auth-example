import { api } from "@/api/axios.setup";
import { IAuth } from "@/types/auth.types";
import { IUser } from "@/types/user.types";
import { AxiosResponse } from "axios";

export class UserService {
  static login(email: string, password: string): Promise<AxiosResponse<IAuth>> {
    return api.post<IAuth>("api/login", {
      email,
      password,
    });
  }

  static register(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuth>> {
    return api.post<IAuth>("api/registration", {
      email,
      password,
    });
  }

  static logout(): Promise<any> {
    return api.post("api/logout");
  }

  static getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>("api/users");
  }
  static resendMail(): Promise<any> {
    return api.post("api/resend_mail");
  }
}
