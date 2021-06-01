<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col left-container">
        <div class="top-container position-relative">
          <router-link :to="{  name: 'Home' }">
            <span class="position-absolute top-0 start-0 text-white">
              <svg-icon
                icon-class="logo_compil"
                class="logo"
              ></svg-icon>
            </span>
          </router-link>
          <router-link :to="{  name: 'NoteIndex' }"><b class="position-absolute top-0 start-50 text-white">notes</b></router-link>
          <div class="nav-container pt-5">
            <locale-selection class="me-4" />
            <logout-button />
          </div>
        </div>
        <div class="center-container">
          <div class="container">
            <slot name="left"></slot>
          </div>          
        </div>
      </div>

      <div class="col right-container">
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
            :to="{ name: 'PageShow', params: {id: page.id} }"
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