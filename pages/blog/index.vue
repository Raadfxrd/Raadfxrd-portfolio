<template>
  <div class="relative w-full">
    <section class="container mx-auto min-h-screen px-4 pt-20 md:pt-30 pb-12 md:pb-20 md:px-6">
      <div class="mx-auto max-w-6xl">
        <!-- Header -->
        <div class="mb-8 md:mb-12 relative">
          <h1 class="gradient mb-3 pb-1 md:mb-4 text-3xl md:text-4xl lg:text-5xl font-bold w-fit relative z-10">
            Blog
          </h1>
          <p class="text-text-secondary text-sm md:text-base lg:text-lg w-fit max-w-2xl relative z-10">
            My journey through code, design, and everything in between—sharing what I learn along the way
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="flex items-center justify-center py-12 md:py-20">
          <div class="text-text-secondary text-base md:text-lg">Loading posts...</div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="flex items-center justify-center py-12 md:py-20">
          <div class="text-red-500 text-base md:text-lg">Failed to load blog posts. Please try again later.</div>
        </div>

        <!-- Blog Posts Grid -->
        <div v-else-if="posts && posts.length > 0" class="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
              v-for="(post, index) in posts"
              :key="post.path"
              :to="post.path"
              class="bg-background-light hover:bg-background-light-2 border border-transparent hover:border-button-primary group flex flex-col rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
          >
            <!-- Dynamic Gradient Header with Pattern -->
            <div
                :class="getGradientClass(index)"
                class="h-32 md:h-40 w-full relative overflow-hidden"
            >
              <!-- Animated gradient overlay -->
              <div
                  class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-500"></div>

              <!-- Decorative shapes -->
              <div
                  class="absolute top-2 right-2 w-16 h-16 rounded-full border-2 border-white/20 group-hover:scale-150 group-hover:rotate-180 transition-all duration-700"></div>
              <div
                  class="absolute bottom-3 left-3 w-12 h-12 rounded-full bg-white/10 group-hover:scale-125 transition-all duration-500"></div>
              <div
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/10 rotate-45 group-hover:rotate-90 transition-all duration-700"></div>
            </div>

            <!-- Post Content -->
            <div class="flex flex-1 flex-col p-2 md:p-3">
              <!-- Post Date -->
              <div class="flex items-center gap-2 text-text-secondary mb-3 text-xs">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>{{ formatDate(post.date) }}</span>
              </div>

              <!-- Post Title -->
              <h2 class="text-text-secondary group-hover:text-text-primary mb-3 text-lg md:text-xl font-bold transition-colors line-clamp-3">
                {{ post.title }}
              </h2>

              <!-- Post Description -->
              <p class="text-text-secondary group-hover:text-text-primary mb-4 text-sm line-clamp-3 transition-colors leading-relaxed">
                {{ post.description }}
              </p>

              <!-- Read More Link -->
              <div
                  class="mt-auto flex items-center gap-1 text-text-secondary group-hover:text-text-primary text-sm font-semibold transition-all">
                <span class="relative">
                  Read More
                </span>
                <svg class="w-4 h-4 transition-all group-hover:translate-x-1" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- No Posts State -->
        <div v-else class="flex flex-col items-center justify-center py-12 md:py-20">
          <div class="text-text-secondary text-lg mb-4">No blog posts yet</div>
          <p class="text-text-secondary text-sm">Check back soon for new content!</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'Blog - Borys',
  description: 'Read my latest blog posts about software development, design, and technology',
})

// Fetch all blog posts
const {data: posts, pending, error} = await useAsyncData('blog-posts', () =>
    queryCollection('blog').order('date', 'DESC').all()
)

// Format date helper
const formatDate = (date: string) => {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

// Get dynamic gradient class based on index for variety
const getGradientClass = (index: number) => {
  const gradients = [
    'bg-gradient-to-br from-blue-400 via-blue-300 to-purple-400',
    'bg-gradient-to-br from-purple-400 via-pink-300 to-red-400',
    'bg-gradient-to-br from-green-400 via-teal-300 to-blue-400',
    'bg-gradient-to-br from-orange-400 via-red-300 to-pink-400',
    'bg-gradient-to-br from-cyan-400 via-blue-300 to-indigo-400',
    'bg-gradient-to-br from-rose-400 via-pink-300 to-purple-400',
  ]
  return gradients[index % gradients.length]
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes float-delay {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(-180deg);
  }
}
</style>
