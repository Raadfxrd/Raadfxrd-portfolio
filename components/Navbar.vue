<template>
  <nav
      v-if="showContent"
      class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-navbarFadeIn"
  >
    <div
        class="flex items-center gap-10 px-8 py-3 rounded-full
             bg-white/10 border border-white/20 backdrop-blur-lg shadow-xl
             text-white/90 transition duration-300 hover:shadow-2xl"
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