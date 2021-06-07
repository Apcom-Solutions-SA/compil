<template>
  <div></div>
</template>

<script>
export default {
  beforeCreate() {
    if (navigator.onLine) {
      if (this.$store.state.auth.token) {
        // if (!window.sessionStorage.getItem("pagesUpdated"))
        this.$store.dispatch("pages/fetchPages");
        if (!window.sessionStorage.getItem("blockUpdated"))
          this.$store.dispatch("block/fetchBlockedIds");
      }
    }
  },
};
</script>

<style>
</style>