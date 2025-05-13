<template>
  <div
    ref="el"
    :class="[
      'transition-all duration-1000 ease-out opacity-0 translate-y-6',
      visible && 'opacity-100 translate-y-0',
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const el = ref<HTMLElement | null>(null);
const visible = ref(false);

useIntersectionObserver(el, ([{ isIntersecting }]) => {
  if (isIntersecting) visible.value = true;
});
</script>
