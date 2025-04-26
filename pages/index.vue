<template>
  <div class="relative w-full overflow-hidden">
    <section class="min-h-screen w-full flex flex-col items-center justify-center">
      <!-- Intro Overlay -->
      <div v-if="showIntro"
           class="fixed inset-0 z-50 bg-background-light flex items-center justify-center animate-introFadeOut">
        <h1 class="text-lg md:text-2xl font-bold text-text-primary animate-scaleIn">Borys</h1>
      </div>

      <!-- Hero Section -->
      <section v-if="showContent"
               class="h-screen w-full flex flex-col items-center justify-center animate-contentEnter">
        <div class="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-12 px-4 md:px-6">
          <!-- Portrait -->
          <img alt="Portrait of Borys"
               class="w-[180px] h-[180px] md:w-[280px] md:h-[280px] rounded-full border-2 border-border-dark object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-1"
               src="public/img/raadfxrd.jpeg"
               style="object-position: center top; transform-origin: center;"/>

          <!-- Text Section -->
          <div class="text-center md:text-left max-w-lg">
            <h1 class="text-base md:text-3xl font-bold mb-2 flex flex-wrap gap-2">
              <span v-for="(word, wi) in greeting.split(' ')" :key="wi" class="inline-flex">
                <span v-for="(letter, li) in word.split('')" :key="li"
                      :style="{ animationDelay: `${(wi * 600) + (li * 50)}ms` }"
                      class="inline-block opacity-0 animate-letterReveal">
                  {{ letter }}
                </span>
                <span class="w-1.5"></span>
              </span>
            </h1>

            <h1 class="text-base md:text-3xl font-bold mb-3 animate-textReveal delay-150">I'm Borys!</h1>

            <h3 :class="{ 'animate-fadeOut': isFadingOut, 'animate-fadeIn': !isFadingOut }"
                class="text-xs md:text-sm text-text-secondary mb-2 transition-transform duration-500">
              {{ currentTitle }}
            </h3>

            <h3 class="text-xs md:text-lg mb-4 text-text-primary animate-textReveal">Innovating for success.</h3>

            <!-- Button -->
            <button
                class="relative px-4 py-2 text-xs bg-button-primary text-text-secondary font-medium rounded-md hover:bg-text-primary transition-all duration-300 shadow-sm group overflow-hidden">
              <span class="z-10 relative">View My Work</span>
              <span class="absolute left-0 top-0 w-full h-full bg-background-light group-hover:animate-shine"></span>
            </button>
          </div>
        </div>
        <TechStack v-if="showContent"/>
      </section>

      <!-- Content Section -->
      <div v-if="showContent" class="container mx-auto max-w-5xl mt-12 mb-12 px-4 md:px-6 animate-contentEnter">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Recent Posts Section -->
          <section class="w-full lg:w-3/5">
            <div class="space-y-4">
              <!-- Post Card Template -->
              <div class="group rounded-lg bg-transparent transition-all duration-300">
                <div
                    class="bg-background-light p-4 rounded-lg transition-all duration-300 group-hover:bg-background-light-2/90 group-hover:cursor-pointer">
                  <h3 class="text-xs md:text-sm font-medium mb-2">Post Title</h3>
                  <p class="text-xs text-text-secondary mb-3">Short description of the post...</p>
                  <div class="flex justify-between items-center">
                    <span class="text-xs text-text-secondary">Date</span>
                    <p class="text-xs text-text-primary group-hover:translate-x-0.5 transition-transform">
                      Read More →
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Sidebar Section -->
          <section class="w-full lg:w-2/5 space-y-4">
            <!-- Contact Form -->
            <div class="bg-background-light border border-border-light p-4 rounded-lg">
              <h2 class="text-sm font-bold mb-3">Stay up to date</h2>
              <p class="text-xs text-text-secondary leading-relaxed mb-4">
                Get notified when I post something, unsubscribe at any moment.
              </p>
              <form class="space-y-3">
                <div class="flex gap-2">
                  <input id="email"
                         class="flex-1 text-xs p-2 rounded-md bg-background-light border border-border-light focus:ring-1 focus:ring-button-primary"
                         placeholder="Enter your email"
                         type="email">
                  <button
                      class="whitespace-nowrap text-xs bg-button-primary text-text-secondary font-medium rounded-md hover:bg-text-primary px-3 py-2 transition-colors"
                      type="submit">
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            <!-- Past Experiences -->
            <div class="bg-background-light border border-border-light p-4 rounded-lg">
              <h2 class="text-sm font-bold mb-4">Work</h2>
              <div class="space-y-4">
                <div class="flex gap-3 items-start group hover:bg-background-light-2/90 p-2 rounded-lg">
                  <div class="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <img alt="Company Icon"
                         class="w-full h-full object-cover rounded-full border border-border-light"
                         src="public/img/raadfxrd.jpeg"/>
                  </div>
                  <div class="flex-grow">
                    <div class="flex items-baseline justify-between">
                      <h3 class="text-xs md:text-sm font-medium">Software Engineer</h3>
                      <span class="text-xs text-text-secondary">2023 - Present</span>
                    </div>
                    <p class="text-xs text-text-secondary mt-0.5">Company Name</p>
                  </div>
                </div>
              </div>
              <button
                  class="w-1/2 group relative inline-flex items-center gap-2 px-4 py-2 text-xs bg-button-primary text-text-secondary font-medium rounded-md hover:bg-text-primary duration-300 shadow-sm overflow-hidden">
                  <span class="z-10 relative flex items-center gap-2">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Download CV
                  </span>
                <span class="absolute left-0 top-0 w-full h-full bg-background-light group-hover:animate-shine"></span>
              </button>
            </div>
          </section>
        </div>
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