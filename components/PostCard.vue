<template>
  <NuxtLink
    :to="`${post.path}`"
    class="group rounded-lg bg-transparent transition-all duration-300"
  >
    <div
      class="bg-background-light p-4 rounded-lg transition-all duration-300 group-hover:bg-background-light-2/90 group-hover:cursor-pointer h-full flex flex-col justify-between"
    >
      <!-- Post Title -->
      <h3 class="text-xs md:text-sm font-medium mb-2">
        {{ post.title }}
      </h3>

      <!-- Post Description -->
      <p class="text-xs text-text-secondary mb-3 line-clamp-3">
        {{ post.description }}
      </p>

      <!-- Author and Date -->
      <div class="flex justify-between items-center">
        <span class="text-xs text-text-secondary">{{ formattedDate }}</span>
        <p
          class="text-xs text-text-primary group-hover:translate-x-0.5 transition-transform"
        >
          Read More →
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "PostCard",
  props: {
    post: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    formattedDate() {
      if (!this.post.date) return "No date found.";

      const date = new Date(this.post.date);
      if (isNaN(date.getTime())) return "Date couldn't be parsed correctly.";

      return new Intl.DateTimeFormat("nl-NL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    },
  },
});
</script>
