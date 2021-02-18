import axios from 'axios';

const module = {
  namespaced: true,
  state: {
    officialPlaylist: [],
    ugcPlaylist: [],
    zoneList: [],
    hotList: [],
  },
  mutations: {
    setOfficialPlaylist(state, data) {
      state.officialPlaylist = data;
    },
    setUgcPlaylist(state, data) {
      state.ugcPlaylist = data;
    },
    setZoneList(state, data) {
      state.zoneList = data;
    },
    setHotList(state, data) {
      state.hotList = data;
    },
  },
  actions: {
    getAllList(store) {
      return axios('/recommend').then((res) => {
        const arr = res.data;
        store.commit('setOfficialPlaylist', arr[0]);
        store.commit('setUgcPlaylist', arr[1]);
        store.commit('setZoneList', arr[2]);
        store.commit('setHotList', arr[3]);
      });
    },
  },
};

export default module;
