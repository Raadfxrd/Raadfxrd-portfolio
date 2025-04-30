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
    class="min-h-screen px-6 pt-32 pb-20 bg-background-light text-text-primary font-default"
  >
    <div class="max-w-3xl mx-auto space-y-10">
      <!-- Title -->
      <h1
        class="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-text-primary"
      >
        {{ post?.title || "Post not found" }}
      </h1>

      <!-- Meta -->
      <div
        class="text-sm flex items-center justify-between border-b pb-4 text-text-secondary border-border-light"
      >
        <span v-if="post?.author">By {{ post.author }}</span>
        <span v-if="post?.date">{{ formatDate(post.date) }}</span>
      </div>

      <!-- Cover -->
      <img
        v-if="post?.cover"
        :src="post.cover"
        alt="Cover image"
        class="w-full rounded-2xl shadow-xl ring-1 ring-overlay"
      />

      <!-- Content -->
      <article>
        <ContentRenderer :value="post?.body" class="markdown" />
      </article>
    </div>

    <!-- Back Home Button -->
    <div class="mt-12">
      <RouterLink
        to="/"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-text-primary bg-background-dark rounded-lg hover:-translate-x-0.5 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Back to Home
      </RouterLink>
    </div>
  </section>
</template>
