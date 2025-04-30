<template>
  <div class="relative w-full">
    <section
      class="min-h-screen w-full flex flex-col items-center justify-center"
    >
      <!-- Intro Overlay -->
      <div
        v-if="showIntro"
        class="fixed inset-0 z-50 bg-background-light flex items-center justify-center animate-introFadeOut"
      >
        <h1
          id="intro-title"
          class="text-lg md:text-2xl font-bold text-text-primary animate-scaleIn"
        >
          Borys
        </h1>
      </div>

      <!-- Hero Section -->
      <section
        v-if="showContent"
        class="h-screen w-full flex flex-col items-center justify-center animate-contentEnter"
      >
        <div
          class="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-12 px-4 md:px-6"
        >
          <!-- Portrait -->
          <ExplodingImage
            :main-image="'/img/raadfxrd.jpeg'"
            :satellite-images="[
              '/img/satelite/borys.jpeg',
              '/img/satelite/lemur.jpeg',
              '/img/satelite/kitteh.jpeg',
              '/img/satelite/desk-setup.jpeg',
              '/img/satelite/living-room.jpeg',
            ]"
            alt="Portrait of Borys"
          />
          <!-- Text Section -->
          <div class="text-center md:text-left max-w-lg">
            <h1
              class="text-base md:text-3xl font-bold mb-2 flex flex-wrap gap-2"
            >
              <span
                v-for="(word, wi) in greeting.split(' ')"
                :key="wi"
                class="inline-flex"
              >
                <span
                  v-for="(letter, li) in word.split('')"
                  :key="li"
                  :style="{ animationDelay: `${wi * 600 + li * 50}ms` }"
                  class="inline-block opacity-0 animate-letterReveal"
                >
                  {{ letter }}
                </span>
                <span class="w-1.5"></span>
              </span>
            </h1>

            <h1
              class="text-base md:text-3xl font-bold mb-3 animate-textReveal delay-150"
            >
              I'm Borys!
            </h1>

            <h3
              :class="{
                'animate-fadeOut': isFadingOut,
                'animate-fadeIn': !isFadingOut,
              }"
              class="w-fit text-xs md:text-sm text-text-secondary mb-2 transition-transform duration-500"
            >
              {{ currentTitle }}
            </h3>

            <h3
              class="w-fit text-xs md:text-lg mb-4 text-text-primary animate-textReveal"
            >
              Innovating for success.
            </h3>

            <!-- Button -->
            <button
              class="w-fit relative px-4 py-2 text-xs bg-button-primary text-text-primary font-medium rounded-md hover:bg-background-light-2 transition-all duration-300 shadow-sm group overflow-hidden"
            >
              <span class="z-10 relative">View My Work</span>
              <span
                class="absolute left-0 top-0 w-full h-full bg-background-light group-hover:animate-shine"
              ></span>
            </button>
          </div>
        </div>
        <TechStack v-if="showContent" />
      </section>

      <!-- Content Section -->
      <div
        v-if="showContent"
        class="container mx-auto max-w-5xl mt-12 mb-12 px-4 md:px-6 animate-contentEnter"
      >
        <div class="flex flex-col lg:flex-row gap-8 items-start relative">
          <!-- Recent Posts Section -->
          <section class="w-full lg:w-3/5">
            <div class="space-y-4">
              <PostCard
                v-for="(post, key) in posts?.slice(0, 6)"
                :key="post.path"
                :is-big="!key"
                :post="post"
              />
            </div>
          </section>

          <!-- Sidebar Section -->
          <aside class="w-full lg:w-2/5 lg:max-h-screen lg:sticky lg:top-25">
            <div class="space-y-4">
              <SubscriptionForm />
              <WorkExperience :experiences="experiences" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import TechStack from "~/components/TechStack.vue";
import PostCard from "~/components/PostCard.vue";
import SubscriptionForm from "~/components/SubscriptionForm.vue";
import WorkExperience from "~/components/WorkExperience.vue";
import { useIntroSequence } from "~/composables/useIntroSequence";
import { useRotatingTitles } from "~/composables/useRotatingTitles";
import { useGreeting } from "~/composables/useGreeting";

const { greeting } = useGreeting();
const { currentTitle, isFadingOut } = useRotatingTitles();
const { showIntro, showContent } = useIntroSequence();

const { data: posts } = await useAsyncData(() =>
  queryCollection("blog").order("date", "DESC").all(),
);

const experiences = [
  {
    title: "Software Engineer",
    company: "IRP/WOSI",
    period: "February 2025 - Now",
    icon: "/img/companies/irp.png",
  },
  {
    title: "Sales Assistant",
    company: "Hifi-Klubben",
    period: "March 2024 - Now",
    icon: "/img/companies/hfk.svg",
  },
  {
    title: "AGF-assistant",
    company: "Albert Heijn",
    period: "September 2023 - March 2024",
    icon: "/img/companies/ah.png",
  },
  {
    title: "Sales Assistant",
    company: "Pull&Bear",
    period: "April 2023 - August 2023",
    icon: "/img/companies/pb.png",
  },
];
</script>
