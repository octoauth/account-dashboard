import Vue from "vue";
import Vuex from "vuex";

import fileserver from "./fileserver";
import accounts from "./accounts";
import application from "./application";
import sessions from "./sessions";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    fileserver,
    accounts,
    application,
    sessions,
  },
});
