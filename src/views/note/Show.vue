<template>
  <base-layout v-if="note">
    <!-- left side -->
    <template v-slot:left>
      <div class="content-container">
        <h1>{{ trans(note.title) }}</h1>
        <p>{{ trans(note.introduction) }}</p>

        <span class="ms-auto">#{{ note.reference }}</span>

        <!-- author -->
        <div class="d-flex flex-wrap align-items-center">
          {{ $t('front.author')}} :&nbsp;
          <router-link :to="{ name: 'NoteIndex', query: { public_id: note.user.public_id}}"><small>{{ note.user.public_id }}</small></router-link>
          
          <!-- block author -->
          <i
            class="fas ms-auto"
            :class="authorClass(note.user.public_id)"
            :title="getTitle(note.user.public_id)"
            @click="toggle_block_user(note.user.public_id)"
            v-if="authUserId !== note.user_id"
          ></i>
        </div>

        <!-- timestamps -->
        <div class="mb-3">
          {{ $t('front.created_at')}} : {{ dateDisplay(note.created_at) }} <br />
          {{ $t('front.updated_at')}} : {{ dateTimeDisplay(note.updated_at) }}
        </div>

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

            <button
              class="btn btn-outline-light btn-sm"
              @click="showDeleteModal=true"
            >{{ $t('front.delete') }}</button>

            <!-- delete modal-->
            <vue-modal
              v-model="showDeleteModal"
            >
              <div class="card delete_modal">
                <div class="card-body">{{ $t('front.confirm_delete') }}</div>
                <div class="card-footer text-end">
                  <button class="btn btn-sm btn-primary me-2" @click="deleteItem">{{ $t('front.yes') }}</button>
                  <button class="btn btn-sm btn-secondary">{{ $t('front.no') }}</button>
                </div>
              </div>
            </vue-modal>

          </template>
        </div>
      </div>
    </template>

    <!-- right side -->
    <template v-slot:right>
      <div class="content-container">
        <div
          class="input-group mb-3"
          v-if="note.has_key && !key_passed"
        >
          <span class="input-group-text"><i class="fas fa-key"></i></span>
          <input
            type="text"
            class="form-control"
            v-model="key"
            :placeholder="$t('front.please_enter_decryption_key')"
            @change="check_key"
          />
        </div>
        <!-- note content -->
        <template v-else>
          <div
            v-html="trans(note.content)"
            class="ProseMirror"
            v-linkify
          />
        </template>
      </div>
    </template>
  </base-layout>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      note: null,
      key: '',
      key_passed: false,
      showDeleteModal: false
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

    check_key() {
      axios.post(`/notes/${this.note.id}/key`, { key: this.key }).then(({ data }) => {
        this.key_passed = true;
        if (data.content) this.note.content = data.content;
      }).catch(error => {
        console.log(error);
        const toast = useToast();
        const message = error.response.data && error.response.data.message;
        toast.error(message || 'Error'); 
      })
    },

    // icon to toggle block author
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

    getTitle(pid) {
      return this.blockedPids.includes(pid) ? this.$t('front.deblock') : this.$t('front.unlist');
    },

  }
}
</script>

<style>
</style>