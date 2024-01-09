<script setup lang="ts">
definePageMeta({
  layout: "mobile",
});
// import
const MyUrl = "http://localhost:16280/api/blog";
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
title.value = articleData.title + " - 文章";
description.value = articleData.summary;
keywords.value = articleData.keywords;
text.value = articleData.content;
editorId.value = articleData.url;
</script>

<template>
  <el-row>
    <el-col :span="22">
      <AppArticleInfo :articleData="articleData" :isMoblie="true" />
      <AppMainMyAlert />
      <MdPreview
        previewTheme="mk-cute"
        :modelValue="text"
        @onGetCatalog="onGetCatalog"
      />
      <AppMainComment />
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
