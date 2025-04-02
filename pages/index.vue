<template>
  <section class="flex flex-col items-center justify-center min-h-screen">
    <div class="container mx-auto flex items-center justify-around mb-8">
      <div>
        <h1 class="text-4xl font-bold mb-4">Hey, I'm Borys!</h1>
        <p class="text-lg mb-8">I'm a passionate frontend developer.</p>
      </div>
      <img class="w-100 h-100 rounded-full border-4 border-[#faa2a2] object-cover mb-8"
           src="/public/img/raadfxrd.jpeg" alt="Borys"
           style="object-position: center top;"/>
    </div>
    <TechStack></TechStack>
  </section>
</template>

<script setup lang="ts">
import TechStack from '@/components/TechStack.vue'
</script>