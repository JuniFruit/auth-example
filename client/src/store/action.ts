import { APP_URL } from "@/api/axios.setup";
import { ProductsService } from "@/services/product.service";
import { UserService } from "@/services/user.service";
import { IAuth } from "@/types/auth.types";
import axios from "axios";
import { ActionTree } from "vuex";
import { errorHandler } from "./errorHandler";
import { IStateInitial } from "./store";

export const actions: ActionTree<IStateInitial, IStateInitial> = {
  async login({ state, commit }, { email, password }) {
    try {
      state.isLoading = true;
      const response = await UserService.login(email, password);
      console.log(response);
      commit("setUser", { user: response.data.user });
      localStorage.setItem("access_token", response.data.accessToken);
      commit("setAuth", { isLoggedIn: true });
      commit("setInfoMessage", {
        message: `Welcome back ${response.data.user.email}`,
      });
      return true;
    } catch (error: any) {
      errorHandler(error, (msg: string, errors) =>
        commit("setErrMsg", { errMessage: msg, errors })
      );
      return false;
    } finally {
      state.isLoading = false;
    }
  },
  async register({ state, commit }, { email, password }) {
    try {
      state.isLoading = true;
      const response = await UserService.register(email, password);
      commit("setUser", { user: response.data.user });
      localStorage.setItem("access_token", response.data.accessToken);
      commit("setAuth", { isLoggedIn: true });
      return true;
    } catch (error: any) {
      errorHandler(error, (msg: string, errors) =>
        commit("setErrMsg", { errMessage: msg, errors })
      );
      return false;
    } finally {
      state.isLoading = false;
    }
  },
  async getAllUsers({ commit }) {
    try {
      const response = await UserService.getAllUsers();
      commit("setUsers", { users: response.data });
    } catch (error: any) {
      errorHandler(error, (msg: string, errors) =>
        commit("setErrMsg", { errMessage: msg, errors })
      );
    }
  },
  async logout({ commit }) {
    try {
      await UserService.logout();
      commit("setUser", { user: null });
      commit("setAuth", { isLoggedIn: false });
      commit("setInfoMessage", { message: "Logout successful" });
    } catch (error: any) {
      errorHandler(error, (msg: string, errors) =>
        commit("setErrMsg", { errMessage: msg, errors })
      );
    }
  },
  async checkAuth({ commit }) {
    try {
      const response = await axios.get<IAuth>(`${APP_URL}api/refresh`, {
        withCredentials: true,
      });
      commit("setUser", { user: response.data.user });
      localStorage.setItem("access_token", response.data.accessToken);
      commit("setAuth", { isLoggedIn: true });
    } catch (error: any) {
      // errorHandler(error, (msg: string, errors) =>
      //   commit("setErrMsg", { errMessage: msg, errors })
      // );
    }
  },
  async resendMail({ state, commit }) {
    try {
      state.isLoading = true;
      await UserService.resendMail();
      commit("setInfoMessage", { message: "New activation link was sent" });
      return true;
    } catch (error) {
      errorHandler(error, (msg: string, errors) =>
        commit("setErrMsg", { errMessage: msg, errors })
      );
      return false;
    } finally {
      state.isLoading = false;
    }
  },
  async loadProducts({ state, commit }) {
    try {
      state.isLoading = true;
      const response = await ProductsService.getProducts(state.isLoggedIn);
      commit("setProducts", { products: response.data.products });
    } catch (error) {
      errorHandler(error, (msg: string, errors) =>
        commit("setErrMsg", { errMessage: msg, errors })
      );
    } finally {
      state.isLoading = false;
    }
  },
};
