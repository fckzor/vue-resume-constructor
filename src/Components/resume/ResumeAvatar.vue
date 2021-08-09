<template>
  <div class="component-container avatar">
    <img :src="$attrs.content" alt="avatar">
    <slot/>
    <slot name="close"/>
  </div>
</template>
<style>
  .avatar {
    display: flex;
    justify-content: flex-start;
  }
  .avatar img {
    max-width: 500px;
    height: auto;
  }
</style>