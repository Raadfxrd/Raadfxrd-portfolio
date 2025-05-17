<template>
  <div class="relative my-8 w-4/5 overflow-hidden rounded-lg py-6 shadow-md">
    <div class="animate-scroll flex w-max">
      <div
        v-for="tech in techStack"
        :key="tech.title"
        class="flex items-center gap-12 px-6"
      >
        <i
          :class="tech.class"
          :title="tech.title"
          class="text-text-primary hover:text-text-secondary text-4xl transition-transform duration-300 ease-in-out hover:scale-125"
        ></i>
      </div>
      <div
        v-for="tech in techStack"
        :key="tech.title + '-duplicate'"
        class="flex items-center gap-12 px-6"
      >
        <i
          :class="tech.class"
          :title="tech.title"
          class="text-text-primary hover:text-text-secondary text-4xl transition-transform duration-300 ease-in-out hover:scale-125"
        ></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTechStack } from "@/composables/techStack";

const { techStack } = useTechStack();
</script>
