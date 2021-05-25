const module = {
  namespaced: true,
  state: {
    notes: JSON.parse(window.localStorage.getItem("notes")) || [],
  },
  mutations: {
    notesMutation(state, payload) {
      state.notes = payload;
      window.localStorage.setItem("notes", JSON.stringify(payload));
    },    
  },
  actions: {
    async fetchNotes({ state, commit }) {
      return new Promise((resolve, reject) => {
        axios.get("/notes")
          .then(({ data }) => {
            // console.log(data); 
            if (data.data) commit("notesMutation", data.data);  // paginated data
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      })
    }   
  },
  getters: {
  }
}


export default module