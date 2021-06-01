const block = {
  namespaced: true,
  state: {
    blockedPids: JSON.parse(window.localStorage.getItem("blockedPids")) || [],
  },
  mutations: {
    blockedPidsMutation(state, payload) {
      state.blockedPids = payload;
      window.localStorage.setItem('blockedPids', JSON.stringify(payload));
    },
    addBlockMutation(state, payload) {
      state.blockedPids.push(payload);
      window.localStorage.setItem('blockedPids', JSON.stringify(state.blockedPids));
    },
    removeBlockMutation(state, payload) {
      const filtered = state.blockedPids.filter(elem => elem != payload);
      state.blockedPids = filtered;
      window.localStorage.setItem('blockedPids', JSON.stringify(filtered));
    }
  },
  actions: {
    async fetchBlockedIds({ commit, rootGetters }) {
      const subject_id = rootGetters['auth/authUserId'];
      return new Promise((resolve, reject) => {
        axios.get(`/user/${subject_id}/relation/block`).then(({ data }) => {
          if (data.objects) {
            const blockedPids = data.objects.map(elem => elem.public_id);
            commit('blockedPidsMutation', blockedPids);
          }
          resolve(data);
        })
          .catch(error => {
            reject(error);
          });
      })
    },

    async addBlock({ state, commit, rootGetters }, pid) {
      const subject_id = rootGetters['auth/authUserId'];
      if (state.blockedPids.includes(pid)) return;
      return new Promise((resolve, reject) => {
        axios.post('/user/relation/add', {
          subject_id: subject_id,
          object_public_id: pid,
          attribute: 'block'
        }).then(({ data }) => {
          if (data.object) commit('addBlockMutation', data.object.public_id);
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      })
    },

    async removeBlock({ state, commit, rootGetters }, pid) {
      const subject_id = rootGetters['auth/authUserId'];
      return new Promise((resolve, reject) => {
        axios.post('/user/relation/remove', {
          subject_id: subject_id,
          object_public_id: pid,
          attribute: 'block'
        }).then(() => {
          commit('removeBlockMutation', pid);
          resolve();
        }).catch(error => {
          reject(error);
        });
      })
    }


  }
}


export default block