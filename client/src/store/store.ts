import Vue from "vue";
import Vuex from "vuex";
import { IUser } from "@/types/user.types";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./action";
import { IErrorInfo } from "@/types/error.types";
import { IProductItem } from "@/types/product.types";
Vue.use(Vuex as any);

export interface IStateInitial {
  count: number;
  isLoading: boolean;
  infoMessage: string;
  errors: IErrorInfo[];
  users: IUser[];
  isLoggedIn: boolean;
  products: IProductItem[];
  user: IUser | null;
  errMessage: string;
}

const state: IStateInitial = {
  isLoading: false,
  products: [],
  count: 0,
  users: [],
  infoMessage: "",
  errors: [],
  isLoggedIn: false,
  user: null,
  errMessage: "",
};

export default new Vuex.Store({
  state: state,
  getters,
  mutations,
  actions,
});
