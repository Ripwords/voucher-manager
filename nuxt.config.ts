// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  primevue: {
    directives: {
      include: ["FocusTrap"],
    },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
  },
  css: [
    "primevue/resources/themes/aura-dark-green/theme.css",
    "primeicons/primeicons.css",
  ],
  modules: [
    "@nuxtjs/supabase",
    "nuxt-primevue",
    "nuxt-primevue",
    "@nuxt/eslint",
    "@vite-pwa/nuxt",
    "@nuxtjs/tailwindcss",
  ],
})
