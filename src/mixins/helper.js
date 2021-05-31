  
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
    trans(value, locale){
      if (! value) return; 
      if (typeof value ==='string') return value; 
      const lo = locale ? locale: this.$i18n.locale; 
      let translated = value[lo]; // this.$i18n.locale
      if (typeof translated ==='string' ) return translated; 
    },
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