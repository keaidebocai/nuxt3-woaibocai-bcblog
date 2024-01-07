// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      BASE_URL: "http://localhost:16280/api",
    },
  },
  modules: [
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  vite: {
    // 打包后清除console和debugger，注意：server下文件的不会删除
    esbuild: {
      // drop: ["console", "debugger"],
    },
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
    storage: "localStorage",
  },
  app: {
    head: {
      title: "菠菜的小窝",
      meta: [
        {
          name: "description",
          content: "这是一个充满传奇故事狗狗的互联网小窝",
        },
        { name: "keywords", content: "群晖,IT,Java,emby" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "https://cdn.woaibocai.top/bcblog/public/favicon.ico",
        },
      ],
    },
  },
  css: [
    "~/assets/sass/Normalize.scss",
    "~/assets/sass/myBackgroundImage.scss",
    "~/assets/fonts/fonts.scss",
    "~/assets/sass/components.scss",
  ],
});
