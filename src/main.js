import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/styles/index.scss"; // global css


import './icons' // icon
import './utils/error-log' // error log

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
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import VueJsonPretty from 'vue-json-pretty';


// local components
import { registerComponents } from '@/plugins/register-components'
import SvgIcon from '@/components/SvgIcon'// svg component
import LocaleSelection from '@/components/LocaleSelection.vue' 
import LogoutButton from '@/components/LogoutButton.vue'


const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)
app.use(ElementPlus)

// mixin
app.mixin(helper)

// register components globally
app.component('SvgIcon', SvgIcon)
app.component('LocaleSelection', LocaleSelection)
app.component('LogoutButton', LogoutButton)
app.component('VueJsonPretty', VueJsonPretty)

registerComponents(app)

app.mount('#app')
export default app


