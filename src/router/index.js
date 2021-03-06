import { createRouter, createWebHistory } from 'vue-router'
import store from '../store' // your vuex store 

const signedIn = !! store.state.auth.token; 

const guest = (to, from, next) => {
  if (!signedIn) {
    next()
    return
  }
  next('/home')
}

const auth = (to, from, next) => {
  if (signedIn) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'Root',
    component: () => import('@/views/HomePage'), 
    // beforeEnter: auth,  // this.$router.push({ name: 'Home' }); can only push to routes without beforeEnter; check in beforeCreate() 
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage'), 
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage'), 
  },
  {
    path:'/email/verify/:id/:hash', 
    name:'EmailVerification', 
    component: () => import('@/views/EmailVerification')
  },
  {
    path:'/forgot/password', 
    name: 'ForgotPassword', 
    component: () => import('@/views/ForgotPassword')
  },
  {
    path: '/notes',
    name: 'NoteIndex',
    component: () => import('@/views/note/List')
  },
  {
    path: '/note/create',
    name: 'NoteCreate',
    component: () => import('@/views/note/Create')
  },
  {
    path: '/note/:reference',
    name: 'NoteShow',
    component: () => import('@/views/note/Show')
  },
  {
    path: '/note/:reference/edit',
    name: 'NoteEdit',
    component: () => import('@/views/note/Edit')
  },
  {
    path: '/settings', 
    name: 'Settings', 
    component: () => import('@/views/SettingsPage')
  }, 
  {
    path:'/page/:slug', 
    name:'PageShow',
    component: () => import('@/views/PageShow')
  }
]

export const router = new createRouter({
  history: createWebHistory(),
  routes
})

export default router