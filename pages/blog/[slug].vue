<script lang="ts" setup>
import {onMounted, watch} from "vue";
import {useRoute} from "vue-router";
import {useAsyncData} from "#app";
import {ChevronLeftIcon} from "@heroicons/vue/24/outline";

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

onMounted(() => {
  const container = document.querySelector(
      ".no-scrollbar",
  ) as HTMLElement | null;
  if (container) container.scrollTop = 0;
});

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
      class="bg-background-light text-text-primary font-default min-h-screen px-4 md:px-6 pt-20 md:pt-24 pb-12 md:pb-16"
  >
    <div class="mx-auto max-w-3xl space-y-6 md:space-y-8">
      <h1
          class="text-text-primary text-2xl md:text-3xl lg:text-5xl leading-snug font-bold tracking-tight"
      >
        {{ post?.title || "Post not found" }}
      </h1>

      <div
          class="text-text-secondary border-border-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 border-b pb-3 text-xs md:text-sm"
      >
        <span v-if="post?.author">By {{ post.author }}</span>
        <span v-if="post?.date">{{ formatDate(post.date) }}</span>
      </div>

      <img
          v-if="post?.cover"
          :src="post.cover"
          alt="Cover image"
          class="ring-overlay w-full rounded-lg md:rounded-xl shadow-md ring-1"
      />

      <article v-if="post">
        <ContentRenderer
            :value="post.body"
            class="markdown prose prose-sm md:prose-base dark:prose-invert max-w-none"
        />
      </article>

      <div v-else class="py-8 md:py-10 text-center">
        <h2 class="text-text-secondary text-lg md:text-xl">Post not found.</h2>
      </div>

      <div class="pt-8 md:pt-10">
        <RouterLink
            class="group bg-background-dark text-text-primary hover:bg-opacity-80 inline-flex items-center gap-2 rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm transition"
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
