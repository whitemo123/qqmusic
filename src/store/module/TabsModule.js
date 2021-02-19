const module = {
  namespaced: true,
  state: {
    activeIndex: 0,
  },
  mutations: {
    setActiveIndex(state, data) {
      state.activeIndex = data;
    },
  },
};

export default module;
