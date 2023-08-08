// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    dirs: ['store'],
  },
  modules: [
    '@vant/nuxt',
    '@nuxtjs/tailwindcss',
    'dayjs-nuxt',
    'nuxt-icons',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `defineStore(), storeToRefs()`
          'defineStore',
          'storeToRefs',
        ],
      },
    ],
  ],
  css: ["assets/styles/app.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/styles/vars.scss";',
        },
      },
    },
  },
})
