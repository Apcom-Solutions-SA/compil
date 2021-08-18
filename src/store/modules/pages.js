var slugify = require('slugify')

const module = {
  namespaced: true,
  state: {
    pages: JSON.parse(window.localStorage.getItem("pages")) || [],
  },
  mutations: {
    pagesMutation(state, payload) {
      state.pages = payload;
      window.localStorage.setItem("pages", JSON.stringify(payload));
      window.sessionStorage.setItem("pagesUpdated", Date.now());
    }
  },
  actions: {
    // for NavFrontLeft pages with link
    async fetchPages({ state, commit }) {
      return new Promise((resolve, reject) => {
        axios.get("/list/pages")
          .then(({ data }) => {
            commit("pagesMutation", data);
            resolve(data);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      })
    }
  },
  getters: {
    noteIndexMessage: (state) => {
      return state.pages.find(elem => elem.id == 1);
    },
    noteCreateMessage: (state) => {
      return state.pages.find(elem => elem.id == 2);
    },
    homeMessage: (state) => {
      return state.pages.find(elem => elem.id == 3);
    },
    settingsMessage: (state) => {
      return state.pages.find(elem => elem.id == 4);
    },
    getPageById: (state) => (id) => {
      return state.pages.find(elem => elem.id == id);
    },
    getPageBySlug: (state) => (slug) => {      
      for (const page of state.pages) {
        const titles = Object.values(page.title); 
        for (const title of titles) {
          if (slugify(title) == slug ) return page;
        }
      }
    },
    footerPages: (state) => {
      return state.pages.filter(elem => elem.footer == 1);
    }
  }
}

export default module;