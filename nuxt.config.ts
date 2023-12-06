// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  devtools: { enabled: true },
  app: {
    head: {
      title: '菠菜的小窝',
      meta: [
        { name: 'description', content: '这是一个充满传奇故事狗狗的互联网小窝' },
        { name: 'keywords', content: '群晖,IT,Java,emby' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://cdn.woaibocai.top/bcblog/public/favicon.ico' }
      ]
    }
  },
  css: [
    '~/assets/sass/Normalize.scss',
    '~/assets/sass/myBackgroundImage.scss',
    '~/assets/fonts/fonts.scss'
  ]
})
