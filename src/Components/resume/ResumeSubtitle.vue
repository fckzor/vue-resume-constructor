<template>
  <div class="component-container">
    <h2>{{ $attrs.content }}</h2>
    <slot/>
    <slot name="close"/>
  </div>
</template>