<script lang="ts" setup>
import { ref } from "vue";
import { gsap } from "gsap";

interface Props {
  mainImage: string;
  satelliteImages: string[];
  alt?: string;
}

const props = defineProps<Props>();
const containerRef = ref<HTMLElement | null>(null);
const isHovered = ref(false);

const handleMouseEnter = () => {
  isHovered.value = true;
  const container = containerRef.value;
  if (!container) return;

  gsap.to(container.querySelector(".main-image"), {
    scale: 0.95,
    duration: 0.5,
    ease: "power2.out",
  });

  props.satelliteImages.forEach((_, index) => {
    const angle = (index * 360) / props.satelliteImages.length;
    const radius = 150;

    gsap.to(container.querySelectorAll(".satellite-image")[index], {
      opacity: 1,
      scale: 1,
      x: Math.cos((angle * Math.PI) / 180) * radius,
      y: Math.sin((angle * Math.PI) / 180) * radius,
      duration: 0.6,
      delay: index * 0.1,
      ease: "power3.out",
    });
  });
};

const handleMouseLeave = () => {
  isHovered.value = false;
  const container = containerRef.value;
  if (!container) return;

  gsap.to(container.querySelector(".main-image"), {
    scale: 1,
    duration: 0.5,
    ease: "power2.inOut",
  });

  container.querySelectorAll(".satellite-image").forEach((element) => {
    gsap.to(element, {
      opacity: 0,
      scale: 0.5,
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.in",
    });
  });
};
</script>

<template>
  <div
    ref="containerRef"
    class="grid h-[280px] w-[280px] place-items-center md:h-[400px] md:w-[400px]"
  >
    <div class="grid grid-cols-1 grid-rows-1 place-items-center">
      <!-- Main center image -->
      <img
        :alt="alt ?? 'Main image'"
        :src="mainImage"
        class="main-image border-border-dark col-start-1 row-start-1 h-[180px] w-[180px] rounded-full border-2 object-cover shadow-lg transition-shadow duration-300 hover:cursor-pointer hover:shadow-xl md:h-[280px] md:w-[280px]"
        style="object-position: center top"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      />

      <!-- Satellite images -->
      <template v-for="(image, index) in satelliteImages" :key="index">
        <img
          :alt="`Satellite image ${index + 1}`"
          :src="image"
          class="satellite-image border-border-dark col-start-1 row-start-1 h-[100px] w-[100px] scale-50 rounded-full border-1 object-cover opacity-0 shadow-md md:h-[150px] md:w-[150px]"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.satellite-image {
  transform-origin: center center;
  will-change: transform, opacity;
  object-position: center top;
}

.main-image {
  z-index: 2;
}

.satellite-image {
  z-index: 1;
}
</style>
