// https://blog.sqreen.com/authentication-best-practices-vue/

const auth = {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || "",
    authUser: JSON.parse(window.localStorage.getItem("authUser"))   // avoid use "user" as key
  },

  mutations: {
    authUserMutation(state, payload) {
      console.log('authUserMutation');
      state.authUser = payload;
      localStorage.setItem("authUser", JSON.stringify(payload));
      sessionStorage.setItem("authUserUpdated", Date.now());    // window.sessionStorage.getItem("authUserUpdated")  1601982016864 
    },
    logoutMutation(state) {
      state.authUser = null;
      window.localStorage.removeItem("authUser");
      window.localStorage.removeItem("token");
      delete axios.defaults.headers.common['Authorization'];
    },
    tokenMutation(state, payload) {
      console.log('tokenMutation');
      state.token = payload;
      // store token in localStorage
      localStorage.setItem("token", JSON.stringify(payload));
      // set token to axios
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload;
    }
  },

  actions: {
    async registerAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post("/register", payload)
          .then(({ data }) => {
            if (data.user) commit("authUserMutation", data.user);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      })
    },
    async loginAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post("/login", payload)
          .then(({ data }) => {
            // console.log(data); 
            if (data.user) commit("authUserMutation", data.user);
            if (data.token) commit("tokenMutation", data.token)
            resolve(data);
          })
          .catch(error => {
            localStorage.removeItem('token');
            reject(error);
          });
      })
    },

    async logoutAction({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit("logoutMutation")
        resolve()
      })
    },

    async fetchAuthUserInfo({ state, commit }) {
      if (!state.authUser) return;
      return new Promise((resolve, reject) => {
        axios.get("/api/users/" + state.authUser.id)
          .then(({ data }) => {
            // console.log(data);                    
            if (data) commit("authUserMutation", data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      })
    }
  },

  getters: {
    signedIn: state => !!state.token,
    authRoleId: (state) => {
      if (state.authUser) return state.authUser.role_id;
    },
    authUserId: (state) => {
      if (state.authUser) return state.authUser.id;
    },
    authStudioId: (state) => {
      if (state.authUser) return state.authUser.studio_id;
    },
    isAdmin: (state) => {
      if (state.authUser) return state.authUser.role_id === 1;
    },
  }
}


export default auth