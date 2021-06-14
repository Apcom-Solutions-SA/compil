<template>
  <guest-layout>
    <template v-slot:center>
      <div class="card sm-container">
        <div class="card-body">
          <form v-on:submit.prevent="forgot_password">

            <div class="input-group mb-3">
              <span class="input-group-text">@</span>
              <input
                type="email"
                class="form-control"
                placeholder="identifiant"
                v-model="email"
              />
            </div>

            <div v-if="success_message">{{ success_message }}</div>
            <div class="text-end form-group" v-else>
              <button
                type="submit"
                class="btn btn-outline-primary btn-sm"
              >{{ $t('Send Password')}}</button>
            </div>
          </form>

        </div>
      </div>
    </template>
  </guest-layout>
</template>

<script>
export default {
  data(){
    return {
      email: '', 
      success_message: ''
    }
  },
  methods: {
    forgot_password(){
      axios.post('/forgot/password', { email: this.email })
      .then(() => {
        this.success_message = this.$t('Done, please check your email.'); 
      }).catch(error => {
          const data = error.response && error.response.data;
          if (data) {
            console.log(data);
            this.$message({
              message: data.message,
              type: 'error',
              duration: 10 * 1000
            })
          }
      })
    }
 }
}
</script>

<style>
</style>