<template>
  <base-layout>
    <template v-slot:left>
      <div class="content-container">
        <article v-if="message">
          <h1>{{ message.title[$i18n.locale] }}</h1>
        </article>
      </div>
    </template>

    <template v-slot:right>
      <note-form mode="new"></note-form>
    </template>
  </base-layout>
</template>

<script>
import { mapGetters } from 'vuex'
// import { createNote } from '@/api/note'
import NoteForm from '@/forms/NoteForm';

export default {
  name: 'NoteCreate',
  components: { NoteForm },
  computed: {
    ...mapGetters({
      message: 'pages/noteCreateMessage'
    })
  }
}
</script>

<style>
</style>