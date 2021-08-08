<template>
  <app-alert
    :alert="alert"
    @close="alert = null"
  />
  <resume
    @success="setAlert"
    @error="setAlert"
  />
  <app-comments/>
</template>

<script>

import AppAlert from './components/AppAlert.vue';
import Resume from './components/resume/Resume.vue';
import AppComments from './components/AppComments.vue';
import { messages } from '@/utils/constants.js';

export default {
  components: { AppAlert, Resume, AppComments },
  data() {
    return {
      alert: null
    }
  },
  methods: {
    setAlert(options) {
      this.alert = options ? options : messages.error;
    }
  }
}
</script>

<style>
  .component-container {
    position: relative;
  }
  .component-container span.close-btn {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 16px;
    cursor: pointer;
  }
  .component-container:hover span.close-btn {
    display: block;
  }
</style>