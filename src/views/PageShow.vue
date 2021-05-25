<template>
  <base-layout>
    <!-- left side -->
    <template v-slot:left>
      <div
        class="content-container"
        v-if="page"
      >
        <h1>{{ page.title[$i18n.locale]}}</h1>
        <p>{{ page.introduction[$i18n.locale]}}</p>
      </div>
    </template>

    <template v-slot:right>
      <div class="content-container">
        <div v-html="page.content[$i18n.locale]" />
      </div>
    </template>

  </base-layout>
</template>

<script>

export default {
  computed: {
    page() {
      const page_id = this.$route.params.id;
      return this.$store.getters['pages/getPageById'](page_id);
    }
  }
}
</script>

<style>
</style>