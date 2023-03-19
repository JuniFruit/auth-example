import { MutationTree } from "vuex";
import { IStateInitial } from "./store";

export const mutations: MutationTree<IStateInitial> = {
  setUser(state, { user }) {
    return (state.user = user);
  },
  setAuth(state, { isLoggedIn }) {
    return (state.isLoggedIn = isLoggedIn);
  },
  setUsers(state, { users }) {
    return (state.users = [...users]);
  },
  increment(state) {
    return state.count++;
  },
  setErrMsg(state, { errMessage, errors }) {
    state.errMessage = errMessage;
    return (state.errors = [...(errors || [])]);
  },
  setInfoMessage(state, { message }) {
    return (state.infoMessage = message);
  },
  setProducts(state, { products }) {
    return (state.products = [...products]);
  },
};
