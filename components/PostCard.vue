<template>
  <div class="group rounded-lg bg-transparent transition-all duration-300">
    <div
        class="bg-background-light p-4 rounded-lg transition-all duration-300 group-hover:bg-background-light-2/90 group-hover:cursor-pointer">
      <h3 class="text-xs md:text-sm font-medium mb-2">{{ title }}</h3>
      <p class="text-xs text-text-secondary mb-3">{{ description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-xs text-text-secondary">{{ date }}</span>
        <p class="text-xs text-text-primary group-hover:translate-x-0.5 transition-transform">
          Read More →
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  description: string;
  date: string;
}>();
</script>