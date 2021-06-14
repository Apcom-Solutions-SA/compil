<template>
  <div class="screen-container container-fluid">
    <div class="position-relative">
      <router-link :to="{  name: 'Root' }"><span class="position-absolute top-0 start-0 text-white">logo</span></router-link>
    </div>
    <div class="center-container">
      <div class="card login-container">
        <div class="card-body">
          <div v-if="expired">
            <p>{{ $t('front.link_expired')}}</p>
            <button
              class="btn btn-link p-0 m-0 align-baseline"
              @click="request_verification_link"
            >{{ $t('click here to request another') }}</button>.
          </div>
          <login-form
            :id="id"
            :hash="hash"
            :signature="query.signature"
            @success="login_success"
            v-else
          />
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
      expired: false,
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    hash() {
      return this.$route.params.hash;
    },
    query() {
      return this.$route.query;
    }
  },
  created() {
    this.check_signature();
  },
  methods: {
    login_success() {
      console.log('login success');
      this.$router.push({ name: 'Home' });  //  can only push to routes without beforeEnter
      // window.location.replace("/home"); 
    },

    check_signature() {
      console.log(this.query);
      const now = Math.floor(Date.now() / 1000);
      if (this.query.expires < now) {
        this.expired = true;
      }
    },

    request_verification_link() {
      axios.post('/email/verification-notification', { id: this.id }).then(() => {
        this.$message({
          message: this.$t('front.success'),
          type: 'success',
          duration: 5 * 1000
        });
      }).catch(error => {
        const data = error.response && error.response.data;
        if (data) {
          console.log(data);
          if (data.errors) {
            this.errors = data.errors;
          }
          this.$message({
            message: data.message,
            type: 'error',
            duration: 10 * 1000
          })
        }
      });
    }
  }
}
</script>