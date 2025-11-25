<script lang="ts" setup>
import {ArrowTopRightOnSquareIcon} from '@heroicons/vue/24/outline'

useSeoMeta({
  title: 'Sitemap - Borys',
  description: 'Browse all pages and content on Raadnerd',
})

const {data: posts} = await useAsyncData(() =>
    queryCollection('blog').order('date', 'DESC').all()
)

const pageDescriptions: Record<string, string> = {
  '/': 'Welcome to my portfolio',
  '/projects': 'Explore my GitHub projects and repositories',
  '/services': 'Professional services I offer',
  '/interests': 'My hobbies and personal interests',
  '/contact': 'Get in touch with me',
  '/privacy': 'How I handle your data',
  '/terms': 'Terms and conditions',
  '/blog': 'Read my latest blog posts and articles',
}

const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Projects',
  '/services': 'Services',
  '/interests': 'Interests',
  '/contact': 'Contact',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Service',
  '/blog': 'Blog',
}

const pageCategories: Record<string, 'main' | 'legal'> = {
  '/': 'main',
  '/projects': 'main',
  '/services': 'main',
  '/interests': 'main',
  '/contact': 'main',
  '/blog': 'main',
  '/privacy': 'legal',
  '/terms': 'legal',
}

const router = useRouter()
const routes = router.getRoutes()

const mainPages = routes
    .filter(route => {
      const path = route.path
      return pageCategories[path] === 'main' &&
          !path.includes(':') &&
          path !== '/sitemap'
    })
    .map(route => ({
      name: pageTitles[route.path] || route.path.split('/').pop() || 'Home',
      path: route.path,
      description: pageDescriptions[route.path] || 'Explore this page',
    }))
    .sort((a, b) => {
      if (a.path === '/') return -1
      if (b.path === '/') return 1
      return a.name.localeCompare(b.name)
    })

const legalPages = routes
    .filter(route => pageCategories[route.path] === 'legal')
    .map(route => ({
      name: pageTitles[route.path] || route.path.replace('/', ''),
      path: route.path,
      description: pageDescriptions[route.path] || 'Legal information',
    }))

const externalLinks = [
  {name: 'GitHub', url: 'https://github.com/raadfxrd', description: 'View my code repositories'},
  {name: 'LinkedIn', url: 'https://www.linkedin.com/in/borys-babas/', description: 'Professional profile'},
  {name: 'CV / Resume', url: '/assets/borys-cv.pdf', description: 'Download my resume'},
]
</script>

<template>
  <div class="relative w-full">
    <section class="container mx-auto min-h-screen px-4 pt-30 pb-20 md:px-6">
      <div class="mx-auto max-w-5xl">
        <div class="mb-12">
          <h1 class="gradient mb-4 text-4xl font-bold md:text-5xl w-fit">
            Sitemap
          </h1>
          <p class="text-text-secondary text-lg">
            Navigate through all pages and content on my website
          </p>
        </div>

        <div class="space-y-12">
          <section>
            <h2 class="text-text-primary mb-6 text-2xl font-semibold">
              Main Pages
            </h2>
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <NuxtLink
                  v-for="page in mainPages"
                  :key="page.path"
                  :to="page.path"
                  class="bg-background-light hover:bg-background-light-2 group block rounded-lg p-5 transition-all duration-300"
              >
                <h3 class="text-text-primary mb-2 text-lg font-semibold group-hover:text-button-primary transition-colors">
                  {{ page.name }}
                </h3>
                <p class="text-text-secondary text-sm">
                  {{ page.description }}
                </p>
              </NuxtLink>
            </div>
          </section>

          <section v-if="posts && posts.length > 0">
            <h2 class="text-text-primary mb-6 text-2xl font-semibold">
              Blog Posts ({{ posts.length }})
            </h2>
            <div class="bg-background-light rounded-lg p-6">
              <div class="space-y-3">
                <NuxtLink
                    v-for="post in posts"
                    :key="post.path"
                    :to="post.path"
                    class="hover:bg-background-light-2 group flex items-center justify-between rounded-lg p-3 transition-all duration-200"
                >
                  <div class="flex-1">
                    <h3 class="text-text-primary mb-1 font-medium group-hover:text-button-primary transition-colors">
                      {{ post.title }}
                    </h3>
                    <p class="text-text-secondary text-sm">
                      {{ post.description }}
                    </p>
                    <p class="text-text-secondary mt-1 text-xs">
                      {{
                        new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      }}
                    </p>
                  </div>
                  <ArrowTopRightOnSquareIcon
                      class="text-text-secondary group-hover:text-button-primary ml-4 h-5 w-5 flex-shrink-0 transition-colors"/>
                </NuxtLink>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-text-primary mb-6 text-2xl font-semibold">
              External Links
            </h2>
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <a
                  v-for="link in externalLinks"
                  :key="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="bg-background-light hover:bg-background-light-2 group flex items-start justify-between rounded-lg p-5 transition-all duration-300"
              >
                <div class="flex-1">
                  <h3 class="text-text-primary mb-2 text-lg font-semibold group-hover:text-button-primary transition-colors">
                    {{ link.name }}
                  </h3>
                  <p class="text-text-secondary text-sm">
                    {{ link.description }}
                  </p>
                </div>
                <ArrowTopRightOnSquareIcon
                    class="text-text-secondary group-hover:text-button-primary ml-3 h-5 w-5 flex-shrink-0 transition-colors"/>
              </a>
            </div>
          </section>

          <section>
            <h2 class="text-text-primary mb-6 text-2xl font-semibold">
              Legal & Policies
            </h2>
            <div class="grid gap-4 md:grid-cols-2">
              <NuxtLink
                  v-for="page in legalPages"
                  :key="page.path"
                  :to="page.path"
                  class="bg-background-light hover:bg-background-light-2 group block rounded-lg p-5 transition-all duration-300"
              >
                <h3 class="text-text-primary mb-2 text-lg font-semibold group-hover:text-button-primary transition-colors">
                  {{ page.name }}
                </h3>
                <p class="text-text-secondary text-sm">
                  {{ page.description }}
                </p>
              </NuxtLink>
            </div>
          </section>

          <section class="bg-background-light rounded-lg p-6">
            <h2 class="text-text-primary mb-4 text-xl font-semibold">
              About This Sitemap
            </h2>
            <p class="text-text-secondary leading-relaxed">
              This sitemap provides a comprehensive overview of all pages and content available on my portfolio website.
              If you're looking for something specific or have any questions, feel free to
              <NuxtLink to="/contact" class="text-button-primary hover:underline">contact me</NuxtLink>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
