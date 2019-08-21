import { auth, usersCollection } from '../../config/firebase'
import router from '../../router'

const user = {
  state: {
    login: false,
    loginErrorCode: '',
    loginErrorMessage: '',
    loginSuccessMessage: '',
    registration: false,
    registrationErrorCode: '',
    registrationErrorMessage: '',
    registrationSuccess: '',
    userDetails: {}
  },

  getters: {
    getUserDetails: state => state.userDetails,
    authenticationStatus: state => ({
      login: state.login,
      loginErrorMessage: state.loginErrorMessage,
      loginSuccessMessage: state.loginSuccessMessage
    })
  },

  mutations: {
    SET_LOGIN_INIT: (state) => {
      state.login = true;
      state.loginErrorCode = '';
      state.loginErrorMessage = '';
      state.loginSuccessMessage = '';
    },

    SET_LOGIN_ERROR: (state, payload) => {
      state.login = false;
      state.loginErrorCode = payload.code;
      state.loginErrorMessage = payload.message;
      state.loginSuccessMessage = '';
    },

    SET_LOGIN_SUCCESS: (state, payload) => {
      state.login = false;
      state.loginErrorCode = '';
      state.loginErrorMessage = '';
      state.loginSuccessMessage = payload;
    },

    SET_REGISTRATION_INIT: (state) => {
      state.registration = true;
      state.registrationErrorCode = '';
      state.registrationErrorMessage = '';
      state.registrationSuccess = '';
    },

    SET_REGISTRATION_ERROR: (state, payload) => {
      state.registration = false;
      state.registrationErrorCode = payload.code;
      state.registrationErrorMessage = payload.message;
      state.registrationSuccess = '';
    },

    SET_REGISTRATION_SUCCESS: (state, payload) => {
      state.registration = false;
      state.registrationErrorCode = '';
      state.registrationErrorMessage = '';
      state.registrationSuccess = payload;
    },

    SET_USER_DETAILS(state, payload) {
      state.userDetails = payload
    }
  },
  
  actions: {
    registerAction: ({commit}, payload) => {
      commit('SET_REGISTRATION_INIT');
      const { 
        email, 
        password,
        firstname,
        middlename,
        lastname,
        birthday
      } = payload

      auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        usersCollection.doc(response.user.uid)
        .set({
          firstname, middlename, lastname, birthday
        })
        .then(() => {
          commit('SET_USER_DETAILS', { uid: response.user.uid })
          commit('SET_REGISTRATION_SUCCESS')
          router.replace('/home')
        })
        .catch(error => commit('REGISTRATION_ERROR', error));
      })
      .catch(error => commit('REGISTRATION_ERROR', error));
    },

    loginAction({commit}, payload) {
      commit('SET_LOGIN_INIT');
      const { email, password } = payload
      const msg = 'User successfully logged in!';

      auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        commit('SET_LOGIN_SUCCESS', msg)
        router.replace('/home')
      })
      .catch(error => commit('SET_LOGIN_ERROR', error))
    },

    logoutAction: () => auth.signOut().then(() => router.replace('/login')),

    setUserDetailsAction({commit}, payload) {
      commit('SET_USER_DETAILS', payload)
    }
  }
}

export default user
