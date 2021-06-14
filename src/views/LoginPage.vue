<template>
  <guest-layout>
    <template v-slot:center>
      <div class="card sm-container">
        <div class="card-body">
          <login-form @success="login_success" />
          <router-link :to="{ name: 'ForgotPassword'}">
            {{ $t('Forgot Your Password?') }}
          </router-link>
        </div>
      </div>
    </template>
  </guest-layout>
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
    },
  }
}
</script>