<template>
  <base-layout v-if="note">
    <!-- left side -->
    <template v-slot:left>
      <div class="content-container">
        <h1>{{ trans(note.title) }}</h1>
        <p>{{ trans(note.introduction) }}</p>

        <!-- action buttons -->
        <div class="flex-left-parent">
          <!-- go back -->
          <button
            class="btn btn-outline-light btn-sm me-3"
            @click="goBack()"
          >{{ $t('front.return') }}</button>

          <template v-if="authUserId===note.user_id">
            <!-- edit -->
            <router-link :to="{  name: 'NoteEdit', params: { reference: note.reference } }">
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
          </template>
        </div>
      </div>
    </template>

    <!-- right side -->
    <template v-slot:right>
      <div class="content-container">
        <div class="d-flex text-primary">
          <span class="fw-bold">{{ trans(note.title) }}</span>
          <span class="ms-auto">#{{ note.reference }}</span>
        </div>

        <!-- author -->
        <div class="d-flex flex-wrap align-items-center">
          {{ $t('front.author')}} :
          <router-link :to="{ name: 'NotesAuthor', params: { author_public_id: note.user.public_id}}"><small class="text-primary">{{ note.user.public_id }}</small></router-link>
          <i
            class="fas ms-auto"
            :class="authorClass(note.user.public_id)"
            :title="title(note.user.public_id)"
            @click="toggle_block_user(note.user.public_id)"
            v-if="authUserId !== note.user_id"
          ></i>
        </div>

        <!-- timestamps -->
        <div class="mb-3">
          {{ $t('front.created_at')}} : {{ dateDisplay(note.created_at) }} <br />
          {{ $t('front.updated_at')}} : {{ dateTimeDisplay(note.updated_at) }}
        </div>

        <!-- note content -->
        <div v-html="note.content && note.content[$i18n.locale]" class="ProseMirror" />
      </div>
    </template>
  </base-layout>
</template>

<script>
export default {
  data() {
    return {
      note: null,
    }
  },
  created() {
    this.fetch();
  },
  computed: {
    blockedPids() {
      return this.$store.state.block.blockedPids;
    }
  },
  methods: {
    fetch() {
      const reference = this.$route.params.reference;
      axios.get(`/notes/${reference}`)
        .then(({ data }) => {
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

    toggle_block_user(pid) {
      console.log(pid);
      if (this.blockedPids.includes(pid)) {
        this.$store.dispatch('block/removeBlock', pid);
      }
      else {
        this.$store.dispatch('block/addBlock', pid);
      }
    },

    authorClass(pid) {
      return this.blockedPids.includes(pid) ? 'fa-user-slash text-danger' : 'fa-user text-primary pointer';
    },
    title(pid) {
      return this.blockedPids.includes(pid) ? this.$t('front.deblock') : this.$t('front.block');
    }
  }
}
</script>

<style>
</style>