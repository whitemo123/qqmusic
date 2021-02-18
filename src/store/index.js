import Vue from 'vue';
import Vuex from 'vuex';
import ToplistModule from './module/ToplistModule';
import RecommendModule from './module/RecommendModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ToplistModule,
    RecommendModule,
  },
});
