<template>
  <div class="bg-background-light border-border-light rounded-lg border p-3 md:p-4">
    <h2 class="mb-3 md:mb-4 text-xs md:text-sm font-bold">Education</h2>
    <div class="space-y-3 md:space-y-4">
      <div
          v-for="education in educations"
          :key="education.degree"
          class="group hover:bg-background-light-2/90 flex items-start gap-2 md:gap-3 rounded-lg p-1.5 md:p-2"
      >
        <div class="flex h-8 w-8 md:h-10 md:w-10 flex-shrink-0 items-center justify-center">
          <img
              :alt="education.school"
              :src="education.icon"
              class="border-border-light h-full w-fit rounded-full border bg-white object-contain p-1"
          />
        </div>
        <div class="flex-grow group-hover:cursor-default">
          <h3 class="w-fit text-xs md:text-sm font-medium">
            {{ education.degree }}
          </h3>
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-0">
            <p class="text-text-secondary mt-0.5 max-w-5/10 text-xs">
              {{ education.school }}
            </p>

            <span class="text-text-secondary text-xs">{{
                education.period
              }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  educations: Array<{
    degree: string;
    school: string;
    period: string;
    icon: string;
  }>;
}>();
</script>

