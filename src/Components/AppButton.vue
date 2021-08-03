<template>
  <button class="btn" :class="type">
    <slot/>
  </button>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  }
}
</script>