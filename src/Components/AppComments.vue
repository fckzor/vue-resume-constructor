<template>
  <div class="container">
    <p v-if="!comments.length">
      <app-button @click="getGomments">Загрузить комментарии</app-button>
    </p>
    <app-loader v-if="loading"/>
    <div class="card" v-if="comments.length">
      <resume-title>Комментарии</resume-title>
      <ul class="list">
        <li class="list-item" v-for="item in comments" :key="item.id">
          <div>
            <p><strong>{{ item.email }}</strong></p>
            <small>{{ item.body }}</small>
          </div>
        </li>
      </ul>
      <p>
        <app-button type="warning" @click="removeComments">Удалить комментарии</app-button>
      </p>
    </div> 
  </div>
</template>
<script>

import ResumeTitle from './resume/ResumeTitle.vue';
import axios from 'axios';
import { loaderTime, commentsUrl } from '@/utils/constants.js';

export default {
  components: { ResumeTitle },
  data() {
    return {
      comments: [],
      loading: false
    }
  },
  methods: {
    getGomments() {
      this.loading = true;
      setTimeout(async () => {
        const { data } = await axios.get(commentsUrl);
        if (data || data.length) {
          this.comments = data;
        }
        this.loading = false;
      }, loaderTime);
    },
    removeComments() {
      this.comments = [];
    }
  }
}
</script>
