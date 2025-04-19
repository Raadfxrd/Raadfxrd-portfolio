<template>
  <div class="w-4/5 overflow-hidden rounded-lg my-8 py-6 relative shadow-xl">
    <div class="flex w-max animate-scroll">
      <div class="flex gap-12 px-6 items-center" v-for="tech in techStack" :key="tech.title">
        <i :class="tech.class" :title="tech.title"
           class="text-4xl text-primary-light transition-transform duration-300 ease-in-out hover:scale-125 hover:brightness-125"></i>
      </div>
      <div class="flex gap-12 px-6 items-center" v-for="tech in techStack" :key="tech.title + '-duplicate'">
        <i :class="tech.class" :title="tech.title"
           class="text-4xl text-primary-light transition-transform duration-300 ease-in-out hover:scale-125 hover:brightness-125"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTechStack} from '@/composables/techStack'

// Get the tech stack data
const {techStack} = useTechStack()
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 60s linear infinite;
}
</style>