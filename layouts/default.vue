<template>
  <div class="relative w-full min-h-screen bg-background-dark flex justify-center items-start overflow-hidden">
    <!-- The vertical band that overflows viewport visually -->
    <div
        class="w-2/3 h-[300vh] bg-background-light rounded-md mt-[-100vh] mb-[-100vh] z-0 relative border-solid border-x border-x-border-dark"
    >

      <!-- Actual scrollable content area -->
      <div class=" sticky top-0 h-screen overflow-y-auto no-scrollbar z-10
    ">
        <Navbar/>
        <main>
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