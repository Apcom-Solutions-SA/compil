<template>
  <base-layout>
    <template v-slot:left>
      <div class="content-container">
        <article v-if="message">
          <h1>{{ message.title[$i18n.locale] }}</h1>
          <div
            v-html="message.content[$i18n.locale] "
            class="mb-3"
          />
        </article>

        <router-link
          :to="{  name: 'NoteCreate' }"
          class="btn btn-outline-light btn-sm px-3"
        >{{ $t('front.publish') }}</router-link>
      </div>
    </template>

    <template v-slot:right>
      <div class="content-container container">
        <div class="mb-3">
          <input
            type="checkbox"
            id="hide_others"
            v-model="hide_others"
            @change="fetch(1)"
          >&nbsp;
          <label for="hide_others">
            {{ $t('front.hide_irrelavent_authors') }}
          </label>

          <router-link :to="{  name: 'Settings' }"><i class="fas fa-cog text-primary ms-3"></i></router-link>
        </div>

        <!-- search input-->
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            :placeholder="$t('front.search')"
            v-model="search_input"
            v-on:keyup.enter="fetch(1)"
          />
        </div>

        <article
          v-for="item in items"
          :key="item.id"
        >
          <header class="d-flex align-items-center">
            <router-link :to="{  name: 'NoteShow', params: { reference: item.reference } }"><strong class="title text-primary">{{ trans(item.title) }}</strong></router-link>
            <div class="flex-right-parent ms-auto">
              <i
                class="fas fa-key text-secondary"
                v-if="item.has_key"
              ></i>
              <small>{{ dateDisplay(item.updated_at) }}</small>
              <router-link :to="{  name: 'NoteShow', params: { reference: item.reference} }"><span class="text-primary">#{{ item.reference }}</span></router-link>
            </div>
          </header>
          <p>{{ trans(item.introduction) }}</p>
        </article>

        <div>
          <paginator
            :dataSet="dataSet"
            @page_changed="fetch"
            class="justify-content-end"
          ></paginator>
        </div>

      </div>
    </template>
  </base-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Paginator from '@/components/Paginator'

export default {
  components: {
    Paginator
  },
  data() {
    return {
      path: '/notes',
      dataSet: false,
      items: [],
      search_input: '',
      hide_others: false
    }
  },
  computed: {
    ...mapGetters({
      message: 'pages/noteIndexMessage'
    }), 
    public_id() {
      if ('public_id' in this.$route.query)
        return this.$route.query.public_id; 
      return null; 
    }, 
    tag() {
      if ('tag' in this.$route.query)
        return this.$route.query.tag; 
      return null; 
    }, 
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch(page) {
      axios.get(this.url(page))
        .then(({ data }) => {
          console.log(data.data);
          this.dataSet = data;
          this.items = data.data;  // pagination 
        })
    },
    url(page) {
      if (!page) {
        let query = location.search.match(/page=(\d+)/);
        page = query ? query[1] : 1;
      }
      var url = this.path + '?page=' + page;
      if (this.search_input.length > 0) url += `&search=${this.search_input}`;
      if (this.hide_others) url +=`&author_id=${this.authUserId}`;
      if (this.public_id) url +=`&public_id=${this.public_id}`;
      if (this.tag) url +=`&tag=${this.tag}`; 
      console.log(url);
      return url;
    },
  }
}
</script>

<style>
</style>