<template>
  <footer
      class="bg-background-light border-border-dark mt-auto w-full border-t border-solid py-10 md:py-16"
  >
    <div class="mx-auto w-11/12 max-w-7xl">
      <div class="mb-10 md:mb-16 grid grid-cols-1 gap-8 md:gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div class="space-y-4 md:space-y-6 md:pr-8">
          <h3 class="text-text-primary gradient w-fit text-lg md:text-xl font-bold">
            Borys Babas
          </h3>
          <p class="text-text-secondary w-fit text-xs md:text-sm leading-relaxed">
            Crafting digital experiences with passion and precision.
          </p>
          <div class="flex items-center space-x-4 md:space-x-6">
            <a
                class="group block transform transition-all duration-200 ease-out hover:scale-110"
                href="https://github.com/raadfxrd"
                target="_blank"
            >
              <i
                  class="devicon-github-original text-text-secondary group-hover:text-text-primary text-xl md:text-2xl transition-colors duration-200"
              ></i>
            </a>
            <a
                class="group block transform transition-all duration-200 ease-out hover:scale-110"
                href="https://linkedin.com/in/borys-babas"
                target="_blank"
            >
              <i
                  class="devicon-linkedin-plain text-text-secondary group-hover:text-text-primary text-xl md:text-2xl transition-colors duration-200"
              ></i>
            </a>
            <a
                class="group block transform transition-all duration-200 ease-out hover:scale-110"
                href="https://twitter.com/raadfxrd"
                target="_blank"
            >
              <i
                  class="devicon-twitter-original text-text-secondary group-hover:text-text-primary text-xl md:text-2xl transition-colors duration-200"
              ></i>
            </a>
          </div>
        </div>

        <div class="space-y-4 md:space-y-6">
          <h4
              class="text-text-primary w-fit text-xs md:text-sm font-bold tracking-wider uppercase"
          >
            Navigation
          </h4>
          <ul class="space-y-2 md:space-y-3">
            <li v-for="link in navigationLinks" :key="link.path">
              <NuxtLink
                  :to="link.path"
                  class="text-text-secondary hover:text-text-primary group flex w-fit items-center justify-start gap-2 text-xs md:text-sm transition-colors"
              >
                <span
                    class="bg-text-primary h-[1px] w-0 transition-all duration-300 group-hover:w-4"
                ></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="space-y-4 md:space-y-6">
          <h4
              class="text-text-primary w-fit text-xs md:text-sm font-bold tracking-wider uppercase"
          >
            Latest Posts
          </h4>
          <ul class="space-y-3 md:space-y-4">
            <li v-for="post in latestPosts" :key="post.slug">
              <NuxtLink :to="`/blog/${post.slug}`" class="group block w-fit">
                <h5
                    class="text-text-secondary group-hover:text-text-primary line-clamp-2 text-xs md:text-sm font-medium transition-colors"
                >
                  {{ post.title }}
                </h5>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="space-y-4 md:space-y-6">
          <h4
              class="text-text-primary w-fit text-xs md:text-sm font-bold tracking-wider uppercase"
          >
            Contact
          </h4>
          <div class="space-y-2 md:space-y-3">
            <a
                class="text-text-secondary hover:text-text-primary flex w-fit items-center gap-2 text-xs md:text-sm transition-colors"
                href="mailto:borysbabas@pm.me"
            >
              <EnvelopeIcon
                  class="text-text-secondary group-hover:text-text-primary h-4 w-4 md:h-5 md:w-5"
              />
              borysbabas@pm.me
            </a>
            <a
                class="text-text-secondary hover:text-text-primary flex w-fit items-center gap-2 text-xs md:text-sm transition-colors"
                href="tel:+31618900864"
            >
              <DevicePhoneMobileIcon
                  class="text-text-secondary group-hover:text-text-primary h-4 w-4 md:h-5 md:w-5"
              />
              +31 6 1890 0864
            </a>
          </div>
        </div>
      </div>

      <div class="border-border-light border-t pt-6 md:pt-8">
        <div
            class="flex flex-col items-center justify-between gap-3 md:gap-4 md:flex-row"
        >
          <p class="text-text-secondary text-xs md:text-sm text-center md:text-left">
            © {{ new Date().getFullYear() }} Raadnerd - All rights reserved.
          </p>
          <div class="flex items-center space-x-4 md:space-x-6">
            <NuxtLink
                v-for="link in legalLinks"
                :key="link.path"
                :to="link.path"
                class="text-text-secondary hover:text-text-primary text-xs md:text-sm transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import {DevicePhoneMobileIcon, EnvelopeIcon} from "@heroicons/vue/24/outline";

const navigationLinks = [
  {path: "/", label: "Home"},
  {path: "/blog", label: "Blog"},
  {path: "/projects", label: "Projects"},
  {path: "/interests", label: "Interests"},
  {path: "/services", label: "Services"},
  {path: "/contact", label: "Contact"},
];

const legalLinks = [
  {path: "/privacy", label: "Privacy Policy"},
  {path: "/terms", label: "Terms of Service"},
  {path: "/sitemap", label: "Sitemap"},
];

const {data: footerPosts} = await useAsyncData("footer-posts", () =>
    queryCollection("blog").order("date", "DESC").limit(3).all(),
);

const latestPosts = computed(
    () =>
        footerPosts.value?.map((post) => ({
          title: post.title,
          slug: post.path?.replace("/blog/", "") || "",
        })) || [],
);
</script>
