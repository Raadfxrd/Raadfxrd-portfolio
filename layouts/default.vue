<template>
  <div
    class="relative w-full min-h-screen bg-background-light-2 dark:bg-background-dark-2 flex justify-center items-start overflow-hidden"
  >
    <div
      class="w-2/3 h-[300vh] bg-background-light dark:bg-background-dark rounded-md mt-[-100vh] mb-[-100vh] z-0 relative border-solid border-x border-x-border-dark"
    >
      <div
        class="sticky top-0 h-screen overflow-y-auto no-scrollbar z-10"
        @mousemove="updateCursor"
      >
        <div ref="cursor" :class="['cursor', cursorType]" />

        <Navbar />
        <main
          :class="{
            'min-h-screen': !isInterestsPage,
            'h-auto': isInterestsPage,
          }"
        >
          <slot />
        </main>
        <Footer />
      </div>
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
  width: 6px;
  height: 6px;
  background-color: var(--color-text-primary, white);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition:
    width 0.15s ease,
    height 0.15s ease;
}

.cursor.hover {
  width: 20px;
  height: 20px;
}

.cursor.text {
  width: 2px;
  height: 24px;
  border-radius: 0;
}
</style>
