<template>
  <!-- use div instead of form tag, prevent submit by buttons from tags input -->
  <div
    v-on:submit.prevent="post"
    class="note-form container-fluid"
  >
    <div class="row">
      <div class="col-md-7">
        <!-- encrypt key -->
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="user-key"
            ><i
                class="fas fa-key"
                style="line-height: 1.6"
              ></i></span>
          </div>
          <input
            type="text"
            class="form-control"
            :pattern="keyPattern"
            v-model="item.key"
            :title="$t('front.note_key_limite')"
          >
        </div>

        <!-- title -->
        <div class="form-group mb-3">
          <label for="title">{{ $t('front.title') }}</label>
          <input
            type="text"
            class="form-control"
            id="title"
            maxlength="140"
            v-model="item.title"
            required
          >
        </div>

        <!-- introduction -->
        <div class="form-group mb-3">
          <label for="introduction">{{ $t('front.intro') }}</label>
          <input
            type="text"
            class="form-control"
            id="introduction"
            maxlength="280"
            v-model="item.introduction"
            required
          >
        </div>

        <!-- tags -->
        <div class="form-group mb-3">
          <label for="tags">{{ $t('front.tags') }}</label>
          <smart-tagz
            autosuggest
            editable
            inputPlaceholder=""
            :allowPaste="{delimiter: ','}"
            :allowDuplicates="false"
            :maxTags="20"
            :defaultTags="tags"
            :on-changed="tagsChanged"
            :key="tags_key"
          />
        </div>
      </div>
    </div>

    <!-- translable fields -->

    <el-tabs
      v-model="activeTab"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(locale, index) of $i18n.availableLocales"
        :key="index"
        :label="locale"
        :name="'tab_'+ locale"
      >
        <!-- content -->
        <div class="form-group mb-3">
          <label :for="'content_'+locale">{{ $t('front.content', locale) }}</label>
          <tip-tap v-model="item['content_'+locale]" />
        </div>
      </el-tab-pane>
    </el-tabs>

    <div>
      <button
        type="submit"
        class="btn btn-outline-primary btn-sm"
        @click="this.mode==='new' ? add(): update()"
      >{{ $t('front.save')}}</button>
    </div>
  </div>
</template>

<script>
import TipTap from '../components/TipTap'
import { fetchNote } from '@/api/note'
export default {
  components: { TipTap },
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
        title: '',
        introduction: '',
        content: ''
      },
      keyPattern: `[^\s'"]`,
      tags: [],
      tags_key: 0,
      translatables: ['content'],
      activeTab: 'tab_' + this.$i18n.locale
    }
  },
  created() {
    if (this.mode == 'edit') {
      this.fetchData();
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.activeTab)
      console.log(tab, event);
    },

    tagsChanged(value) {
      this.tags = value;
    },

    add() {
      axios.post('/notes', {
        ...this.item,
        tags: this.tags,
      })
        .then(({ data }) => {
          console.log('createNote', data);
          this.$router.push({ name: 'NoteIndex' });
        })
      /*
      createNote( this.item ).then(({ data }) => {
        console.log('createNote', data);
      })
      */
    },

    fetchData() {
      const id = this.$route.params.id;
      fetchNote(id).then(({ data }) => {
        console.log(data);
        if (data.note) this.item = data.note;
        if (data.tags) {
          // tags 
          // const locale = this.$i18n.locale;
          const locale = 'fr'; // no care for locales yet, all taken as 'fr'
          const tags = data.tags.map(elem => elem.name[locale]);
          // this.tags = Object.values(tags);
          console.log('tags', tags);
          this.tags = tags;
          this.tags_key++; // to force update tags

          // content 
          for (const translatable of this.translatables) {
            for (const locale of this.$i18n.availableLocales) {
              if (this.item[translatable] && this.item[translatable][locale]) {
                this.item[translatable + '_' + locale] = this.item[translatable][locale];
              }
            }
          }
        }
      })
    },

    update() {
      axios.patch('/notes/' + this.item.id, {
        ...this.item,
        tags: this.tags,
        locale: this.$i18n.locale
      })
        .then(({ data }) => {
          // console.log('udpatedNote', data);
          this.$router.push({
            name: 'NoteShow', params: {
              id: this.item.id
            }
          });
        })
    },

  }
}
</script>

<style>
</style>