export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  // Josh Roberts, u23536765
  css: ['~/assets/css/main.css'],
  dir: {
    layouts: 'layouts'
  },
  typescript: {
    strict: true
  },

  compatibilityDate: '2025-04-19'
})