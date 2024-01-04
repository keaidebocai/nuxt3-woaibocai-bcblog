<script setup lang="ts">
// import
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
const MyUrl = "http://localhost:16280/api/blog";
const route = useRoute();
const url = route.params.id;
const text = ref();
const catalogList = ref([]);
const editorId = ref("");
const title = ref();
const description = ref();
const keywords = ref();
const onGetCatalog = (list) => {
  catalogList.value = list;
};
useHead({
  title: title,
  meta: [
    {
      hid: "description",
      name: "description",
      content: description,
    },
    {
      hid: "keywords",
      name: "keywords",
      content: keywords,
    },
  ],
});

const myScrollElement = ref();
const onHtmlChanged = () => {
  // Check if `document` is available
  if (process.browser) {
    const { hash } = location;

    if (/^#/.test(hash)) {
      const headingId = decodeURIComponent(hash.replace("#", ""));

      if (headingId) {
        const targetHeadDom = document.getElementById(headingId);
        console.log(targetHeadDom);
        if (targetHeadDom) {
          const scrollLength =
            (targetHeadDom as HTMLHeadElement).offsetTop + 414 - 10;

          window.scrollTo({
            top: scrollLength,
            behavior: "smooth",
          });
        }
      }
    }
  }
};
const { data } = await useAsyncData(`${url}`, () =>
  $fetch(MyUrl + `/article/getArticleByUrl/${url}`)
);
const articleData = data.value.data;
title.value = articleData.title;
description.value = articleData.summary;
keywords.value = articleData.keywords;
text.value = articleData.content;
editorId.value = articleData.url;
onMounted(() => {
  const scrollElement = document;
  myScrollElement.value = scrollElement.documentElement;
});
</script>

<template>
  <!-- <div class="articleMain">
    <MdPreview
      previewTheme="mk-cute"
      :modelValue="text"
      :editorId="editorId"
      @onGetCatalog="onGetCatalog"
      @onHtmlChanged="onHtmlChanged"
    />
    <MarkDownCataLog :editorId="editorId" />
  </div> -->
  <!-- <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="keywords" :content="keywords" />
  </Head> -->
  <AppArticleInfo :articleData="articleData" :isMoblie="false" />
  <div
    style="
      height: 100vh;
      display: flex;
      justify-content: center;
      padding: 0 214px;
    "
  >
    <div>
      <AppMainMyAlert />
      <MdPreview
        previewTheme="mk-cute"
        :modelValue="text"
        :editorId="editorId"
        @onGetCatalog="onGetCatalog"
        @onHtmlChanged="onHtmlChanged"
      />
      <AppButtom :my-class="'MyButtom'" />
    </div>
    <div style="margin-left: 30px">
      <AppMainRightBlogInfo />
      <el-affix position="top" :offset="0">
        <MarkDownCataLog :editorId="editorId" />
      </el-affix>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.articleMain {
  width: 100%;
}
.affix-container {
  height: 100vh;
}
.md-editor-previewOnly {
  max-width: 1200px;
  border: none;
  height: auto;
  border-radius: 20px;
}
</style>
