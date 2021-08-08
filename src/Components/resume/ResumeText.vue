<template>
  <div class="component-container">
    <p>{{ $attrs.content }}</p>
    <slot/>
    <slot name="close"/>
  </div>
</template>