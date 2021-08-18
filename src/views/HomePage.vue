<template>
  <base-layout>
    <!-- left side -->
    <template v-slot:left>
      <div class="content-container">
        <h1 class="mb-4">{{ $t('front.add') }}</h1>

        <form v-on:submit.prevent="postEmail">
          <div class="input-group mb-3">
            <span
              class="input-group-text"
              id="email"
            >@</span>
            <input
              type="email"
              class="form-control"
              aria-label="email"
              v-model="email"
              :placeholder="$t('front.enter_email')"
              required
            >
          </div>

          <div
            v-for="(error, index) in errors.email"
            :key="index"
          >{{ error }}</div>

          <div class="text-end">
            <button class="btn btn-outline-light btn-sm px-3">{{ $t('front.add') }}</button>
          </div>
        </form>
      </div>
    </template>

    <template v-slot:right>
      <div class="content-container">
        <article v-if="message">
          <h1>{{ message.title[$i18n.locale]}}</h1>
          <div
            v-html="message.content[$i18n.locale]"
            v-if="message"
            class="mb-3"
          />
        </article>
      </div>
    </template>

  </base-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { useToast } from "vue-toastification";
export default {
  data() {
    return {
      email: '',
      errors: {}
    };
  },
  computed: {
    ...mapGetters({
      message: 'pages/homeMessage'
    })
  },
  beforeCreate() {
    if (!this.$store.state.auth.token) this.$router.push({ name: 'Login' });
  },
  methods: {
    postEmail() {
      console.log(this.email);
      const toast = useToast();
      axios.post('/user/email', { email: this.email })
        .then(({ data }) => {
          if (data.status == 'success') {
            toast.success(this.$t('front.added_success')); 
            this.errors = {};
          }
        })
        .catch(error => {
          const data = error.response && error.response.data;
          if (data) {
            console.log(data);
            if (data.errors) {
              this.errors = data.errors;
            }
            toast.error(data.message); 
          }
        });
    }
  },
};
</script>

<style>
</style>