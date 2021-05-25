<template>
  <base-layout v-if="note">
    <!-- left side -->
    <template v-slot:left>
      <div class="content-container">
        <h1>{{ note.title }}</h1>
        <p>{{ note.introduction }}</p>

        <!-- action buttons -->
        <div class="flex-left-parent">
          <!-- go back -->
          <button
            class="btn btn-outline-light btn-sm me-3"
            @click="goBack()"
          >{{ $t('front.return') }}</button>

          <!-- edit -->
          <router-link :to="{  name: 'NoteEdit', params: { id: note.id } }">
            <button class="btn btn-outline-light btn-sm me-3">{{ $t('front.edit') }}</button>
          </router-link>

          <!-- delete -->
          <el-popconfirm
            :title="$t('front.confirm_delete')"
            :confirmButtonText="$t('front.yes')"
            :cancelButtonText="$t('front.no')"
            @confirm="deleteItem"
          >
            <template #reference>
              <button class="btn btn-outline-light btn-sm">{{ $t('front.delete') }}</button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </template>

    <!-- right side -->
    <template v-slot:right>
      <div class="content-container container">
        <div class="row">
          <div class="col-md-7">
            <div class="d-flex text-primary">
              <span class="fw-bold">{{ note.title }}</span>
              <span class="ms-auto">#{{ note.reference }}</span>
            </div>

            <!-- author -->
            <div class="d-flex flex-wrap align-items-center">
              {{ $t('front.author')}} :
              <router-link :to="{ name: 'NotesAuthor', params: { author_id: note.user_id}}"><small class="text-primary">{{ note.user_id }}</small></router-link>
              <i
                class="fas fa-user-slash ms-auto text-primary"
                @click="add_block_user(note.user_id)"
              ></i>
            </div>

            <!-- timestamps -->
            <div>
              {{ $t('front.created_at')}} : {{ dateDisplay(note.created_at) }} <br />
              {{ $t('front.updated_at')}} : {{ dateTimeDisplay(note.updated_at) }}
            </div>

            <!-- note content -->
            <div v-html="note.content && note.content[$i18n.locale]" />
          </div>
        </div>
      </div>
    </template>
  </base-layout>
</template>

<script>
import { fetchNote } from '@/api/note'
export default {
  data() {
    return {
      note: null,
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      const id = this.$route.params.id;
      fetchNote(id).then(({ data }) => {
        console.log(data);
        if (data.note) this.note = data.note;
      })
    },

    deleteItem() {
      axios.delete('/notes/' + this.note.id).then(({ data }) => {
        if (data.status == 'success') {
          this.$router.push({ name: 'NoteIndex' });
        }
      })
    },

    add_block_user(object_id) {
      // update in server
      axios.post('/user/relation/add', {
        subject_id: this.authUserId,
        object_id: object_id,
        attribute: 'block'
      }).then(({ data }) => {
        console.log(data); 
          this.$message({
            message: 'success',
            type: 'success',
            duration: 5 * 1000
          })        
      }).catch(error => {
        const data = error.response && error.response.data;
        if (data) {
          this.$message({
            message: data.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
      });
    },
  }
}
</script>

<style>
</style>