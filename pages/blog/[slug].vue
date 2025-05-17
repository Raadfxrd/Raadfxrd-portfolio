<script setup>
import { onMounted } from "vue";

const route = useRoute();
const slug = route.params.slug;

const {
  data: post,
  error,
  refresh,
} = await useAsyncData(`blog-${slug}`, async () => {
  try {
    const result = await queryCollection("blog").path(`/blog/${slug}`).first();
    if (!result) {
      throw new Error("Post not found");
    }
    // Reload the page after successfully getting the result
    if (import.meta.client) {
      window.location.reload();
    }
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
  window.scrollTo(0, 0);
});

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
};
</script>

<template>
  <section
    class="bg-background-light text-text-primary font-default min-h-screen px-6 pt-32 pb-20"
  >
    <div class="mx-auto max-w-3xl space-y-10">
      <!-- Title -->
      <h1
        class="text-text-primary text-4xl leading-tight font-bold tracking-tight md:text-6xl"
      >
        {{ post?.title || "Post not found" }}
      </h1>

      <!-- Meta -->
      <div
        class="text-text-secondary border-border-light flex items-center justify-between border-b pb-4 text-sm"
      >
        <span v-if="post?.author">By {{ post.author }}</span>
        <span v-if="post?.date">{{ formatDate(post.date) }}</span>
      </div>

      <!-- Cover -->
      <img
        v-if="post?.cover"
        :src="post.cover"
        alt="Cover image"
        class="ring-overlay w-full rounded-2xl shadow-xl ring-1"
      />

      <!-- Content -->
      <article>
        <ContentRenderer :value="post?.body" class="markdown" />
      </article>
    </div>

    <!-- Back Home Button -->
    <div class="mt-12">
      <RouterLink
        class="text-text-primary bg-background-dark inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-x-0.5"
        to="/"
      >
        <svg
          class="mr-2 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            fill-rule="evenodd"
          />
        </svg>
        Back to Home
      </RouterLink>
    </div>
  </section>
</template>
