<script lang="ts" setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useAsyncData } from "#app";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { queryCollection } from "#imports";

const route = useRoute();
const slug = route.params.slug;

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

watch(
  () => route.params.slug,
  async () => {
    await refresh();
  },
);

const formatDate = (date: string) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};
</script>

<template>
  <section
    class="bg-background-light text-text-primary font-default min-h-screen px-4 pt-20 pb-12 md:px-6 md:pt-24 md:pb-16"
  >
    <div class="mx-auto max-w-3xl space-y-6 md:space-y-8">
      <h1
        class="text-text-primary text-2xl leading-snug font-bold tracking-tight md:text-3xl lg:text-5xl"
      >
        {{ post?.title || "Post not found" }}
      </h1>

      <div
        class="text-text-secondary border-border-light flex flex-col items-start justify-between gap-2 border-b pb-3 text-xs sm:flex-row sm:items-center sm:gap-0 md:text-sm"
      >
        <span v-if="post?.author">By {{ post.author }}</span>
        <span v-if="post?.date">{{ formatDate(post.date) }}</span>
      </div>

      <article v-if="post">
        <ContentRenderer
          :value="post.body"
          class="markdown prose prose-sm md:prose-base dark:prose-invert max-w-none"
        />
      </article>

      <div v-else class="py-8 text-center md:py-10">
        <h2 class="text-text-secondary text-lg md:text-xl">Post not found.</h2>
      </div>

      <div class="pt-8 md:pt-10">
        <RouterLink
          class="group bg-background-dark text-text-primary hover:bg-opacity-80 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition md:px-4 md:text-sm"
          to="/"
        >
          <span
            class="relative inline-flex h-4 w-4 items-center justify-center"
          >
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
