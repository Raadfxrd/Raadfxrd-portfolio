<template>
  <footer
    class="bg-background-light border-border-dark mt-auto w-full border-t border-solid py-16"
  >
    <!-- Main Footer Content -->
    <div class="mx-auto w-11/12 max-w-7xl">
      <!-- Top Section -->
      <div class="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <!-- Brand Section -->
        <div class="space-y-6 md:pr-8">
          <h3 class="text-text-primary gradient w-fit text-xl font-bold">
            Borys Babas
          </h3>
          <p class="text-text-secondary w-fit text-sm leading-relaxed">
            Crafting digital experiences with passion and precision.
          </p>
          <div class="flex items-center space-x-6">
            <a
              class="group block transform transition-all duration-200 ease-out hover:scale-110"
              href="https://github.com/raadfxrd"
              target="_blank"
            >
              <i
                class="devicon-github-original text-text-secondary group-hover:text-text-primary text-2xl transition-colors duration-200"
              ></i>
            </a>
            <a
              class="group block transform transition-all duration-200 ease-out hover:scale-110"
              href="https://linkedin.com/in/borys-babas"
              target="_blank"
            >
              <i
                class="devicon-linkedin-plain text-text-secondary group-hover:text-text-primary text-2xl transition-colors duration-200"
              ></i>
            </a>
            <a
              class="group block transform transition-all duration-200 ease-out hover:scale-110"
              href="https://twitter.com/raadfxrd"
              target="_blank"
            >
              <i
                class="devicon-twitter-original text-text-secondary group-hover:text-text-primary text-2xl transition-colors duration-200"
              ></i>
            </a>
          </div>
        </div>

        <!-- Navigation Section -->
        <div class="space-y-6">
          <h4
            class="text-text-primary w-fit text-sm font-bold tracking-wider uppercase"
          >
            Navigation
          </h4>
          <ul class="space-y-3">
            <li v-for="link in navigationLinks" :key="link.path">
              <NuxtLink
                :to="link.path"
                class="text-text-secondary hover:text-text-primary group flex w-fit items-center justify-start gap-2 text-sm transition-colors"
              >
                <span
                  class="bg-text-primary h-[1px] w-0 transition-all duration-300 group-hover:w-4"
                ></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Latest Posts Section -->
        <div class="space-y-6">
          <h4
            class="text-text-primary w-fit text-sm font-bold tracking-wider uppercase"
          >
            Latest Posts
          </h4>
          <ul class="space-y-4">
            <li v-for="post in latestPosts" :key="post.slug">
              <NuxtLink :to="`/blog/${post.slug}`" class="group block w-fit">
                <h5
                  class="text-text-secondary group-hover:text-text-primary line-clamp-2 text-sm font-medium transition-colors"
                >
                  {{ post.title }}
                </h5>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Section -->
        <div class="space-y-6">
          <h4
            class="text-text-primary w-fit text-sm font-bold tracking-wider uppercase"
          >
            Contact
          </h4>
          <div class="space-y-3">
            <a
              class="text-text-secondary hover:text-text-primary flex w-fit items-center gap-2 text-sm transition-colors"
              href="mailto:b.babas@icloud.com"
            >
              <EnvelopeIcon
                class="text-text-secondary group-hover:text-text-primary h-5 w-5"
              />
              b.babas@icloud.com
            </a>
            <a
              class="text-text-secondary hover:text-text-primary flex w-fit items-center gap-2 text-sm transition-colors"
              href="tel:+31618900864"
            >
              <DevicePhoneMobileIcon
                class="text-text-secondary group-hover:text-text-primary h-5 w-5"
              />
              +31 6 1890 0864
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-border-light border-t pt-8">
        <div
          class="flex flex-col items-center justify-between gap-4 md:flex-row"
        >
          <p class="text-text-secondary text-sm">
            © {{ new Date().getFullYear() }} Borys Babas - All rights reserved.
          </p>
          <div class="flex items-center space-x-6">
            <NuxtLink
              v-for="link in legalLinks"
              :key="link.path"
              :to="link.path"
              class="text-text-secondary hover:text-text-primary text-sm transition-colors"
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
import { DevicePhoneMobileIcon, EnvelopeIcon } from "@heroicons/vue/24/outline";

const navigationLinks = [
  { path: "/", label: "Home" },
  { path: "/blog", label: "Blog" },
  { path: "/projects", label: "Projects" },
  { path: "/interests", label: "Interests" },
  { path: "/services", label: "Services" },
  { path: "/contact", label: "Contact" },
];

const legalLinks = [
  { path: "/privacy", label: "Privacy Policy" },
  { path: "/terms", label: "Terms of Service" },
  { path: "/sitemap", label: "Sitemap" },
];

// Fetch posts for footer
const { data: footerPosts } = await useAsyncData("footer-posts", () =>
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
