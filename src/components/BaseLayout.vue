<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col left-container">
        <div class="top-container position-relative">
          <router-link :to="{  name: 'Home' }"><span class="position-absolute top-0 start-0 text-white">logo</span></router-link>
          <router-link :to="{  name: 'NoteIndex' }"><b class="position-absolute top-0 start-50 text-white">notes</b></router-link>
        </div>
        <div class="center-container">
          <div class="container">
            <div class="row">
              <div class="col-md-5"></div>
              <div class="col-md-7">
                <slot name="left"></slot>
              </div>
            </div>
          </div>
        </div>
        <div class="p-3">
          <router-link
            :to="{ name: 'PageShow', params: {id: page.id} }"
            v-for="page in footerPages"
            :key="page.id"
          >
            <span class="pe-4 text-white">{{ page.title[$i18n.locale] }}</span>
          </router-link>
        </div>
      </div>

      <div class="col right-container">
        <div class="top-container">
          <locale-selection class="me-4" />
          <logout-button />
        </div>

        <div class="center-container">
          <slot name="right"></slot>
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