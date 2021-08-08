<template>
  <div class="component-container">
    <h1>
      {{ $attrs.content }}
      <slot/>
    </h1>
    <slot name="close"/>
  </div>
</template>