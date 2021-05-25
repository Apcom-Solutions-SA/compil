<template>
  <div>
    <a
      class="text-uppercase text-primary px-1"
      :class="{'fw-bold': $i18n.locale===locale}"
      v-for="locale in $i18n.availableLocales"
      :key="locale"
      @click="set_language(locale)"
    >{{ locale }}</a>
  </div>
</template>

<script>
/**
                    <select v-model="$i18n.locale" @change="set_language($event.target.value)">
                        <option v-for="locale in $i18n.availableLocales" :key="locale">{{ locale }}</option>
                    </select>
 */
export default {
  methods: {
    set_language(lang) {
      this.$i18n.locale = lang;
      moment.locale(lang);
    }
  }
}
</script>

<style>
</style>