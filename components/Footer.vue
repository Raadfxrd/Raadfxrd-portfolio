<template>
  <footer
    class="w-full bg-background-light py-16 mt-auto border-solid border-t border-border-dark"
  >
    <!-- Main Footer Content -->
    <div class="w-11/12 max-w-7xl mx-auto">
      <!-- Top Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <!-- Brand Section -->
        <div class="space-y-6 md:pr-8">
          <h3 class="text-xl font-bold text-text-primary">Borys Babas</h3>
          <p class="text-sm text-text-secondary leading-relaxed">
            Crafting digital experiences with passion and precision.
          </p>
          <div class="flex items-center space-x-6">
            <a
              href="https://github.com/raadfxrd"
              target="_blank"
              class="text-text-secondary hover:text-text-primary transition-all duration-300 text-2xl hover:scale-110"
            >
              <i class="devicon-github-original"></i>
            </a>
            <a
              href="https://linkedin.com/in/borys-babas"
              target="_blank"
              class="text-text-secondary hover:text-text-primary transition-all duration-300 text-2xl hover:scale-110"
            >
              <i class="devicon-linkedin-plain"></i>
            </a>
            <a
              href="https://twitter.com/raadfxrd"
              target="_blank"
              class="text-text-secondary hover:text-text-primary transition-all duration-300 text-2xl hover:scale-110"
            >
              <i class="devicon-twitter-original"></i>
            </a>
          </div>
        </div>

        <!-- Navigation Section -->
        <div class="space-y-6">
          <h4
            class="text-sm font-bold uppercase tracking-wider text-text-primary"
          >
            Navigation
          </h4>
          <ul class="space-y-3">
            <li v-for="link in navigationLinks" :key="link.path">
              <NuxtLink
                :to="link.path"
                class="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center justify-start gap-2 group"
              >
                <span
                  class="w-0 h-[1px] bg-text-primary transition-all duration-300 group-hover:w-4"
                ></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Latest Posts Section -->
        <div class="space-y-6">
          <h4
            class="text-sm font-bold uppercase tracking-wider text-text-primary"
          >
            Latest Posts
          </h4>
          <ul class="space-y-4">
            <li v-for="post in latestPosts" :key="post.slug">
              <NuxtLink :to="`/blog/${post.slug}`" class="group block">
                <h5
                  class="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2"
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
            class="text-sm font-bold uppercase tracking-wider text-text-primary"
          >
            Contact
          </h4>
          <div class="space-y-3">
            <a
              href="mailto:b.babas@icloud.com"
              class="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon :icon="faEnvelope" />
              b.babas@icloud.com
            </a>
            <a
              href="tel:+31618900864"
              class="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon :icon="faPhone" />
              +31 6 1890 0864
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-border-light">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-sm text-text-secondary">
            © {{ new Date().getFullYear() }} Borys Babas - All rights reserved.
          </p>
          <div class="flex items-center space-x-6">
            <NuxtLink
              v-for="link in legalLinks"
              :key="link.path"
              :to="link.path"
              class="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

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
