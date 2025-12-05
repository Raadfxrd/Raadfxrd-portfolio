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

## Implementation Examples

### Example 1: Adding a Standard Page

**Scenario**: Create `/pages/portfolio.vue`

**Minimum Implementation** (production-ready):

```typescript
// pages/sitemap.vue
const pageCategories: Record<string, 'main' | 'legal'> = {
    // ...existing routes
    '/portfolio': 'main',
}
```

**Recommended Implementation** (enhanced UX):

```typescript
// pages/sitemap.vue
const pageCategories: Record<string, 'main' | 'legal'> = {
    // ...existing routes
    '/portfolio': 'main',
}

const pageTitles: Record<string, string> = {
    // ...existing routes
    '/portfolio': 'Portfolio',
}

const pageDescriptions: Record<string, string> = {
    // ...existing routes
    '/portfolio': 'Explore my complete collection of projects and work samples',
}
```

### Example 2: Adding a Legal/Policy Page

**Scenario**: Create `/pages/cookie-policy.vue`

```typescript
// pages/sitemap.vue
const pageCategories: Record<string, 'main' | 'legal'> = {
    // ...existing routes
    '/cookie-policy': 'legal',
}

const pageTitles: Record<string, string> = {
    // ...existing routes
    '/cookie-policy': 'Cookie Policy',
}

const pageDescriptions: Record<string, string> = {
    // ...existing routes
    '/cookie-policy': 'Information about cookies and tracking on this site',
}
```

### Example 3: Adding External Links

```typescript
// pages/sitemap.vue
const externalLinks = [
    // ...existing links
    {
        name: 'Twitter',
        url: 'https://twitter.com/yourusername',
        description: 'Follow me on Twitter for updates',
    },
]
```

### Example 4: Adding a Blog Post (Zero Config)

```bash
# Simply create the markdown file
touch content/blog/my-new-post.md
```

```markdown
---
title: My New Blog Post
description: A brief description of the post
date: 2025-11-25
---

Your content here...
```

**Result**: Automatically appears in sitemap on next build/refresh.

## Technical Implementation Details

### Route Processing Pipeline

1. **Route Collection**
   ```typescript
   const routes = useRouter().getRoutes()
   ```
    - Fetches all registered Nuxt routes
    - Includes static and file-based routes

2. **Filtering**
   ```typescript
   .filter(route => 
     !route.path.includes(':') &&  // Exclude dynamic routes
     route.path !== '/sitemap' &&   // Exclude self
     pageCategories[route.path]     // Must be categorized
   )
   ```

3. **Mapping**
   ```typescript
   .map(route => ({
     name: pageTitles[route.path] || capitalizeRoute(route.path),
     path: route.path,
     description: pageDescriptions[route.path] || getDefaultDescription(route.path),
   }))
   ```

4. **Sorting**
    - Alphabetical by name
    - Home (`/`) always first

### Blog Post Pipeline

```typescript
const {data: posts} = await useAsyncData('blog-sitemap', () =>
    queryCollection('blog')
        .order('date', 'DESC')
        .all()
)
```

- Automatic query via Nuxt Content
- No manual configuration needed
- Sorted by date (newest first)
- Includes all frontmatter data

## Developer Workflow

### Adding a New Page

**Step 1**: Create the page file

```bash
# Create your page component
touch pages/my-new-page.vue
```

**Step 2**: Add to sitemap configuration

```typescript
// pages/sitemap.vue

// Required: Categorize the page
const pageCategories: Record<string, 'main' | 'legal'> = {
    // ...existing
    '/my-new-page': 'main',
}

// Optional but recommended: Add title
const pageTitles: Record<string, string> = {
    // ...existing
    '/my-new-page': 'My New Page',
}

// Optional but recommended: Add description
const pageDescriptions: Record<string, string> = {
    // ...existing
    '/my-new-page': 'Detailed description of the page purpose',
}
```

**Step 3**: Verify

```bash
# Development
npm run dev

# Navigate to /sitemap
# Verify your page appears in the correct section
```

### Adding a Blog Post

**Step 1**: Create markdown file

```bash
touch content/blog/my-post.md
```

**Step 2**: Add frontmatter

```markdown
---
title: My Blog Post Title
description: Brief summary of the post
date: 2025-11-25
---

Your content here...
```

**Step 3**: Build/Refresh

- Automatically detected by Nuxt Content
- No configuration needed
- Appears in sitemap immediately

## Configuration Reference

### Type Definitions

```typescript
// Page categories
type PageCategory = 'main' | 'legal'

// Configuration objects
const pageCategories: Record<string, PageCategory>
const pageTitles: Record<string, string>
const pageDescriptions: Record<string, string>

// External links
interface ExternalLink {
    name: string
    url: string
    description: string
}

const externalLinks: ExternalLink[]
```

### Required vs Optional

| Configuration      | Required | Fallback Behavior          |
|--------------------|----------|----------------------------|
| `pageCategories`   | ✅ Yes    | Page excluded from sitemap |
| `pageTitles`       | ❌ No     | Capitalized route path     |
| `pageDescriptions` | ❌ No     | Generic description        |

## Troubleshooting

### Page not appearing in sitemap

**Check:**

1. ✅ File exists in `/pages/` directory
2. ✅ Route is in `pageCategories` object
3. ✅ Route path matches exactly (include leading `/`)
4. ✅ Page is not a dynamic route (no `:` in path)

### Blog post not appearing

**Check:**

1. ✅ File is in `/content/blog/` directory
2. ✅ File has `.md` extension
3. ✅ Frontmatter includes required fields: `title`, `description`, `date`
4. ✅ Date format is valid (YYYY-MM-DD)

### Wrong section

**Fix:**

```typescript
// Check pageCategories value
const pageCategories: Record<string, 'main' | 'legal'> = {
    '/my-page': 'main',  // Should be 'main' or 'legal'
}
```

## Benefits

### For Developers

- ✅ **Minimal configuration**: Only 1 line per page required
- ✅ **Type-safe**: TypeScript ensures correctness
- ✅ **Auto-discovery**: Leverages Nuxt router
- ✅ **Blog automation**: Zero config for content

### For Users

- ✅ **Always up-to-date**: New pages appear automatically
- ✅ **Better SEO**: Comprehensive site structure
- ✅ **Easy navigation**: All content in one place

## Maintenance

### Regular Maintenance

- **None required** for blog posts
- **Minimal** for new pages (1-3 lines)

### When to Update

- ✅ Adding a new page to `/pages/`
- ✅ Changing page titles/descriptions
- ✅ Adding external social links
- ❌ Adding blog posts (automatic)
- ❌ Removing pages (automatic detection)

## Quick Reference

```bash
# New blog post (automatic)
content/blog/my-post.md

# New page (needs config)
pages/my-page.vue
# + Add to pageCategories in pages/sitemap.vue
```

