<template>
  <div>
    <span
      class="text-uppercase px-1 pointer"
      :class="{'fw-bold': $i18n.locale===locale}"
      v-for="locale in $i18n.availableLocales"
      :key="locale"
      @click="set_language(locale)"
    >{{ locale }}</span>
  </div>
</template>

<script>
/**
  <select v-model="$i18n.locale" @change="set_language($event.target.value)">
    <option v-for="locale in $i18n.availableLocales" :key="locale">{{ locale }}</option>
  </select>
 */
import { setup } from '@/locales'
export default {
  methods: {
    set_language(lang) {      
      setup(lang); 
      this.$i18n.locale = lang;
      moment.locale(lang);
    }
  }
}
</script>

<style>
</style>