<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container mx-auto">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/symbols">Symbols</RouterLink>
      </nav>
  </div>
  <div class="container mx-auto">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
