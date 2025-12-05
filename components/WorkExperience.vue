<template>
  <div class="bg-background-light border-border-light rounded-lg border p-3 md:p-4">
    <h2 class="gradient mb-3 md:mb-4 text-xs md:text-sm font-bold w-fit">Work</h2>
    <div class="space-y-3 md:space-y-4">
      <div
          v-for="(experience, index) in experiences"
          :key="experience.title"
          class="group hover:bg-background-light-2/90 flex items-start gap-2 md:gap-3 rounded-lg p-1.5 md:p-2 cursor-pointer transition-all duration-200"
          @click="openModal(index)"
      >
        <div class="flex h-8 w-8 md:h-10 md:w-10 flex-shrink-0 items-center justify-center">
          <img
              :alt="experience.company"
              :src="experience.icon"
              class="border-border-light h-full w-fit rounded-full border bg-white object-contain p-1"
          />
        </div>
        <div class="flex-grow">
          <h3 class="w-fit text-xs md:text-sm font-medium">
            {{ experience.title }}
          </h3>
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-0">
            <p class="text-text-secondary mt-0.5 text-xs">
              {{ experience.company }}
            </p>

            <span class="text-text-secondary text-xs">{{
                experience.period
              }}</span>
          </div>
        </div>
      </div>
    </div>
    <a
        class="group bg-button-primary text-text-secondary hover:bg-background-light-2 relative mt-3 md:mt-4 inline-flex w-full items-center justify-around gap-2 overflow-hidden rounded-md px-3 md:px-4 py-2 text-xs font-medium shadow-sm duration-300"
        download="Borys_CV.pdf"
        href="/assets/borys-cv.pdf"
    >
      <span class="relative z-10 flex items-center gap-2">
        <DocumentArrowDownIcon class="h-3.5 w-3.5 md:h-4 md:w-4"/>
        Download CV
      </span>
      <span
          class="bg-background-light group-hover:animate-shine absolute top-0 left-0 h-full w-full"
      ></span>
    </a>

    <!-- Modal -->
    <DetailModal
        :is-open="openModalIndex !== null && currentExperience !== null"
        :icon="currentExperience?.icon || ''"
        :title="currentExperience?.title || ''"
        :meta-icon="BriefcaseIcon"
        :meta-text="currentExperience?.company || ''"
        :period="currentExperience?.period || ''"
        :description="currentExperience?.description"
        :details="currentExperience?.responsibilities"
        details-title="Key Responsibilities"
        @close="closeModal"
    />
  </div>
</template>

<script lang="ts" setup>
import {BriefcaseIcon, DocumentArrowDownIcon} from "@heroicons/vue/24/outline";
import {computed, ref} from "vue";

const props = defineProps<{
  experiences: Array<{
    title: string;
    company: string;
    period: string;
    icon: string;
    description?: string;
    responsibilities?: string[];
  }>;
}>();

const openModalIndex = ref<number | null>(null);

const currentExperience = computed(() => {
  if (openModalIndex.value !== null) {
    return props.experiences[openModalIndex.value];
  }
  return null;
});

const openModal = (index: number) => {
  openModalIndex.value = index;
};

const closeModal = () => {
  openModalIndex.value = null;
};
</script>

