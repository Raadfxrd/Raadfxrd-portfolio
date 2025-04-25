<template>
  <div class="relative flex items-center justify-center">
    <!-- Navbar -->
    <nav
        v-if="isNavbarVisible"
        :class="{'animate-navbarFadeIn': isAnimationComplete}"
        class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full flex justify-center"
    >
      <div class="flex justify-around w-2/3 items-center">
        <!-- Small Logo -->
        <img
            alt="Small Logo"
            class="w-10 h-10 rounded-full border-1 border-border-dark hover:cursor-pointer"
            src="public/img/raadfxrd.jpeg"
            @click="$router.push('/')"
        />

        <!-- Nav Links -->
        <div
            class="flex items-center gap-10 px-8 py-3 rounded-full
                 bg-background-light dark:bg-background-dark border-solid border-1 border-border-dark dark:border-border-light backdrop-blur-lg
                 text-light transition duration-300"
        >
          <NavLinks/>
        </div>

        <!-- Theme Toggle Button -->
        <button
            :aria-label="`Current theme: ${colorMode.preference}`"
            class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:ring-2 ring-blue-500 transition duration-300"
            @click="toggleTheme"
        >
          <component :is="icon" class="w-6 h-6 text-yellow-500 dark:text-gray-300"/>
          <span class="sr-only">Theme: {{ colorMode.preference }}</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import NavLinks from './NavLinks.vue';
import {useNavbarVisibility} from '~/composables/useNavbarVisibility';
import {ComputerDesktopIcon, MoonIcon, SunIcon} from '@heroicons/vue/24/outline';
import {useColorMode} from '#imports';
import {computed} from 'vue';

const {isNavbarVisible, isAnimationComplete} = useNavbarVisibility();
const colorMode = useColorMode();

// Default to 'system' if no preference is set
if (!colorMode.preference) {
  colorMode.preference = 'system';
}

// Cycle between 'light', 'dark', and 'system'
const toggleTheme = () => {
  if (colorMode.preference === 'light') colorMode.preference = 'dark';
  else colorMode.preference = 'light';
};

const icon = computed(() => {
  if (colorMode.preference === 'light') return SunIcon;
  if (colorMode.preference === 'dark') return MoonIcon;
  return ComputerDesktopIcon;
});
</script>