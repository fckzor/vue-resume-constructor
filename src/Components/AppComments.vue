<template>
  <div class="container">
    <p v-if="!comments.length">
      <AppButton @click="getGomments">Загрузить комментарии</AppButton>
    </p>
    <AppLoader v-if="loading"/>
    <div class="card" v-if="comments.length">
      <AppTitle>Комментарии</AppTitle>
      <ul class="list">
        <li class="list-item" v-for="item in comments" :key="item.id">
          <div>
            <p><strong>{{ item.email }}</strong></p>
            <small>{{ item.body }}</small>
          </div>
        </li>
      </ul>
      <p>
        <AppButton type="warning" @click="removeComments">Удалить комментарии</AppButton>
      </p>
    </div> 
  </div>
</template>
<script>

import AppTitle from './AppTitle.vue';
import AppButton from './AppButton.vue';
import AppLoader from './AppLoader.vue';
import axios from 'axios';

export default {
  components: { AppTitle, AppButton, AppLoader },
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
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=42');
        if (data || data.length) {
          this.comments = data;
        }
        this.loading = false;
      }, 1000);
    },
    removeComments() {
      this.comments = [];
    }
  }
}
</script>
