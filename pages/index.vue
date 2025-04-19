<template>
  <section class="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#132534]">

    <!-- INTRO OVERLAY -->
    <div v-if="showIntro" class="fixed inset-0 z-50 bg-[#1d3351] flex items-center justify-center animate-introFadeOut">
      <h1 class="text-4xl md:text-5xl font-bold text-white animate-scaleIn">Raadfxrd</h1>
    </div>

    <!-- MAIN CONTENT -->
    <div
        v-if="showContent"
        class="container mx-auto flex flex-col md:flex-row items-center justify-around mb-8 animate-contentEnter"
    >
      <!-- Text Section -->
      <div class="text-center md:text-left mb-8 md:mb-0">
        <!-- Greeting -->
        <h1 class="text-5xl font-bold mb-4 leading-tight flex flex-wrap gap-2">
  <span
      v-for="(word, wi) in greeting.split(' ')"
      :key="wi"
      class="inline-flex"
  >
    <span
        v-for="(letter, li) in word.split('')"
        :key="li"
        :style="{ animationDelay: `${(wi * 600) + (li * 50)}ms` }"
        class="inline-block opacity-0 animate-letterReveal"
    >
      {{ letter }}
    </span>
    <!-- Add a space between words -->
    <span class="w-2"></span>
  </span>
        </h1>

        <h1 class="text-5xl font-bold mb-4 animate-textReveal delay-150">I'm Borys!</h1>

        <!-- Rotating Title -->
        <h3
            class="text-lg text-secondary-light mb-2 transition-transform duration-500"
            :class="{ 'animate-fadeOut': isFadingOut, 'animate-fadeIn': !isFadingOut }"
        >
          {{ currentTitle }}
        </h3>

        <h3 class="mb-6 text-white/70 animate-textReveal">Innovating for our success.</h3>

        <!-- Button -->
        <button
            class="relative px-6 py-3 bg-[#faa2a2] text-white font-bold rounded-lg hover:bg-[#e89090] transition shadow-lg group overflow-hidden"
        >
          <span class="z-10 relative">View My Work</span>
          <span class="absolute left-0 top-0 w-full h-full bg-white/10 group-hover:animate-shine"></span>
        </button>
      </div>

      <!-- Portrait -->
      <img
          class="w-[250px] h-[250px] rounded-full border-4 border-[#faa2a2] object-cover transition-transform duration-300 hover:scale-110 hover:rotate-3 animate-rotateIn"
          src="/img/raadfxrd.jpeg"
          alt="Portrait of Borys"
          style="object-position: center top;"
      />
    </div>

    <!-- TechStack -->
    <TechStack v-if="showContent"/>

    <!-- Scroll Indicator -->
    <div v-if="showContent" class="absolute bottom-6 text-white/60 animate-bounce text-2xl">▼</div>
  </section>
</template>

<script setup lang="ts">
const {greeting} = useGreeting();
const {currentTitle, isFadingOut, startTitleRotation} = useRotatingTitles();

const showIntro = ref(true);
const showContent = ref(false);

onMounted(() => {
  startTitleRotation();

  // End intro after fade
  setTimeout(() => {
    showIntro.value = false;

    // Delay showing content a bit after intro fade ends
    setTimeout(() => {
      showContent.value = true;
    }, 300);
  }, 2000); // Intro duration
});
</script>