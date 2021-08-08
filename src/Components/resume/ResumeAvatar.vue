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
<!-- https://cdn.dribbble.com/users/5592443/screenshots/14279501/drbl_pop_r_m_rick_4x.png -->