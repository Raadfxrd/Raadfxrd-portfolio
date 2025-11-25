<template>
  <div
      ref="el"
      :class="[
      'translate-y-6 opacity-0 transition-all duration-1000 ease-out',
      visible && 'translate-y-0 opacity-100',
    ]"
  >
    <slot/>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useIntersectionObserver} from "@vueuse/core";

const el = ref<HTMLElement | null>(null);
const visible = ref(false);

useIntersectionObserver(el, ([{isIntersecting}]) => {
  if (isIntersecting) visible.value = true;
});
</script>
