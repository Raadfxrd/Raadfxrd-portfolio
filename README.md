# Raadnerd, Borys' Next-Gen Portfolio

![Thumbnail](public/img/portfolio.png)

This repository contains the source code for Raadnerd. The portfolio is built using **Nuxt 4**, **Vue 3**, and *
*Tailwind CSS 4**, showcasing projects fetched from GitHub, blog posts, skills, and personal
information with stunning 3D visualizations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Recommended IDE Setup](#recommended-ide-setup)
- [Project Setup](#project-setup)
- [Development](#development)
- [Production](#production)
- [Folder Structure](#folder-structure)
- [Key Features](#key-features)
- [Scripts](#scripts)
- [Credits](#credits)

## Features

**Dynamic GitHub Integration** - Automatically fetches and displays projects from GitHub with READMEs and images  
**Dark Mode Support** - Seamless theme switching with system preference detection  
**Blog System** - Content management powered by Nuxt Content  
**3D Visualizations** - Interactive 3D models using TresJS  
**Lightning Fast** - Built with Nuxt 4 and Vite for optimal performance  
**Modern UI** - Tailwind CSS 4 with custom animations and transitions  
**Fully Responsive** - Mobile-first design approach

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) - Vue 3 meta-framework
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with Vite plugin
- **3D Graphics**: [TresJS](https://tresjs.org/) - Vue 3 powered Three.js wrapper
- **Content**: [Nuxt Content](https://content.nuxt.com/) - File-based CMS
- **Icons**: [Heroicons Vue](https://heroicons.com/)
- **Animations**: GSAP & custom CSS animations
- **Typography**: [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
- **Post Processing**: [@tresjs/post-processing](https://tresjs.org/guide/post-processing.html)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
disable
Vetur) + [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## Project Setup

Install dependencies:

```bash
npm install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Generate static site:

```bash
npm run generate
```

## Folder Structure

```
portfolio/
├── .nuxt/                  # Nuxt build directory (auto-generated)
├── app.vue                 # Main app component
├── nuxt.config.ts          # Nuxt configuration
├── content.config.ts       # Nuxt Content configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── assets/
│   └── css/
│       ├── main.css        # Global styles
│       └── animations.css  # Custom animations
├── components/
│   ├── ExplodingImage.vue     # Interactive image component
│   ├── FadeInSection.vue      # Scroll animations
│   ├── Footer.vue             # Site footer
│   ├── Navbar.vue             # Navigation bar
│   ├── NavLinks.vue           # Navigation links
│   ├── PostCard.vue           # Blog post card
│   ├── SubscriptionForm.vue   # Newsletter subscription
│   ├── TechStack.vue          # Technology showcase
│   └── WorkExperience.vue     # Work history
├── composables/
│   ├── techStack.ts           # Tech stack data
│   ├── useAvatarTransition.ts # Avatar animations
│   ├── useGreeting.ts         # Dynamic greeting
│   ├── useIntroSequence.ts    # Intro animations
│   ├── useNavbarVisibility.ts # Navbar scroll behavior
│   └── useRotatingTitles.ts   # Rotating title effect
├── content/
│   └── blog/                  # Markdown blog posts
│       ├── from-idea-to-interface.md
│       ├── how-i-started-coding.md
│       ├── keyboard-customisation.md
│       ├── perfect-portfolio.md
│       ├── vue-portfolio-build.md
│       └── working-with-clients.md
├── layouts/
│   └── default.vue            # Default layout
├── pages/
│   ├── index.vue              # Home page
│   ├── projects.vue           # Projects (GitHub integration)
│   ├── interests.vue          # Personal interests
│   ├── contact.vue            # Contact form
│   ├── services.vue           # Services offered
│   ├── privacy.vue            # Privacy policy
│   ├── terms.vue              # Terms of service
│   ├── sitemap.vue            # Sitemap
│   └── blog/
│       └── [slug].vue         # Dynamic blog post pages
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── assets/
│   │   └── borys-cv.pdf
│   ├── fonts/
│   │   └── Pearl.ttf
│   ├── img/                   # Images
│   └── models/                # 3D models
│       └── ibm_model_m_keyboard/
└── server/
    └── tsconfig.json          # Server TypeScript config
```

## Key Features

### GitHub Projects Integration

The projects page automatically fetches repositories from GitHub (`raadfxrd`), extracts README content, and displays:

- First image from README as thumbnail
- Project title and description parsed from README
- Repository topics, stars, and language
- Links to live demos and source code

### Responsive Design

Mobile-first approach with breakpoints:

- Mobile: Base styles
- Tablet: `md:` prefix
- Desktop: `lg:` prefix

### Custom Animations

- Intro sequence with fade and scale effects
- Letter-by-letter text reveal
- Smooth page transitions
- Hover effects and micro-interactions
- Exploding image gallery with satellites

### Dark Mode

Intelligent theme switching:

- Respects system preferences
- Manual toggle available
- Persistent across sessions
- Smooth transitions between modes

### Content Management

Blog posts written in Markdown with:

- Frontmatter metadata
- Automatic routing
- Syntax highlighting
- Typography optimization

## Scripts

- `npm install` - Install project dependencies
- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build locally
- `npm run postinstall` - Prepare Nuxt (runs automatically)

## Credits

- **3D Models**: IBM Model M Keyboard from [Sketchfab](https://sketchfab.com/)
- **Icons**: [Heroicons](https://heroicons.com/) & [Devicon](https://devicon.dev/)
- **Framework**: [Nuxt Team](https://nuxt.com/) for the amazing meta-framework
- **3D Library**: [TresJS Team](https://tresjs.org/) for Vue 3 Three.js integration
- **Animations**: [GSAP](https://greensock.com/gsap/) for smooth animations

---

**Built with <3 by Borys (Raadfxrd)**

Check out the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more about the
framework.
