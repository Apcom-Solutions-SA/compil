<template>
  <a :class="link_class" @click="logout">
    Logout
  </a>
</template>

<script>
export default {
  name: "LoginForm",
  props:{
    link_class: {
      default: 'btn btn-outline-light btn-sm'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('auth/logoutAction').then(()=>{
        this.$router.push({ name: 'Login' }); 
      });
      
    }
  }
}
</script>