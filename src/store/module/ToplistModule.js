import axios from 'axios';

const module = {
  namespaced: true,
  state: {
    topList: [],
  },
  mutations: {
    setTopList(state, data) {
      state.topList = data;
    },
  },
  actions: {
    getTopList(store) {
      return axios('/toplist').then((res) => {
        store.commit('setTopList', res.data);
      });
    },
  },
};

export default module;
