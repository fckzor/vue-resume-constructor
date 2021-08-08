<template>
  <div class="card card-w70">
    <div v-if="resume.length">
      <component
        v-for="(item, idx) in resume"
        :is="item.component"
        :key="item"
        v-bind="item"
      >
        <template #close>
          <span class="close-btn" @click="remove(idx)">&#10006;</span>
        </template>
      </component>
      
      <div class="bottom">
        <hr>
        <app-button @click="$emit('setResume')">Сохранить резюме &#10003;</app-button>
        <app-button type="warning" @click="$emit('removeResume')">Удалить резюме &#10006;</app-button>
        <div v-if="!isSaved">
          <small>Сохраните данные перед тем как покинуть старницу!</small>
        </div>
      </div>
    </div>

    <h3 v-else>Добавьте первый блок, чтобы увидеть результат</h3>
  </div>
</template>

<script>
import ResumeTitle from './ResumeTitle.vue';
import ResumeSubtitle from './ResumeSubtitle.vue';
import ResumeText from './ResumeText.vue';
import ResumeAvatar from './ResumeAvatar.vue';

export default {
  components: { ResumeTitle, ResumeSubtitle, ResumeText, ResumeAvatar },
  emits: ['setResume', 'removeResume', 'removeComponent'],
  props: {
    resume: {
      type: Array,
      default: []
    },
    isSaved: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    remove(data) {
      this.resume.length === 1
        ? this.$emit('removeResume')
        : this.$emit('removeComponent', data);
    }
  }
}
</script>
<style>
  .bottom {
    margin-top: 100px;
  }
  .bottom small {
    display: block;
    border-radius: 4px;
    padding: 15px;
    margin: 10px 0;
    background-color: lightpink;
    color: darkred;
    font-weight: bold;
  }
</style>