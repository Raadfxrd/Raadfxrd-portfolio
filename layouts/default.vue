<template>
  <div
    :class="[
      'bg-background-light-2 dark:bg-background-dark-2 relative flex min-h-screen w-full items-start justify-center overflow-hidden',
      { 'h-full w-full': isInterestsPage },
    ]"
  >
    <div
      class="bg-background-light dark:bg-background-dark border-x-border-dark relative z-0 min-h-screen w-2/3 border-x border-solid"
    >
      <div
        class="no-scrollbar sticky top-0 z-10 h-screen overflow-y-auto"
        @mousemove="updateCursor"
      >
        <Navbar />
        <main class="flex-1">
          <slot />
        </main>
        <Footer />
      </div>
      <div ref="cursor" :class="['cursor', cursorType]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
const isInterestsPage = route.name === "Interests";
const cursor = ref<HTMLElement | null>(null);
const cursorType = ref<"default" | "hover" | "text">("default");

let mouseX = 0;
let mouseY = 0;

const updateCursor = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursor.value) {
    cursor.value.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  }

  if (target.closest("a, button, [role='button'], .cursor-hover")) {
    cursorType.value = "hover";
  } else if (
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
    getComputedStyle(target).cursor === "text" ||
    target.closest(
      "h1, h2, h3, h4, h5, h6, p, span, div[contenteditable='true'], pre, code, article",
    ) ||
    target.matches(
      "h1, h2, h3, h4, h5, h6, p, span, div[contenteditable='true'], pre, code, article",
    )
  ) {
    cursorType.value = "text";
  } else {
    cursorType.value = "default";
  }
};

onMounted(() => {
  document.body.style.cursor = "none";
  window.addEventListener("mousemove", updateCursor);
});

onUnmounted(() => {
  document.body.style.cursor = "auto";
  window.removeEventListener("mousemove", updateCursor);
});
</script>

<style>
* {
  cursor: none !important;
}

.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition:
    width 0.15s ease,
    height 0.15s ease;
}

//eslint-disable-next-line no-unused-vars
.cursor.hover {
  width: 25px;
  height: 25px;
}

//eslint-disable-next-line no-unused-vars
.cursor.text {
  width: 2px;
  height: 24px;
  border-radius: 0;
}
</style>
