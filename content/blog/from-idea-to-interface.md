---
title: "From idea to interface: Building a Markdown blog with Vue & Tailwind"
description: "A deep dive into creating a custom Markdown-based blog using Vue 3, Nuxt, and Tailwind CSS - without third-party CMS dependencies."
author: "Borys"
date: 2025-04-12
---

Ever wanted to write blog posts *like this one*, but code the whole experience yourself? That’s what I decided to do:
build a lightweight Markdown-based blog system using Vue, Nuxt, and Tailwind CSS — with zero reliance on third-party
CMSes.

## 🧠 Why Markdown?

Because writing in Markdown feels like talking to your editor without yelling. It’s fast, readable, and
version-controllable. I wanted a setup where I could write `.md` files, commit them, and see them rendered with full
styling — headings, lists, code blocks, and all — without touching a WYSIWYG editor.

## 🛠️ The Stack

- **Vue 3** (via **Nuxt 3**) – for a snappy dev experience
- **Tailwind CSS** – to handle design via utility classes
- **Content Module** (optional) – if you want to parse Markdown automatically
- **Custom `<article>` Styling** – because the default reset nuked my beautiful spacing (see my previous blog post)

## 🧩 The Setup

I created a `/content` folder and dropped my `.md` files in there. Using `@nuxt/content`, I rendered them into
components and styled them with scoped article styles like this:

```html

<template>
    <article v-html="post.body" class="prose dark:prose-invert"/>
</template>
```

Then I realized Tailwind’s `prose` class didn’t give me the control I wanted. So I wrote my own.

## 🎨 Styling Content My Way

I defined specific spacing and type settings for headings, paragraphs, lists, and inline code, because Tailwind’s base
layer was flattening everything to `margin: 0`. I ended up using `all: revert` in a scoped CSS block to remove the reset
*only* inside my article, then reapplied my own rhythm and color styles.

```css
article * {
    all: revert;
    box-sizing: border-box;
}
```

## 📦 Deployment

I hosted everything on **Vercel**, so pushing to Git auto-deploys the latest content. This means blogging is literally
just:

```bash
echo "## New Post" >> content/2025-05-01.md
git add .
git commit -m "New blog post"
git push
```

Done.

---

## 🧩 What’s Next?

I’m thinking of adding:

- A custom theme toggle
- Syntax highlighting for code blocks
- Search with Fuse.js

Want to see that process too? Let me know — or fork it and try it yourself.