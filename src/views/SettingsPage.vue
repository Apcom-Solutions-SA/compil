<template>
  <base-layout>
    <!-- left side -->
    <template v-slot:left>
      <div class="content-container">
        <article v-if="message">
          <h1>{{ message.title[$i18n.locale] }}</h1>
          <div
            v-html="message.content[$i18n.locale] "
            class="mb-3"
          />
        </article>
      </div>
    </template>

    <template v-slot:right>
      <div class="container full-height">
        <!-- block users -->
        <div class="mb-5">
          <div class="mb-3">
            <label
              for="block_user"
              class="fw-bold mb-2"
            >{{ $t('front.blacklist') }} <span class="text-lowercase">{{ $t('front.authors')}}</span></label><br>

            <div class="row align-items-center">
              <div class="col-md-8">
                <input
                  type="text"
                  class="form-control"
                  v-model.number="block_user"
                  id="block_user"
                  :placebolder="$t('front.author_id')"
                />
              </div>
              <div class="col-md-4">
                <a
                  class="text-primary text-lowercase"
                  @click="add_block_user"
                >{{ $t('front.add') }}</a>
              </div>

            </div>

          </div>

          <ul class="list-unstyled">
            <li
              v-for="object in blocklist"
              :key="object.id"
              class="row"
            >
              <div class="col-md-8">
                {{ object.id }}
              </div>
              <div class="col-md-4">
                <span
                  class="ms-auto poiter text-primary"
                  @click="remove_block_user(object.id)"
                >{{ $t('front.remove')}}
                </span>
              </div>
            </li>
          </ul>
        </div>

        <!-- parameters -->
        <div class="fw-bold mb-3">{{ $t('front.parameters')}}</div>
        <input
          type="checkbox"
          id="set_min"
          v-model="set_min"
          @change="update_setting('set_min', set_min)"
        >
        <label for="set_min">
          &nbsp;
          {{ $t('front.authors_having_minimum_of') }}
          <input
            type="number"
            step="1"
            v-model="min"
            class="input-sm"
            @change="update_setting('min', $event.target.value)"
          />
          {{ $t('front.notes_on_line')}}
        </label>

      </div>
    </template>
  </base-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'

export default {
  computed: {
    ...mapGetters({
      message: 'pages/settingsMessage'
    })
  },
  data() {
    return {
      block_user: '',
      blocklist: [],
      errors: {},
      set_min: false,
      min: '',
    }
  },
  created() {
    this.fetch_blocked();
    this.fetch_setting();
  },
  methods: {
    fetch_blocked() {
      axios.get(`/user/${this.authUserId}/relation/block`).then(({ data }) => {
        this.blocklist = data;
      })
    },

    add_block_user() {
      if (this.block_user.length === 0) return; 
      if (this.blocklist.map(elem => elem.id).includes(this.block_user)) return;
      // update in server
      axios.post('/user/relation/add', {
        subject_id: this.authUserId,
        object_id: this.block_user,
        attribute: 'block'
      }).then(({ data }) => {
        console.log(data);
        if (data.object) this.blocklist.push(data.object);
        this.errors = {}
      }).catch(error => {
        const data = error.response && error.response.data;
        if (data) {
          console.log(data);
          if (data.errors) {
            this.errors = data.errors;
          }
          this.$message({
            message: data.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
      });
    },

    remove_block_user(user_id) {
      // update in server
      axios.post('/user/relation/remove', {
        subject_id: this.authUserId,
        object_id: user_id,
        attribute: 'block'
      }).then(() => {
        const index = this.blocklist.findIndex(elem => elem.id === user_id);
        if (index > -1) this.blocklist.splice(index, 1);
      }).catch(error => {
        const data = error.response && error.response.data;
        if (data) {
          console.log(data);
          this.$message({
            message: data.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
      });
    },

    fetch_setting() {
      axios.get(`/user/${this.authUserId}/settings`).then(({ data }) => {
        console.log(data);
        if (data.user_setting) {
          this.set_min = data.user_setting.set_min ? true : false;
          this.min = data.user_setting.min;
        }
      });
    },

    update_setting(attribute, value) {
      console.log(attribute, value);
      axios.post('/user/settings', {
        user_id: this.authUserId,
        [attribute]: value
      });
    }
  }
}
</script>

<style>
</style>