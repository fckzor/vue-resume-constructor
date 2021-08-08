<template>
  <form
    class="card card-w30"
    @keydown.ctrl.enter="add"
    @submit.prevent="add"
  >
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
    <app-button :disabled="isValid">Добавить</app-button>
  </form>
</template>

<script>

export default {
  emits: ['addComponent'],
  data() {
    return {
      type: 'title',
      content: ''
    }
  },
  computed: {
    componentName() {
      return 'Resume' + this.upperFirstLetter(this.type);
    },
    componentData() {
      const content = this.content,
        componentName = this.componentName;
      return { content, componentName }
    },
    isValid() {
      return this.content.length < 3
    }
  },
  methods: {
    add() {
      this.$emit('addComponent', this.componentData);
      this.type = 'title';
      this.content = '';
    },
    upperFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
  }
}
</script>
