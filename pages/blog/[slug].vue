<script lang="ts" setup>
import {onMounted, watch} from "vue";
import {useRoute} from "vue-router";
import {useAsyncData} from "#app";
import {ChevronLeftIcon} from "@heroicons/vue/24/outline";

const route = useRoute();
const slug = route.params.slug;

// Fetch the blog post
const {
  data: post,
  error,
  refresh,
} = await useAsyncData(`blog-${slug}`, async () => {
  try {
    const result = await queryCollection("blog").path(`/blog/${slug}`).first();
    if (!result) throw new Error("Post not found");
    return result;
  } catch (e) {
    console.error("Error loading post:", e);
    return null;
  }
});

// Watch for route changes and refresh content
watch(
    () => route.params.slug,
    async () => {
      await refresh();
    },
);

// Scroll to top on mount
onMounted(() => {
  // Scroll to top of scroll container
  const container = document.querySelector(
      ".no-scrollbar",
  ) as HTMLElement | null;
  if (container) container.scrollTop = 0;
});

// Format the date
const formatDate = (date: string) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};
</script>

<template>
  <section
      class="bg-background-light text-text-primary font-default min-h-screen px-4 pt-24 pb-16 md:px-6"
  >
    <div class="mx-auto max-w-3xl space-y-8">
      <!-- Title -->
      <h1
          class="text-text-primary text-3xl leading-snug font-bold tracking-tight md:text-5xl"
      >
        {{ post?.title || "Post not found" }}
      </h1>

      <!-- Meta -->
      <div
          class="text-text-secondary border-border-light flex items-center justify-between border-b pb-3 text-sm"
      >
        <span v-if="post?.author">By {{ post.author }}</span>
        <span v-if="post?.date">{{ formatDate(post.date) }}</span>
      </div>

      <!-- Cover Image -->
      <img
          v-if="post?.cover"
          :src="post.cover"
          alt="Cover image"
          class="ring-overlay w-full rounded-xl shadow-md ring-1"
      />

      <!-- Content -->
      <article v-if="post">
        <ContentRenderer
            :value="post.body"
            class="markdown prose prose-sm md:prose-base dark:prose-invert max-w-none"
        />
      </article>

      <!-- Fallback -->
      <div v-else class="py-10 text-center">
        <h2 class="text-text-secondary text-xl">Post not found.</h2>
      </div>

      <!-- Back Button -->
      <div class="pt-10">
        <RouterLink
            class="group bg-background-dark text-text-primary hover:bg-opacity-80 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition"
            to="/"
        >
          <span
              class="relative inline-flex h-4 w-4 items-center justify-center"
          >
            <!-- Chevron arrowhead -->
            <ChevronLeftIcon
                class="text-text-primary h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1"
            />
          </span>
          Back to Home
        </RouterLink>
      </div>
    </div>
  </section>
</template>
