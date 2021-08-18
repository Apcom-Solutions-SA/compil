import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/styles/index.scss"; // global css


import './icons' // icon

window.axios = require("axios");
window.axios.defaults.baseURL = location.hostname == 'localhost' ? 'http://localhost:3000/api/v1': 'https://admin.compil.app/api/v1';
// https://blog.sqreen.com/authentication-best-practices-vue/
const token = localStorage.getItem("token");
if (token) {
   window.axios.defaults.headers.common["Authorization"] = 'Bearer ' + JSON.parse(token);
}

window.moment = require('moment');

import i18n from './locales'

// mixins
import helper from '@/mixins/helper'

// components
import 'bootstrap'
// import { SmartTagz } from "smart-tagz";
// import "smart-tagz/dist/smart-tagz.css"; copy and modified in index.scss
import { VueFinalModal } from 'vue-final-modal'
import VueJsonPretty from 'vue-json-pretty';
import Toast from "vue-toastification";
const toastOptions={}


// local components
import { registerComponents } from '@/plugins/register-components'

// directiv
import myLinkify from '@/directives/linkify'

// PWA
import './registerServiceWorker'


const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)

// directiv
app.directive('linkify', myLinkify)

// mixin
app.mixin(helper)

// register components globally
app.component('VueJsonPretty', VueJsonPretty)
app.component('vue-modal',VueFinalModal)
app.use(Toast, toastOptions);

registerComponents(app)

app.mount('#app')
export default app


