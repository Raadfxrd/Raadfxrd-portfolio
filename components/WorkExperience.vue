<template>
  <div class="bg-background-light border-border-light rounded-lg border p-4">
    <h2 class="mb-4 text-sm font-bold">Work</h2>
    <div class="space-y-4">
      <div
        v-for="experience in experiences"
        :key="experience.title"
        class="group hover:bg-background-light-2/90 flex items-start gap-3 rounded-lg p-2"
      >
        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center">
          <img
            :alt="experience.company"
            :src="experience.icon"
            class="border-border-light h-full w-fit rounded-full border bg-white object-contain p-1"
          />
        </div>
        <div class="flex-grow group-hover:cursor-default">
          <h3 class="w-fit text-xs font-medium md:text-sm">
            {{ experience.title }}
          </h3>
          <div class="flex items-baseline justify-between">
            <p class="text-text-secondary mt-0.5 text-xs">
              {{ experience.company }}
            </p>

            <span class="text-text-secondary text-end text-xs">{{
              experience.period
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <a
      class="group bg-button-primary text-text-secondary hover:bg-background-light-2 relative mt-4 inline-flex w-full items-center justify-around gap-2 overflow-hidden rounded-md px-4 py-2 text-xs font-medium shadow-sm duration-300"
      download="Borys_CV.pdf"
      href="/assets/borys-cv.pdf"
    >
      <span class="relative z-10 flex items-center gap-2">
        <svg
          class="h-3.5 w-3.5"
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
        class="bg-background-light group-hover:animate-shine absolute top-0 left-0 h-full w-full"
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
