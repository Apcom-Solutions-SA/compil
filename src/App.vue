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
    axios.interceptors.response.use(undefined, function (err){
      return new Promise(function (resolve, reject) {
        if (err.response.status === 401 ) {
          console.log('401 in app.vue');
          localStorage.removeItem("token")
          window.location.href = "/login";
        }
        throw err;
      });
    });
  }
}
</script>
