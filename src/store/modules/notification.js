const notification = {
  state: {
    isTriggered: false,
    isError: false,
    title: '',
    message: ''
  },

  getters: {
    getNotificationStatus: state => ({
      isTriggered: state.isTriggered,
      isError: state.isError,
      title: state.title,
      message: state.message
    })
  },

  mutations: {
    SET_NOTIFICATION: (state, payload) => {
      state.isTriggered = payload.isTriggered;
      state.isError = payload.isError;
      state.title = payload.title;
      state.message = payload.message;
    }
  },

  actions: {
    setNotificationAction: ({commit}, payload) => {
      commit('SET_NOTIFICATION', payload);
    }
  }
}

export default notification;