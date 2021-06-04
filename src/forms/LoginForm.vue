<template>
  <form v-on:submit.prevent="login()">
    <div class="py-3">
      <div
        class="alert alert-danger"
        role="alert"
        v-if="message"
      >{{ message }}</div>
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text">@</span>
      <input
        type="email"
        class="form-control"
        placeholder="identifiant"
        v-model="email"
      />
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">*</span>
      </div>
      <input
        type="password"
        class="form-control"
        placeholder="mot de passe"
        v-model="password"
      />
    </div>

    <div class="text-right form-group">
      <button
        type="submit"
        class="btn btn-outline-primary"
      >{{ $t('front.login')}}</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  props:['id', 'hash','signature'],
  data() {
    return {
      email: "",
      password: "",
      message: ""
    };
  },
  methods: {
    login(e) {
      this.message = "";
      let request_data = {
          email: this.email,
          password: this.password
        }; 
      if (this.hash) request_data = { ...request_data, id: this.id, hash: this.hash}; 
      this.$store
        .dispatch("auth/loginAction", request_data)
        .then((data) => {
          this.$emit("success");
        }, error => {
          console.log(error);
          const message = error.response.data && error.response.data.message;
          if (message) this.message = message;
        })
        ;
    }
  }
};
</script>