<template>
  <div class="container column">
    <resume-form
      @addComponent="addComponent"
    />

    <app-loader v-if="loader"/>

    <resume-content
      v-else
      :resume="resume"
      :isSaved="isSaved"
      @removeComponent="removeComponent"
      @setResume="setResume"
      @removeResume="removeResume"
    />
  </div>
</template>

<script>
import ResumeForm from './ResumeForm.vue';
import ResumeContent from './ResumeContent.vue';
import { messages, loaderTime, databaseUrl } from '@/utils/constants.js';
import axios from 'axios';

export default {
  components: { ResumeForm, ResumeContent },
  emits: ['error', 'success'],
  data() {
    return {
      resume: [],
      loader: false,
      isSaved: true
    }
  },
  mounted() {
    this.getResume();
  },
  methods: {
    setResume() {
      this.loader = true;
      setTimeout(async () => {
        try {
          // Я хочу, чтобы в базе всегда было только одно резюме, 
          // поэтому перед сохранением нового, удаляю то, что там уже есть
          const response = await axios.delete(databaseUrl);
          if (response.status !== 200) this.$emit('error');

          const { status } = await axios.post(databaseUrl, { ...this.resume });
          if (status === 200) {
            this.$emit('success', messages.successSave);
            this.isSaved = true;
          }
        } catch {
          this.$emit('error');
        }
        this.loader = false;
      }, loaderTime);
    },
    getResume() {
      this.loader = true;
      setTimeout(async () => {
        try {
          const { status, data } = await axios.get(databaseUrl);
          if (status === 200 && data) {
            for(let key in data) {
              data[key].map(item => this.resume.push(item));
            }
          }
        } catch {
          this.$emit('error');
        }
        this.loader = false;
      }, loaderTime);
    },
    removeResume() {
      this.loader = true;
      setTimeout(async () => {
        try {
          const { status } = await axios.delete(databaseUrl);
          if (status === 200) {
            this.resume = [];
            this.$emit('success', messages.successRemove);
          }
        } catch {
          this.$emit('error');
        }
        this.loader = false;
      }, loaderTime);
    },
    addComponent(data) {
      if (data.content) {
        this.resume.push({
          component: data.componentName,
          content: data.content
        });
        this.isSaved = false;
      }
    },
    removeComponent(idx) {
      this.resume.splice(idx, 1);
      this.isSaved = false;
    }
  }
}
</script>