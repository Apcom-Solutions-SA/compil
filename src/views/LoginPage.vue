<template>
  <div class="screen-container container-fluid">
    <div class="position-relative">
      <router-link :to="{  name: 'Root' }"><span class="position-absolute top-0 start-0 text-white">logo</span></router-link>
    </div>
    <div class="center-container">
      <div class="card login-container">
        <div class="card-body">
          <login-form @success="login_success" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginForm from '@/forms/LoginForm'
export default {
  name: 'Login',
  components: {
    LoginForm
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    login_success() {
      console.log('login success');
      this.$router.push({ name: 'Home' });  //  can only push to routes without beforeEnter
      // window.location.replace("/home"); 

    }
  }
}
</script>