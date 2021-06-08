<template>
  <base-layout>
    <!-- left side -->
    <template v-slot:left>
      <div
        class="content-container"
        v-if="page"
      >
        <h1>{{ trans(page.title) }}</h1>
        <p>{{ trans(page.introduction) }}</p>
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