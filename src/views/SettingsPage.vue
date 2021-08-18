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
      <div class="content-container">
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
                  :placebolder="$t('front.author_key')"
                />
              </div>
              <div class="col-md-4">
                <a
                  class="text-primary text-lowercase"
                  @click="add_block_user(block_user)"
                >{{ $t('front.add') }}</a>
              </div>

            </div>

          </div>

          <ul class="list-unstyled">
            <li
              v-for="item in blockedPids"
              :key="item"
              class="row"
            >
              <div class="col-md-8">
                {{ item }}
              </div>
              <div class="col-md-4">
                <span
                  class="ms-auto poiter text-primary pointer"
                  @click="remove_block_user(item)"
                >{{ $t('front.remove')}}
                </span>
              </div>
            </li>
          </ul>
        </div>

        <!-- parameters -->
        <div v-if="false">
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

      </div>
    </template>
  </base-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      message: 'pages/settingsMessage'
    }), 
    blockedPids(){
      return this.$store.state.block.blockedPids; 
    }
  },
  data() {
    return {
      block_user: '',
      errors: {},
      set_min: false,
      min: '',
    }
  },
  created() {
    this.fetch_block();    
  },
  methods: {
    fetch_block(){
      this.$store.dispatch('block/fetchBlockedIds').then((data) => console.log(data)); 
    },
    add_block_user(pid) {
      if (pid.length === 0) return;
      if (this.blockedPids.includes(pid)) return;
      // update in server
      this.$store.dispatch('block/addBlock', pid).then(()=>{
        this.block_user = ''; 
      });       
    },

    remove_block_user(pid) {
      // update in server
      this.$store.dispatch('block/removeBlock', pid); 
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