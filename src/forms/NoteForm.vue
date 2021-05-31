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
      </div>
    </div>

    <!-- translable fields -->

    <el-tabs
      v-model="activeTab"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(locale, index) in $i18n.availableLocales"
        :key="index"
        :label="locale"
        :name="'tab_'+ locale"
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

        <!-- tags -->
        <div class="form-group mb-3">
          <label for="tags">{{ $t('front.tags') }}</label>
          <vue-tags-input
            v-model="tag"
            :tags="item.tags[locale]"
            @tags-changed="newTags => item.tags[locale] = newTags"
          />
        </div>

        <!-- content -->
        <div class="form-group mb-3">
          <label :for="'content_'+locale">{{ $t('front.content', locale) }}</label>
          <tip-tap v-model="item.content[locale]" />
        </div>
      </el-tab-pane>
    </el-tabs>

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
import { fetchNote } from '@/api/note'
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
        introduction: '',
        title: {},
        content: {},   
        tags: {},     
      },
      keyPattern: `[^\s'"]`,      
      tag: '',
      tags_key: 0,
      activeTab: 'tab_' + this.$i18n.locale
    }
  },
  created() {
    if (this.mode == 'edit') {
      this.fetchData();
    }
    else{
      for (const locale of this.$i18n.availableLocales){
        this.item.tags[locale] = [];
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.activeTab)
      console.log(tab, event);
      this.tag= '';  // reset tag input
    },

    add() {
      axios.post('/notes', this.item)
        .then(({ data }) => {
          const id = data.note.id;          
          this.$router.push({
            name: 'NoteShow', params: {
              id: id
            }
          });
        })
      /*
      createNote( this.item ).then(({ data }) => {
        console.log('createNote', data);
      })
      */
    },

    update() {
      axios.patch('/notes/' + this.item.id, {
        ...this.item,
        tags: this.tags,
      })
        .then(({ data }) => {
          // console.log('udpatedNote', data);
          this.$router.push({
            name: 'NoteShow', params: {
              id: this.item.id
            }
          });
        }).catch(error => {
          console.log(error && error.response.data);
        })
    },

    fetchData() {
      const id = this.$route.params.id;
      fetchNote(id).then(({ data }) => {
        console.log(data);
        if (data.note) this.item = data.note;
        if (data.tags) {
          const tags = data.tags.map(elem => elem.name);
          // this.tags = Object.values(tags);
          console.log('tags', tags);
          // this.tags = tags;
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

  }
}
</script>

<style>
</style>