<template>
  <div class="relative w-full">
    <section
        class="flex min-h-screen w-full flex-col items-center justify-center"
    >
      <!-- Intro Overlay -->
      <div
          v-if="showIntro"
          class="bg-background-light animate-introFadeOut fixed inset-0 z-50 flex items-center justify-center"
      >
        <h1
            id="intro-title"
            class="text-text-primary animate-scaleIn text-lg font-bold md:text-2xl"
        >
          Borys
        </h1>
      </div>

      <!-- Hero Section -->
      <section
          v-if="showContent"
          class="animate-contentEnter flex h-screen w-full flex-col items-center justify-center"
      >
        <div
            class="flex w-full max-w-5xl flex-col items-center justify-center gap-12 px-4 md:flex-row md:px-6"
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
          <div class="gradient max-w-lg">
            <h1
                class="mb-2 flex flex-wrap gap-2 text-base font-bold md:text-3xl"
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
                    class="animate-letterReveal inline-block opacity-0"
                >
                  {{ letter }}
                </span>
                <span class="w-1.5"></span>
              </span>
            </h1>

            <h1
                class="animate-textReveal mb-3 text-base font-bold delay-150 md:text-3xl"
            >
              I'm Borys!
            </h1>

            <h3
                :class="{
                'animate-fadeOut': isFadingOut,
                'animate-fadeIn': !isFadingOut,
              }"
                class="text-text-secondary mb-2 w-fit text-xs transition-transform duration-500 md:text-sm"
            >
              {{ currentTitle }}
            </h3>

            <h3
                class="text-text-primary animate-textReveal mb-4 w-fit text-xs md:text-lg"
            >
              Innovating for success.
            </h3>

            <!-- Button -->
            <NuxtLink
                class="bg-button-primary text-text-primary hover:bg-background-light-2 group relative w-fit overflow-hidden rounded-md px-4 py-2 text-xs font-medium shadow-sm transition-all duration-300"
                to="/projects"
            >
              <span class="relative z-10">View My Work</span>
            </NuxtLink>
          </div>
        </div>
        <TechStack v-if="showContent"/>
      </section>

      <!-- Content Section -->
      <div
          v-if="showContent"
          class="animate-contentEnter container mx-auto mt-12 mb-12 max-w-5xl px-4 md:px-6"
      >
        <div class="relative flex flex-col items-start gap-8 lg:flex-row">
          <!-- Recent Posts Section -->
          <section class="w-full lg:w-3/5">
            <h1 class="gradient bl-4 ml-4 w-fit text-2xl font-semibold">
              Recent Posts
            </h1>
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
          <aside class="w-full lg:sticky lg:top-25 lg:max-h-screen lg:w-2/5">
            <div class="space-y-4">
              <SubscriptionForm/>
              <WorkExperience :experiences="experiences"/>
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
import {useIntroSequence} from "~/composables/useIntroSequence";
import {useRotatingTitles} from "~/composables/useRotatingTitles";
import {useGreeting} from "~/composables/useGreeting";

const {greeting} = useGreeting();
const {currentTitle, isFadingOut} = useRotatingTitles();
const {showIntro, showContent} = useIntroSequence();

const {data: posts} = await useAsyncData(() =>
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
