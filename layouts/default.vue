<template>
  <div class="min-h-screen flex flex-col bg-primary-dark text-primary-light">
    <Navbar/>
    <main class="flex-1 container mx-auto p-6">
      <slot/>
    </main>
    <Footer/>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>
