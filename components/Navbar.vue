<template>
  <nav
      v-if="showContent"
      class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-navbarFadeIn"
  >
    <div
        class="flex items-center gap-10 px-8 py-3 rounded-full
               bg-background-light border-solid border-1 border-border-dark backdrop-blur-lg
               text-light transition duration-300"
    >
      <NavLinks/>
    </div>
  </nav>
</template>

<script setup>
import NavLinks from './NavLinks.vue';

const props = defineProps({
  showContent: Boolean
});
</script>