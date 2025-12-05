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
    <section class="container mx-auto min-h-screen px-4 pt-20 md:pt-30 pb-12 md:pb-20 md:px-6">
      <div class="mx-auto max-w-5xl">
        <div class="mb-8 md:mb-12">
          <h1 class="gradient mb-3 md:mb-4 text-3xl md:text-4xl lg:text-5xl font-bold w-fit">
            Sitemap
          </h1>
          <p class="text-text-secondary text-sm md:text-lg w-fit">
            Navigate through all pages and content on my website
          </p>
        </div>

        <div class="space-y-8 md:space-y-12">
          <section>
            <h2 class="text-text-primary mb-4 md:mb-6 text-xl md:text-2xl font-semibold w-fit">
              Main Pages
            </h2>
            <div class="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <NuxtLink
                  v-for="page in mainPages"
                  :key="page.path"
                  :to="page.path"
                  class="bg-background-light hover:bg-background-light-2 border border-transparent hover:border-button-primary group block rounded-lg p-4 md:p-5 transition-all duration-300"
              >
                <h3 class="text-text-secondary group-hover:text-text-primary mb-1.5 md:mb-2 text-base md:text-lg font-semibold transition-colors">
                  {{ page.name }}
                </h3>
                <p class="text-text-secondary group-hover:text-text-primary text-xs md:text-sm transition-colors">
                  {{ page.description }}
                </p>
              </NuxtLink>
            </div>
          </section>

          <section v-if="posts && posts.length > 0">
            <h2 class="text-text-primary mb-4 md:mb-6 text-xl md:text-2xl font-semibold w-fit">
              Blog Posts ({{ posts.length }})
            </h2>
            <div class="bg-background-light rounded-lg p-4 md:p-6">
              <div class="space-y-2 md:space-y-3">
                <NuxtLink
                    v-for="post in posts"
                    :key="post.path"
                    :to="post.path"
                    class="hover:bg-background-light-2 group flex items-center justify-between rounded-lg p-2 md:p-3 transition-all duration-200"
                >
                  <div class="flex-1">
                    <h3 class="text-text-secondary group-hover:text-text-primary mb-0.5 md:mb-1 text-sm md:text-base font-medium transition-colors">
                      {{ post.title }}
                    </h3>
                    <p class="text-text-secondary group-hover:text-text-primary text-xs md:text-sm transition-colors">
                      {{ post.description }}
                    </p>
                    <p class="text-text-secondary group-hover:text-text-primary mt-0.5 md:mt-1 text-xs transition-colors">
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
                      class="text-text-secondary group-hover:text-text-primary ml-3 md:ml-4 h-4 w-4 md:h-5 md:w-5 flex-shrink-0 transition-colors"/>
                </NuxtLink>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-text-primary mb-4 md:mb-6 text-xl md:text-2xl font-semibold w-fit">
              External Links
            </h2>
            <div class="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <a
                  v-for="link in externalLinks"
                  :key="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="bg-background-light hover:bg-background-light-2 border border-transparent hover:border-button-primary group flex items-start justify-between rounded-lg p-4 md:p-5 transition-all duration-300"
              >
                <div class="flex-1">
                  <h3 class="text-text-secondary group-hover:text-text-primary mb-1.5 md:mb-2 text-base md:text-lg font-semibold transition-colors">
                    {{ link.name }}
                  </h3>
                  <p class="text-text-secondary group-hover:text-text-primary text-xs md:text-sm transition-colors">
                    {{ link.description }}
                  </p>
                </div>
                <ArrowTopRightOnSquareIcon
                    class="text-text-secondary group-hover:text-text-primary ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5 flex-shrink-0 transition-colors"/>
              </a>
            </div>
          </section>

          <section>
            <h2 class="text-text-primary mb-4 md:mb-6 text-xl md:text-2xl font-semibold w-fit">
              Legal & Policies
            </h2>
            <div class="grid gap-3 md:gap-4 sm:grid-cols-2">
              <NuxtLink
                  v-for="page in legalPages"
                  :key="page.path"
                  :to="page.path"
                  class="bg-background-light hover:bg-background-light-2 border border-transparent hover:border-button-primary group block rounded-lg p-4 md:p-5 transition-all duration-300"
              >
                <h3 class="text-text-secondary group-hover:text-text-primary mb-1.5 md:mb-2 text-base md:text-lg font-semibold transition-colors">
                  {{ page.name }}
                </h3>
                <p class="text-text-secondary group-hover:text-text-primary text-xs md:text-sm transition-colors">
                  {{ page.description }}
                </p>
              </NuxtLink>
            </div>
          </section>

          <section class="bg-background-light rounded-lg p-4 md:p-6">
            <h2 class="text-text-primary mb-4 text-xl font-semibold w-fit">
              About This Sitemap
            </h2>
            <p class="text-text-secondary leading-relaxed text-xs md:text-sm">
              This sitemap provides a comprehensive overview of all pages and content available on my portfolio website.
              If you're looking for something specific or have any questions, feel free to
              <NuxtLink to="/contact"
                        class="social-link underline">
                contact me
              </NuxtLink>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
