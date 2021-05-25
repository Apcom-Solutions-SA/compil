<template>
  <div>
    <the-single></the-single>

    <div id="content-wrapper">
      <router-view />
    </div>
    <div id="footer"></div>
  </div>
</template>

<script>
import TheSingle from './components/TheSingle.vue'

export default {
  name: 'App',
  components: {
    TheSingle,
  },
  created() {
    /**
     * Handling the unauthorized case scenario
     * https://blog.sqreen.com/authentication-best-practices-vue/
     */    
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch('auth/LogoutAction')
          // you can also redirect to /login if needed !
        }
        throw err;
      });
    });
  }
}
</script>
