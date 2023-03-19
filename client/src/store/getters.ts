import { GetterTree } from "vuex";
import { IStateInitial } from "./store";

export const getters: GetterTree<IStateInitial, IStateInitial> = {
  getUsers(state) {
    return state.users;
  },
  getCount(state) {
    return state.count;
  },
  getFilteredByEmail: state => (filterRegex: RegExp) => {
    return state.users.filter(item => item.email.match(filterRegex));
  },
  getErrMsg(state) {
    return state.errMessage;
  },
  getErrInfo(state) {
    return state.errors;
  },
  getUser(state) {
    return state.user;
  },
  getIsLoading(state) {
    return state.isLoading;
  },
  getInfoMessage(state) {
    return state.infoMessage;
  },
  getIsLoggedIn(state) {
    return state.isLoggedIn;
  },
  getProducts(state) {
    return state.products;
  },
};
