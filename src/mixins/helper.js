  
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      pathname: window.location.pathname,
      windowWidth: window.innerWidth,
      small: window.innerWidth < 768,
      development: process.env.NODE_ENV === 'development',
    };
  },
  computed: {
    authUser() {
      return this.$store.state.auth.authUser;
    },
    // getters from vuex Auth
    ...mapGetters('auth', ["signedIn", "authUserId"]),
  },
  methods: {
    dateDisplay(date) {
      if (date) return moment(date, 'YYYY-MM-DD h:mm:ss').format('DD.MM.YYYY');
    },  
    timeDisplay(date) {
      if (date) return moment(date, 'YYYY-MM-DD h:mm:ss').format('hh:mm:ss');
    },
    dateTimeDisplay(date){
      if (date) return moment(date, 'YYYY-MM-DD h:mm:ss').format('DD.MM.YYYY hh:mm:ss');
    },
    goBack() {
      window.history.back();
    }
  }
}