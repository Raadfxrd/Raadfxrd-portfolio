<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {marked} from "marked";

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  topics: string[]
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
  readme?: string
  thumbnail?: string
  readmeTitle?: string
  readmeDescription?: string
}

const repos = ref<Repository[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const config = useRuntimeConfig()

const fetchGitHubRepos = async () => {
  try {
    loading.value = true
    error.value = null

    const reposResponse = await fetch('https://api.github.com/users/raadfxrd/repos?sort=updated&per_page=20', {
      headers: config.public.githubToken ? {
        Authorization: `Bearer ${config.public.githubToken}`
      } : {}
    })

    if (!reposResponse.ok) {
      if (reposResponse.status === 403) {
        const rateLimitRemaining = reposResponse.headers.get('X-RateLimit-Remaining')
        const rateLimitReset = reposResponse.headers.get('X-RateLimit-Reset')

        if (rateLimitRemaining === '0') {
          const resetDate = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString() : 'unknown'
          console.error('GitHub API rate limit exceeded. Resets at:', resetDate)
          throw new Error(`GitHub API rate limit exceeded. Please try again after ${resetDate}`)
        }
      }
      throw new Error('Failed to fetch repositories')
    }

    const reposData = await reposResponse.json()

    // Filter out forks and fetch README for each repo
    const publicRepos = reposData.filter((repo: any) => !repo.fork)

    repos.value = await Promise.all(
        publicRepos.map(async (repo: any) => {
          try {
            const readmeResponse = await fetch(
                `https://api.github.com/repos/raadfxrd/${repo.name}/readme`,
                {
                  headers: config.public.githubToken ? {
                    Accept: 'application/vnd.github.v3.raw',
                    Authorization: `Bearer ${config.public.githubToken}`
                  } : {
                    Accept: 'application/vnd.github.v3.raw'
                  }
                }
            )

            let readme = ''
            let thumbnail = ''
            let readmeTitle = ''
            let readmeDescription = ''

            if (!readmeResponse.ok && readmeResponse.status === 403) {
              const rateLimitRemaining = readmeResponse.headers.get('X-RateLimit-Remaining')
              if (rateLimitRemaining === '0') {
                const rateLimitReset = readmeResponse.headers.get('X-RateLimit-Reset')
                const resetDate = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString() : 'unknown'
                console.error(`GitHub API rate limit exceeded while fetching README for ${repo.name}. Resets at:`, resetDate)
              }
            }

            if (readmeResponse.ok) {
              readme = await readmeResponse.text()

              const imageMatch = readme.match(/!\[.*?]\((.*?)\)/i)
              if (imageMatch && imageMatch[1]) {
                thumbnail = imageMatch[1]
                if (!thumbnail.startsWith('http')) {
                  thumbnail = `https://raw.githubusercontent.com/raadfxrd/${repo.name}/main/${thumbnail.replace(/^\.?\//, '')}`
                }
              }
              const titleMatch = readme.match(/^#+\s+(.+?)$/m)
              if (titleMatch && titleMatch[1]) {
                readmeTitle = titleMatch[1].trim()
              }
              const lines = readme.split('\n')
              let foundTitle = false
              for (const line of lines) {
                if (line.match(/^#+\s+/)) {
                  foundTitle = true
                  continue
                }
                if (foundTitle && line.trim() && !line.startsWith('!') && !line.startsWith('[') && !line.startsWith('#')) {
                  readmeDescription = line.trim()
                  break
                }
              }
            }

            return {
              id: repo.id,
              name: repo.name,
              description: repo.description || 'No description available',
              html_url: repo.html_url,
              homepage: repo.homepage,
              topics: repo.topics || [],
              stargazers_count: repo.stargazers_count,
              forks_count: repo.forks_count,
              language: repo.language,
              updated_at: repo.updated_at,
              readme,
              thumbnail,
              readmeTitle,
              readmeDescription
            }
          } catch (err) {
            console.error(`Error fetching README for ${repo.name}:`, err)
            return {
              id: repo.id,
              name: repo.name,
              description: repo.description || 'No description available',
              html_url: repo.html_url,
              homepage: repo.homepage,
              topics: repo.topics || [],
              stargazers_count: repo.stargazers_count,
              forks_count: repo.forks_count,
              language: repo.language,
              updated_at: repo.updated_at,
              readme: '',
              thumbnail: '',
              readmeTitle: '',
              readmeDescription: ''
            }
          }
        })
    )
  } catch (err) {
    console.error('Error fetching GitHub repos:', err)
    error.value = 'Failed to load projects. Please try again later.'
  } finally {
    loading.value = false
  }
}

const decodeHtmlEntities = (text: string) => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

const parseReadmeText = (text: string) => {
  if (!text) return ''

  try {
    const html = marked.parse(text) as string
    let plainText = html.replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

    plainText = decodeHtmlEntities(plainText)

    return plainText
  } catch (err) {
    console.error('Error parsing markdown:', err)
    return text
  }
}

onMounted(() => {
  fetchGitHubRepos()
})
</script>

<template>
  <div class="min-h-screen w-full py-20">
    <div class="container mx-auto max-w-6xl px-4 md:px-6">
      <div class="mb-12">
        <h1 class="text-text-primary mb-4 text-3xl font-bold md:text-5xl">
          Projects
        </h1>
        <p class="text-text-secondary text-base md:text-lg">
          Here are some of my recent projects from GitHub
        </p>
      </div>

      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="text-text-secondary text-lg">Loading projects...</div>
      </div>
      <div v-else-if="error" class="flex items-center justify-center py-20">
        <div class="text-red-500 text-lg">{{ error }}</div>
      </div>
      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
            v-for="repo in repos"
            :key="repo.id"
            class="bg-background-light hover:bg-background-light-2/90 group flex flex-col overflow-hidden rounded-lg transition-all duration-300"
        >
          <div
              v-if="repo.thumbnail"
              class="aspect-video w-full overflow-hidden bg-gray-800"
          >
            <img
                :src="repo.thumbnail"
                :alt="`${repo.name} thumbnail`"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                @error="(e) => ((e.target as HTMLImageElement).style.display = 'none')"
            />
          </div>
          <div class="flex flex-1 flex-col p-4">
            <h3 class="text-text-primary mb-2 text-lg font-semibold">
              {{ parseReadmeText(repo.readmeTitle || repo.name) }}
            </h3>
            <p class="text-text-secondary mb-3 line-clamp-3 text-sm">
              {{ parseReadmeText(repo.readmeDescription || repo.description) }}
            </p>
            <div v-if="repo.topics.length > 0" class="mb-4 flex flex-wrap gap-2">
              <span
                  v-for="topic in repo.topics.slice(0, 3)"
                  :key="topic"
                  class="bg-background-light-2 text-text-secondary rounded-full px-2 py-1 text-xs"
              >
                {{ topic }}
              </span>
            </div>
            <div class="mt-auto flex items-center justify-between border-t border-gray-700 pt-3">
              <div class="flex items-center gap-4 text-xs text-gray-400">
                <span v-if="repo.language" class="flex items-center gap-1">
                  <span class="h-2 w-2 rounded-full bg-blue-500"></span>
                  {{ repo.language }}
                </span>
                <span>⭐ {{ repo.stargazers_count }}</span>
              </div>

              <a
                  :href="repo.html_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-text-primary hover:text-text-secondary text-xs transition-all group-hover:translate-x-0.5"
              >
                View on GitHub →
              </a>
            </div>
            <a
                v-if="repo.homepage"
                :href="repo.homepage"
                target="_blank"
                rel="noopener noreferrer"
                class="text-text-primary hover:text-text-secondary mt-2 text-xs transition-colors"
            >
              🔗 Live Demo
            </a>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
