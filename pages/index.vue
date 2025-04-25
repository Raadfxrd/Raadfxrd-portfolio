<template>
  <div class="relative w-full overflow-hidden">
    <section class="min-h-screen w-full flex flex-col items-center justify-center">
      <!-- Your Intro Overlay -->
      <div v-if="showIntro"
           class="fixed inset-0 z-50 bg-background-light dark:bg-background-dark flex items-center justify-center animate-introFadeOut">
        <h1 class="text-base md:text-4xl font-bold text-text-primary dark:text-text-light animate-scaleIn">Borys</h1>
      </div>

      <section v-if="showContent"
               class="h-screen w-full flex flex-col items-center justify-center animate-contentEnter">
        <div class="w-full flex flex-col md:flex-row items-center justify-center gap-12 px-8">
          <!-- Portrait -->
          <img alt="Portrait of Borys"
               class="w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full border-4 border-border-dark object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-1"
               src="public/img/raadfxrd.jpeg"
               style="object-position: center top; transform-origin: center;"/>

          <!-- Text Section -->
          <div class="text-center md:text-left">
            <h1 class="text-base md:text-4xl font-bold mb-3 flex flex-wrap gap-2">
              <span v-for="(word, wi) in greeting.split(' ')" :key="wi" class="inline-flex">
                <span v-for="(letter, li) in word.split('')" :key="li"
                      :style="{ animationDelay: `${(wi * 600) + (li * 50)}ms` }"
                      class="inline-block opacity-0 animate-letterReveal">
                  {{ letter }}
                </span>
                <span class="w-2"></span>
              </span>
            </h1>

            <h1 class="text-base md:text-4xl font-bold mb-3 animate-textReveal delay-150">I'm Borys!</h1>

            <!-- Rotating Title -->
            <h3 :class="{ 'animate-fadeOut': isFadingOut, 'animate-fadeIn': !isFadingOut }"
                class="text-xs md:text-sm text-text-secondary mb-2 transition-transform duration-500">
              {{ currentTitle }}
            </h3>

            <h3 class="text-xs md:text-sm mb-4 text-text-primary animate-textReveal">Innovating for success.</h3>

            <!-- Button -->
            <button
                class="relative px-4 py-2 text-xs md:text-sm bg-button-primary text-black dark:text-white font-bold rounded-lg hover:bg-text-secondary transition shadow-lg group overflow-hidden">
              <span class="z-10 relative">View My Work</span>
              <span class="absolute left-0 top-0 w-full h-full bg-background-light group-hover:animate-shine"></span>
            </button>
          </div>
        </div>
        <TechStack v-if="showContent"/>
      </section>

      <div v-if="showContent" class="w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-6 animate-contentEnter">
        <!-- Recent Posts Section -->
        <section class="w-full p-4 border-r border-border-dark">
          <h2 class="text-sm md:text-base font-bold mb-4">Recent Posts</h2>
          <div class="space-y-4">
            <!-- Post Card Template -->
            <div
                class="bg-background-light dark:bg-background-dark p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 class="text-xs md:text-sm font-semibold mb-2">Post Title</h3>
              <p class="text-xs text-text-secondary mb-2">Short description of the post...</p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-text-secondary">Date</span>
                <button class="text-xs text-button-primary hover:text-text-secondary transition-colors">Read More →
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact & Experience Section -->
        <section class="w-full p-4">
          <!-- Contact Form -->
          <div class="mb-8">
            <h2 class="text-sm md:text-base font-bold mb-4">Get in Touch</h2>
            <form class="space-y-3">
              <div>
                <input id="email" type="email"
                       class="w-full text-xs p-2 rounded-md bg-background-light dark:bg-background-dark border border-border-dark focus:ring-2 focus:ring-button-primary">
              </div>
              <button type="submit"
                      class="w-full text-xs bg-button-primary text-white py-2 rounded-md hover:bg-text-secondary transition-colors">
                Send Message
              </button>
            </form>
          </div>

          <!-- Past Experiences -->
          <div>
            <h2 class="text-sm md:text-base font-bold mb-4">Past Experiences</h2>
            <div class="space-y-4">
              <!-- Single Experience Item -->
              <div class="flex gap-3 items-start group">
                <div class="w-1.5 h-1.5 mt-1.5 rounded-full bg-button-primary flex-shrink-0"></div>
                <div class="flex-grow">
                  <div class="flex items-baseline justify-between">
                    <h3 class="text-xs md:text-sm font-medium">Software Engineer</h3>
                    <span class="text-xs text-text-secondary">2023 - Present</span>
                  </div>
                  <p class="text-xs text-text-secondary">Company Name</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import TechStack from "~/components/TechStack.vue";
import {useIntroSequence} from '~/composables/useIntroSequence';
import {useRotatingTitles} from '~/composables/useRotatingTitles';

const {greeting} = useGreeting();

const {currentTitle, isFadingOut} = useRotatingTitles();
const {showIntro, showContent} = useIntroSequence();
</script>