<template>
  <section class="greeting flex flex-col items-center justify-center min-h-screen bg-[#132534] text-white">
    <h1 class="text-4xl font-bold mb-4">Hey, I'm Borys!</h1>
    <p class="text-lg mb-8">I'm a passionate frontend developer.</p>
    <img class="w-40 h-40 rounded-full border-4 border-[#faa2a2] object-cover mb-8"
         src="/public/img/raadfxrd.jpeg" alt="Borys"/>
    <TechStack></TechStack>
  </section>
</template>

<script setup lang="ts">
import TechStack from '@/components/TechStack.vue'
</script>