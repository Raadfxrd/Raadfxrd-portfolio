<template>
  <div class="bg-background-light border border-border-light p-4 rounded-lg">
    <h2 class="text-sm font-bold mb-4">Work</h2>
    <div class="space-y-4">
      <div
        v-for="experience in experiences"
        :key="experience.title"
        class="flex gap-3 items-start group hover:bg-background-light-2/90 p-2 rounded-lg"
      >
        <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center">
          <img
            :alt="experience.company"
            :src="experience.icon"
            class="w-fit h-full p-1 object-contain rounded-full border border-border-light bg-white"
          />
        </div>
        <div class="flex-grow group-hover:cursor-default">
          <h3 class="w-fit text-xs md:text-sm font-medium">
            {{ experience.title }}
          </h3>
          <div class="flex items-baseline justify-between">
            <p class="text-xs text-text-secondary mt-0.5">
              {{ experience.company }}
            </p>
            
            <span class="text-xs text-text-secondary text-end">{{
              experience.period
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <a
      href="/assets/borys-cv.pdf"
      download="Borys_CV.pdf"
      class="w-full group relative inline-flex justify-around items-center gap-2 px-4 py-2 text-xs bg-button-primary text-text-secondary font-medium rounded-md hover:bg-background-light-2 duration-300 shadow-sm overflow-hidden mt-4"
    >
      <span class="z-10 relative flex items-center gap-2">
        <svg
          class="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
        Download CV
      </span>
      <span
        class="absolute left-0 top-0 w-full h-full bg-background-light group-hover:animate-shine"
      ></span>
    </a>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  experiences: Array<{
    title: string;
    company: string;
    period: string;
    icon: string;
  }>;
}>();
</script>
