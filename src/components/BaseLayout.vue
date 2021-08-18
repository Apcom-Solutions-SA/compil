<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 left-container">
        <div class="top-container">
          <div class="mt-2 d-flex justify-content-between flex-wrap">
            <router-link :to="{ name: 'Home' }">
              <img
                src="@/assets/logo_compil.svg"
                height=30
              />
            </router-link>

            <!-- use a instead of router-link to force refresh the page, reset filters -->
            <a
              href="/notes"
              class="text-white ms-5"
            >notes</a>

            <div class="nav-container">
              <locale-selection class="me-4" />
              <logout-button />
            </div>
          </div>
        </div>

        <div class="center-container">
          <div class="container">
            <slot name="left"></slot>
          </div>
        </div>
      </div>

      <div class="col-md-6 right-container">
        <!-- maintain same height with left side -->
        <div class="top-container">
        </div>

        <div class="center-container">
          <div class="container">
            <slot name="right"></slot>
          </div>
        </div>

        <!-- footer pages-->
        <div class="p-3">
          <router-link
            :to="{ name: 'PageShow', params: { slug: slug_trans(page.title) } }"
            v-for="page in footerPages"
            :key="page.id"
          >
            <span class="pe-4 text-primary">{{ trans(page.title) }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    footerPages() {
      return this.$store.getters['pages/footerPages'];
    }
  },
  methods: {
  }
}
</script>

<style>
</style>