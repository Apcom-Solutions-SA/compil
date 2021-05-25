import axios from 'axios'
import {
  ElMessage,
  ElMessageBox
} from 'element-plus'
import store from '@/store'
import { getToken } from '@/utils/auth'


// create an axios instance
const baseurl = location.hostname === 'localhost' ? 'http://localhost:3000/api/v1/' : 'https://admin.compil.app/api/v1/'
const service = axios.create({
  baseURL: baseurl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + JSON.parse(token);
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

  /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
  response => {
    const res = response.data;
    const status = response.status; // by HTTP Status Code
    // if the custom code is not 20000, it is judged as an error.
    if (status !== 200) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (status === 401) {
        // to re-login
        ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('auth/logoutAction').then(() => {
            location.reload()
          })
        })
      }

      // Unprocessable Entity, validation error
      if (status === 422) {
        // process locally
      }

      console.log(status);
      return Promise.reject(response.error)
    } else {
      return response
    }
  },
  error => {
    console.log('error response ' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service