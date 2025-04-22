<template>
  <div class="w-4/5 overflow-hidden rounded-lg my-8 py-6 relative shadow-xl">
    <div class="flex w-max animate-scroll">
      <div class="flex gap-12 px-6 items-center" v-for="tech in techStack" :key="tech.title">
        <i :class="tech.class" :title="tech.title"
           class="text-4xl text-text-primary transition-transform duration-300 ease-in-out hover:scale-125 hover:text-text-secondary"></i>
      </div>
      <div class="flex gap-12 px-6 items-center" v-for="tech in techStack" :key="tech.title + '-duplicate'">
        <i :class="tech.class" :title="tech.title"
           class="text-4xl text-text-primary transition-transform duration-300 ease-in-out hover:scale-125 hover:text-text-secondary"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTechStack} from '@/composables/techStack'

// Get the tech stack data
const {techStack} = useTechStack()
</script>