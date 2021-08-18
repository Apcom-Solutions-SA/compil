<template>
  <!-- use div instead of form tag, prevent submit by buttons from tags input -->
  <div
    v-on:submit.prevent="post"
    class="note-form container-fluid"
    v-if="authorized"
  >
    <div class="row">
      <div class="col-md-7">
        <!-- encrypt key -->
        <div class="input-group mb-3">
          <span
            class="input-group-text"
            id="user-key"
          ><i class="fas fa-key"></i></span>
          <input
            type="text"
            class="form-control"
            :pattern="keyPattern"
            v-model="item.key"
            :title="$t('front.note_key_limite')"
          >
        </div>
      </div>
    </div>

    <!-- translable fields -->
    <ul class="nav nav-tabs mb-3">
      <li
        v-for="locale of $i18n.availableLocales"
        :key="locale"
        @click="active_locale = locale"
      >
        <a
          data-toggle="tab"
          :href="'#tab_' + locale"
          class="nav-link text-uppercase"
          :class="{ active : active_locale==locale }"
        >{{ locale }}</a>
      </li>
    </ul>

    <div class="tab-content">
      <div
        v-for="locale of $i18n.availableLocales"
        :key="locale"
        :id="'tab_' + locale"
        class="tab-pane fade"
        :class="{ show : active_locale==locale, active: active_locale==locale}"
      >
          <!-- title -->
          <div class="form-group mb-3">
            <label :for="'title_'+locale">{{ $t('front.title', locale) }}</label>
            <input
              type="text"
              class="form-control"
              :id="'title_'+locale"
              maxlength="140"
              v-model="item.title[locale]"
            >
          </div>

          <!-- introduction -->
          <div class="form-group mb-3">
            <label :for="'introduction'+locale">{{ $t('front.intro', locale) }}</label>
            <input
              type="text"
              class="form-control"
              :id="'introduction'+locale"
              maxlength="280"
              v-model="item.introduction[locale]"
            >
          </div>

          <!-- tags -->
          <div class="form-group mb-3">
            <label :for="'tags'+locale">{{ $t('front.tags') }}</label>
            <vue-tags-input
              :id="'tags'+locale"
              v-model="tag"
              :tags="item.tags && item.tags[locale] || []"
              @tags-changed="newTags => item.tags[locale] = newTags"
            />
          </div>

          <!-- content -->
          <div class="form-group mb-3">
            <label :for="'content_'+locale">{{ $t('front.content', locale) }}</label>
            <tip-tap
              :id="'content_'+locale"
              v-model="item.content[locale]"
            />
          </div>
      </div>
    </div>
    
    <div>
      <button
        class="btn btn-outline-primary btn-sm"
        @click="this.mode==='new' ? add(): update()"
      >{{ $t('front.save')}}</button>
    </div>
  </div>
</template>

<script>
import TipTap from '../components/TipTap'
import VueTagsInput from '@sipec/vue3-tags-input';

export default {
  name: "NoteForm",
  components: { TipTap, VueTagsInput },
  props: {
    mode: {
      type: String,
      default: 'new'   // 'new' or 'edit'
    },
  },
  data() {
    return {
      item: {
        key: '',
        introduction: {},
        title: {},
        content: {},
        tags: {},
      },
      keyPattern: `[^\s'"]`,
      tag: '',
      active_locale: this.$i18n.locale,
      authorized: false,

    }
  },
  created() {
    if (this.mode == 'edit') {
      this.fetchData();
    }
    else {
      this.authorized = true;
      this.init_translatables();
    }
  },
  methods: {
    add() {
      axios.post('/notes', this.item)
        .then(({ data }) => {
          const reference = data.note.reference;
          this.$router.push({
            name: 'NoteShow', params: {
              reference: reference
            }
          });
        })
    },

    update() {
      axios.patch('/notes/' + this.item.id, this.item)
        .then(({ data }) => {
          console.log('udpatedNote', data);
          this.$router.push({
            name: 'NoteShow', params: {
              reference: this.item.reference
            }
          });
        }).catch(error => {
          console.log(error && error.response.data);
        })
    },

    fetchData() {
      const reference = this.$route.params.reference;
      axios.get(`/notes/${reference}`, { params: { with_key: true } }).then(({ data }) => {
        console.log(data);
        if (data.note) this.item = data.note;
        if (data.key) this.item.key = data.key;
        if (data.content) this.item.content = data.content;
        this.authorized = this.authUserId === this.item.user_id;
        this.init_translatables();
      })
    },

    init_translatables() {
      const translatables = ['title', 'introduction', 'content', 'tags'];
      for (const attribute of translatables) {
        if (this.item[attribute] == null) this.item[attribute] = {};
      }
      for (const locale of this.$i18n.availableLocales) {
        if (!this.item.tags[locale]) this.item.tags[locale] = [];
      }
    },

  }
}
</script>

<style>
</style>