<template>

  <div class="container">
    <AppAlert
      :alert="alert"
      @close="alert = null"
    />
  </div>

  <div class="container column">
    <form class="card card-w30" @keydown.ctrl.enter="addComponent" @submit.prevent="addComponent">
      <div class="form-control">
        <label for="type">Тип блока</label>
        <select id="type" v-model.trim="type">
          <option value="title">Заголовок</option>
          <option value="subtitle">Подзаголовок</option>
          <option value="avatar">Аватар</option>
          <option value="text">Текст</option>
        </select>
      </div>
      <div class="form-control">
        <label for="value">Значение</label>
        <textarea id="value" rows="3" v-model.trim="content"></textarea>
      </div>
      <AppButton :disabled="content.length < 3">Добавить</AppButton>
    </form>

    <AppLoader v-if="loader"/>

    <div class="card card-w70" v-else>
      <div v-if="resume.length">
        <component
          v-for="(item, idx) in resume"
          :is="item.component"
          :key="item"
          v-bind="item"
        >
          <template #close>
            <span class="close-btn" @click="removeComponent(idx)">&#10006;</span>
          </template>
        </component>
        
        <div class="bottom">
          <hr>
          <AppButton @click="setResume">Сохранить резюме &#10003;</AppButton>
          <AppButton type="warning" @click="removeResume">Удалить резюме &#10006;</AppButton>
          <div v-if="!isSaved">
            <small>Сохраните данные перед тем как покинуть старницу!</small>
          </div>
        </div>
      </div>

      <h3 v-else>Добавьте первый блок, чтобы увидеть результат</h3>
    </div>
  </div>

  <AppComments/>
</template>

<script>

import AppTitle from './Components/AppTitle.vue';
import AppSubtitle from './Components/AppSubtitle.vue';
import AppAvatar from './Components/AppAvatar.vue';
import AppText from './Components/AppText.vue';
import AppComments from './Components/AppComments.vue';
import AppButton from './Components/AppButton.vue';
import AppLoader from './Components/AppLoader.vue';
import AppAlert from './Components/AppAlert.vue';
import axios from 'axios';

export default {
  components: {
    AppTitle, AppSubtitle, AppAvatar, AppText, AppComments, AppButton, AppLoader, AppAlert
  },
  data() {
    return {
      type: 'title',
      content: '',
      resume: [],
      isSaved: true,
      databaseUrl: 'https://vue-course-work-resume-default-rtdb.firebaseio.com/resume.json',
      alert: null,
      loader: false,
      loaderTime: 1000,
      messages: {
        error: {
          type: 'danger',
          title: 'Ошибка!',
          text: 'Произошла ошибка. Попробуйте повторить попытку позже!'
        },
        successSave: {
          type: 'primary',
          title: 'Успех!',
          text: 'Резюме успешно сохранено в базу!'
        },
        successRemove: {
          type: 'warning', 
          title: 'Резюме удалено!', 
          text: 'Резюме успешно удалено из базы!'
        }
      }
    }
  },
  mounted() {
    this.getResume();
  },
  computed: {
    componentName() {
      return 'App' + this.upperFirstLetter(this.type);
    }
  },
  methods: {
    setResume() {
      this.loader = true;
      setTimeout(async () => {
        // Я хочу, чтобы в базе всегда было только одно резюме, 
        // поэтому перед сохранением нового, удаляю то, что там уже есть
        await axios.delete(this.databaseUrl);

        await axios.post(this.databaseUrl, {
          ...this.resume
        })
          .then((response) => {
            if (response.status === 200) {
              this.requestStatus(this.messages.successSave);
              this.isSaved = true;
            }
            this.loader = false;
          })
          .catch(() => this.requestStatus());
      }, this.loaderTime);
    },
    getResume() {
      this.loader = true;
      setTimeout(async () => {
        await axios.get(this.databaseUrl)
          .then(response => {
            if (response.status === 200 && response.data) {
              for(let key in response.data) {
                response.data[key].map(item => this.resume.push(item));
              }
            }
            this.loader = false;
          })
          .catch(() => this.requestStatus());
      }, this.loaderTime);
    },
    removeResume() {
      this.loader = true;
      setTimeout(async () => {
        await axios.delete(this.databaseUrl)
          .then((res) => {
            console.log(res);
            this.resume = [];
            this.requestStatus(this.messages.successRemove);
          })
          .catch(() => this.requestStatus());
      }, this.loaderTime);
    },
    addComponent() {
      if (this.content) {
        this.resume.push({
          component: this.componentName,
          content: this.content
        });
        this.type = 'title';
        this.content = '';
        this.isSaved = false;
      }
    },
    removeComponent(idx) {
      this.resume.splice(idx, 1);
      this.isSaved = false;
    },
    upperFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    Alert(options) {
      this.alert = options;
    },
    requestStatus(alert) {
      this.loader = false;
      this.Alert(alert ? alert : this.messages.error);
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
  .bottom {
    margin-top: 100px;
  }
  .avatar {
    display: flex;
    justify-content: flex-start;
  }
  .avatar img {
    max-width: 500px;
    height: auto;
  }
</style>