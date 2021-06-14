<template>
  <div class="screen-container container-fluid">
    <div class="position-relative mt-2">
      <router-link :to="{  name: 'Root' }"><span class="position-absolute top-0 start-0 text-white">
          <img
            src="@/assets/logo_compil.svg"
            height=30
          />
        </span></router-link>
    </div>
    <div class="center-container">
      <slot name="center"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>