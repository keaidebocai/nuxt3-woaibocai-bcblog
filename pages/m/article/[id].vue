<script setup lang="ts">
definePageMeta({
  layout: "mobile",
});
// import
const MyUrl = "https://www.likebocai.com/api/blog";
const route = useRoute();
const url = route.params.id;
const text = ref();
const catalogList = ref([]);
const editorId = ref("");
const title = ref();
const description = ref();
const keywords = ref();
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
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
const onGetCatalog = (list) => {
  catalogList.value = list;
};
const { data } = await useAsyncData(`${url}`, () =>
  $fetch(MyUrl + `/article/getArticleByUrl/${url}`)
);
const articleData = data.value.data;
const articleId = ref("");
title.value = articleData.title + " - 文章";
description.value = articleData.summary;
keywords.value = articleData.keywords;
text.value = articleData.content;
editorId.value = articleData.url;
articleId.value = articleData.id;
const onHtmlChanged = () => {
  // Check if `document` is available
  if (process.browser) {
    const { hash } = location;

    if (/^#/.test(hash)) {
      const headingId = decodeURIComponent(hash.replace("#", ""));

      if (headingId) {
        const targetHeadDom = document.getElementById(headingId);
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
</script>

<template>
  <el-row>
    <el-col :span="22">
      <AppArticleInfo :articleData="articleData" :isMoblie="true" />
      <AppMainMyAlert />
      <div style="max-height: 40vh;overflow: auto;width: 100%;display: flex;justify-content: center;border-radius: 25px;margin-bottom: 10px;background-color: rgba(255, 255, 255, 0.6);">
        <MarkDownCataLog :editorId="editorId" />
      </div>
      <MdPreview
        previewTheme="mk-cute"
        :modelValue="text"
        :editorId="editorId"
        @onGetCatalog="onGetCatalog"
        @onHtmlChanged="onHtmlChanged"
      />
      <AppMainComment :article-id="articleId"/>
      <AppButtom :is-mobile="true" :my-class="'MyButtomMobile'" />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.el-row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.md-editor-previewOnly {
  border: none;
  height: auto;
  border-radius: 20px;
}
</style>
