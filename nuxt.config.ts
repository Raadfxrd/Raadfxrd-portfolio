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
});