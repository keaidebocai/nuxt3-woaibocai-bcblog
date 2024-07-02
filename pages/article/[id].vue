<script setup lang="ts">
// import
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
const MyUrl = useRuntimeConfig().public.HTTP_URL;
const route = useRoute();
const url = route.params.id;
const text = ref();
const catalogList = ref([]);
const editorId = ref("");
const title = ref("");
const description = ref();
const keywords = ref();
const onGetCatalog = (list) => {
  catalogList.value = list;
};
const myScrollElement = ref();
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
const articleId = ref();
const { data } = await useAsyncData(`${url}`, () =>
  $fetch(MyUrl + `/blog/article/getArticleByUrl/${url}`, { method: "get" })
);
const articleData = data.value.data;
title.value = articleData.title + " - 文章";
description.value = articleData.summary;
keywords.value = articleData.keywords;
text.value = articleData.content;
editorId.value = articleData.url;
articleId.value = articleData.id;
onMounted(() => {
  const scrollElement = document;
  myScrollElement.value = scrollElement.documentElement;
});
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
const articleCommentPlaceholder =
  "入住菠菜的小窝说些什么吧~\n本评论区支持MarkDown语法，可插入图片、代码块、视频等……\n图片语法(不受保护的图片): ![图片文字](图片的链接地址)\n右上角图片上传图标也可直接上传(支持png、jpg、git每张图不超1M即可)\n不符合上传要求的则返回![](undefined)\n具体将鼠标悬浮工具栏查看";
</script>

<template>
  <AppArticleInfo :articleData="articleData" :isMoblie="false" />
  <div style="display: flex; justify-content: center">
    <div class="article-main">
      <AppMainMyAlert />
      <MdPreview previewTheme="mk-cute" :modelValue="text" :editorId="editorId" @onGetCatalog="onGetCatalog"
        @onHtmlChanged="onHtmlChanged" />
      <LazyAppMainComment :article-id="articleId" :comment-type="articleCommentPlaceholder" />
      <AppButtom :my-class="'MyButtom'" />
    </div>
    <div class="right" style="margin-left: 30px">
      <AppMainRightBlogInfo />
      <div class="tagCloud-box">
        <div class="tagCloud-box-title">
          <img src="https://cdn.likebocai.com/bcblog/assets/icon/tag.png" alt="标签" />
          <h2>标签云</h2>
          (点点标签~)
        </div>
        <AppMainRightTagCloud width="320" height="320" radius="120" style="position: relative; left: 20px; top: -40px" />
      </div>
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

.tagCloud-box {
  min-width: 250px;
  max-width: 400px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.6);

  .tagCloud-box-title {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding-top: 10px;
    color: #32325d;

    img {
      width: "32px";
      height: "32px";
      margin-right: 10px;
    }

    h2 {
      font-size: 1.5rem;
    }
  }
}

@media screen and (max-width: 1601px) {
  .md-editor-previewOnly {
    max-width: 873px;
  }
}

@media screen and (max-width: 1281px) {
  .md-editor-previewOnly {
    max-width: 600px;
  }
}

@media screen and (max-width: 1200px) {
  .right {
    display: none;
  }
}
</style>
