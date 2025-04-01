// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},

    app: {
        pageTransition: {name: 'page', mode: 'out-in'}
    },

    css: [
        '@/assets/css/main.css',
    ],

    vite: {
        plugins: [
            tailwindcss(),
        ],
    },

    head: {
        link: [
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
            }
        ],
        script: [
            {src: '@/assets/js/main.js', type: 'module'}
        ]
    },
});