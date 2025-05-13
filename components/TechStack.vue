<template>
  <div class="w-4/5 overflow-hidden rounded-lg my-8 py-6 relative shadow-md">
    <div class="flex w-max animate-scroll">
      <div
        v-for="tech in techStack"
        :key="tech.title"
        class="flex gap-12 px-6 items-center"
      >
        <i
          :class="tech.class"
          :title="tech.title"
          class="text-4xl text-text-primary transition-transform duration-300 ease-in-out hover:scale-125 hover:text-text-secondary"
        ></i>
      </div>
      <div
        v-for="tech in techStack"
        :key="tech.title + '-duplicate'"
        class="flex gap-12 px-6 items-center"
      >
        <i
          :class="tech.class"
          :title="tech.title"
          class="text-4xl text-text-primary transition-transform duration-300 ease-in-out hover:scale-125 hover:text-text-secondary"
        ></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTechStack } from "@/composables/techStack";

const { techStack } = useTechStack();
</script>
