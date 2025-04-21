<template>
  <div class="relative w-full min-h-screen bg-secondary-dark flex justify-center items-start">
    <!-- The vertical band that overflows viewport visually -->
    <div
        class="w-2/3 h-[300vh] bg-primary-dark rounded-md mt-[-100vh] mb-[-100vh] z-0 relative"
    >

      <!-- Actual scrollable content area -->
      <div class="sticky top-0 h-screen overflow-y-auto no-scrollbar px-4 py-8 z-10">
        <Navbar/>
        <main class="pt-8 pb-16">
          <slot/>
        </main>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
<script setup lang="ts">
</script>