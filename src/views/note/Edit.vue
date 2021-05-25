<template>
  <base-layout>
    <template v-slot:left>
      
    </template>

    <template v-slot:right>
      <note-form mode="edit"></note-form>
    </template>
  </base-layout>
</template>

<script>

// import { createNote } from '@/api/note'
import NoteForm from '@/forms/NoteForm';

export default {
  name: 'NoteCreate',
  components: { NoteForm },

  computed: {
  },
}
</script>

<style>
</style>