# Dynamic Sitemap - Developer Guide

## Overview

The sitemap system is semi-automatic, leveraging Nuxt's router for route discovery while requiring minimal configuration
for new pages. Blog posts are fully automatic via Nuxt Content.

## Architecture

### Automatic Components

#### 1. Blog Post Discovery

- **Source**: `content/blog/*.md`
- **Query**: Nuxt Content's `queryCollection('blog')`
- **Sorting**: Descending by `date` field
- **Data**: Auto-extracts `title`, `description`, `date`, `path`
- **Developer Action**: None required - just create markdown files

#### 2. Route Discovery

- **Source**: Nuxt Router (`useRouter().getRoutes()`)
- **Filtering**: Excludes dynamic routes (`:param`) and sitemap itself
- **Mapping**: Automatic path-to-display conversion
- **Developer Action**: Standard Vue file creation in `/pages/`

### Configuration Required

When adding a new page route, update three configuration objects in `pages/sitemap.vue`:

#### 1. `pageCategories` (Required)

Maps routes to sitemap sections.

```typescript
const pageCategories: Record<string, 'main' | 'legal'> = {
    '/new-route': 'main',  // or 'legal'
}
```

**Types:**

- `'main'` → Renders in "Main Pages" section
- `'legal'` → Renders in "Legal & Policies" section

**Impact**: Pages not in this map are excluded from the sitemap.

#### 2. `pageTitles` (Optional)

Overrides default title generation.

```typescript
const pageTitles: Record<string, string> = {
    '/new-route': 'Custom Display Name',
}
```

**Fallback**: If undefined, uses capitalized route path (e.g., `/about` → "About")

#### 3. `pageDescriptions` (Optional)

Provides page descriptions for better UX.

```typescript
const pageDescriptions: Record<string, string> = {
    '/new-route': 'Brief description of page functionality',
}
```

**Fallback**: Generic description based on page type

## Example: Adding a New Page

Let's say you create a new page: `/pages/portfolio.vue`

**Minimum required** (only this is mandatory):

```typescript
const pageCategories: Record<string, 'main' | 'legal'> = {
    // ...existing pages...
    '/portfolio': 'main',  // ← Add this line
}
```

**Full configuration** (recommended for best UX):

```typescript
const pageCategories: Record<string, 'main' | 'legal'> = {
    // ...existing pages...
    '/portfolio': 'main',
}

const pageTitles: Record<string, string> = {
    // ...existing pages...
    '/portfolio': 'Portfolio',  // ← Nice display name
}

const pageDescriptions: Record<string, string> = {
    // ...existing pages...
    '/portfolio': 'Browse my complete portfolio of work',  // ← Helpful description
}
```

## External Links

To add new external links (GitHub, LinkedIn, etc.), update the `externalLinks` array:

```typescript
const externalLinks = [
    {
        name: 'Your Social',
        url: 'https://example.com/your-profile',
        description: 'Follow me on Your Social',
    },
]
```

## How It Works

1. **Nuxt Router** provides all registered routes
2. **Filters** exclude:
    - Dynamic routes (paths with `:`)
    - The sitemap page itself
    - Pages not in `pageCategories`
3. **Maps** routes to display objects with name, path, description
4. **Sorts** alphabetically (Home always first)

## Benefits

- **Blog posts**: 100% automatic, zero config
- **New pages**: Only 1-3 lines of config needed
- **Maintenance**: Minimal - pages auto-discovered
- **Flexibility**: Can still customize titles/descriptions
- **Type-safe**: TypeScript ensures correctness

## Quick Reference

### When adding a new blog post:

```bash
# Just create the file - that's it!
content/blog/my-new-post.md
```

### When adding a new page:

```typescript
// 1. Create the page
pages / my - page.vue

// 2. Add to sitemap.vue (minimum):
const pageCategories: Record<string, 'main' | 'legal'> = {
    '/my-page': 'main',  // Only this line is required!
}
```

That's it! Your sitemap is now mostly maintenance-free. 🎉

