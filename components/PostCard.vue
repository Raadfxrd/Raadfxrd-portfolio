<template>
  <div
      class="flex flex-col bg-background-light p-4 rounded-lg transition-all duration-300 group-hover:bg-background-light-2/90">
      <span class="text-xs text-text-secondary pl-2 border-l-2 border-light mb-4">
        {{ date }}
      </span>
    <h3 class="text-xs md:text-sm font-medium mb-2">{{ title }}</h3>
    <p class="text-xs text-text-secondary mb-3">{{ description }}</p>
    <div class="flex justify-end items-center">
      <p class="text-xs text-text-primary group-hover:translate-x-0.5 transition-transform">
        Read More →
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  description: string;
  date: string;
  slug: string;
}>();
</script>