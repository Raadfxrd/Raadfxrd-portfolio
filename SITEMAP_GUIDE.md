# Dynamic Sitemap Guide

Your sitemap is now **mostly automatic**! Here's how it works and what you need to do when adding new pages.

## What's Automatic

### Blog Posts (100% Automatic)

- **Zero maintenance required**
- New blog posts in `/content/blog/` automatically appear
- Sorted by date (newest first)
- Includes title, description, and date
- **Action needed**: None! Just add your `.md` files to `/content/blog/`

### Page Detection

- Pages in `/pages/` are automatically discovered
- Routes are pulled from Nuxt Router
- No need to manually add routes
- **Action needed**: Just create your `.vue` files in `/pages/`

## What Needs Configuration

When you create a **new page**, you need to add it to the configuration objects in `sitemap.vue`:

### 1. **Add to `pageCategories`** (Required)

This determines which section the page appears in:

```typescript
const pageCategories: Record<string, 'main' | 'legal'> = {
    '/your-new-page': 'main',  // or 'legal' for policy pages
}
```

**Options:**

- `'main'` - Appears in "Main Pages" section
- `'legal'` - Appears in "Legal & Policies" section

### 2. **Add to `pageTitles`** (Optional)

Customize how the page name appears:

```typescript
const pageTitles: Record<string, string> = {
    '/your-new-page': 'Your New Page',  // Display name
}
```

If you don't add it, the URL path will be used as the title.

### 3. **Add to `pageDescriptions`** (Optional)

Add a description for the page:

```typescript
const pageDescriptions: Record<string, string> = {
    '/your-new-page': 'Description of what this page does',
}
```

If you don't add it, a generic description will be used.

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

