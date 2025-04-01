<template>
  <div class="min-h-screen flex flex-col bg-[#132534] text-white">
    <Header/>
    <Navbar/>
    <main class="flex-1 container mx-auto p-6">
      <slot/>
    </main>
    <Footer/>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>
