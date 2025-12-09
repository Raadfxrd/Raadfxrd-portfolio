import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    head: {
      title: "Raadnerd",
      meta: [
        {
          name: "description",
          content: "Raadnerd, Borys' personal portfolio.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css",
        },
      ],
    },
  },

  css: ["/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxtjs/color-mode", "@nuxt/content"],

  colorMode: {
    preference: "system", // default value if no preference is stored
    fallback: "dark", // fallback value if system can't be detected
    classSuffix: "", // Important for Tailwind's 'dark' class
    storageKey: "theme", // optional: aligns with your example
  },

  runtimeConfig: {
    // Private keys (server-side only)
    recaptchaSecretKey: process.env.NUXT_RECAPTCHA_SECRET_KEY || "",

    // Public keys (exposed to client)
    public: {
      githubToken: process.env.NUXT_PUBLIC_GITHUB_TOKEN || "",
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
    },
  },
});
