<template>
  <div class="relative w-full overflow-hidden">
    <section class="min-h-screen w-full flex flex-col items-center justify-center">
      <!-- Your Intro Overlay -->
      <div
          v-if="showIntro"
          class="fixed inset-0 z-50 bg-primary-dark flex items-center justify-center animate-introFadeOut"
      >
        <h1 class="text-4xl md:text-5xl font-bold text-white animate-scaleIn">Borys</h1>
      </div>

      <!-- The rest of your content -->
      <div
          v-if="showContent"
          class="w-full flex flex-col md:flex-row items-center justify-around mb-8 animate-contentEnter"
      >
        <!-- Portrait -->
        <img
            class="w-[300px] h-[300px] rounded-full border-4 border-[#faa2a2] object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-1"
            src="public/img/raadfxrd.jpeg"
            alt="Portrait of Borys"
            style="object-position: center top; transform-origin: center;"
        />

        <!-- Text Section -->
        <div class="text-center md:text-left mb-8 md:mb-0">
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

          <h3 class="mb-6 text-primary-light animate-textReveal">Innovating for our success.</h3>

          <!-- Button -->
          <button
              class="relative px-6 py-3 bg-primary-light text-white font-bold rounded-lg hover:bg-[#e89090] transition shadow-lg group overflow-hidden"
          >
            <span class="z-10 relative">View My Work</span>
            <span class="absolute left-0 top-0 w-full h-full bg-white/10 group-hover:animate-shine"></span>
          </button>
        </div>
      </div>

      <TechStack v-if="showContent"/>
      <Navbar :showContent="showContent"/>
    </section>
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import TechStack from "~/components/TechStack.vue";

const {greeting} = useGreeting();
const {currentTitle, isFadingOut, startTitleRotation} = useRotatingTitles();

const showIntro = ref(true);
const showContent = ref(false);

onMounted(() => {
  startTitleRotation();

  setTimeout(() => {
    showIntro.value = false;

    setTimeout(() => {
      showContent.value = true;
    }, 300);
  }, 2000);
});
</script>