import { api } from "@/api/axios.setup";
import Vue from "vue";
import VueAxios from "vue-axios";

Vue.use(VueAxios, api);

export default VueAxios;
