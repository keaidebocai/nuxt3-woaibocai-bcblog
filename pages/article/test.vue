<script lang="ts" setup>
definePageMeta({
  layout: "nothing",
});
useHead({
  title: "首页",
});
// import
import { GetArticleByUrl } from "~/api/blog/article";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
const route = useRoute();
const url = route.params.id;
const text = ref();
const catalogList = ref([]);
const editorId = ref("");
const onGetCatalog = (list) => {
  catalogList.value = list;
};
const getArticle = async () => {
  const { data } = await GetArticleByUrl("test-1");
  text.value = data.content;
  editorId.value = data.url;
  console.log(editorId);
};
useHead({
  title: "首页",
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
onMounted(() => {
  getArticle();
  const scrollElement = document;
  myScrollElement.value = scrollElement.documentElement;
});
// onMounted(() => {
//   fetchData();
// });
</script>

<template>
  <div>
    <div style="display: flex; justify-content: center; align-content: center">
      <div class="affix-container">
        <el-affix target=".affix-container">
          <AppHeader />
        </el-affix>
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
            <MarkDownCataLog :editorId="editorId" />
          </div>
        </div>
        <!-- <slot /> -->
      </div>
    </div>
    <el-backtop :right="40" :bottom="40" :visibility-height="1000" />
  </div>
</template>
<style lang="scss" scoped>
.affix-container {
  height: 100vh;
}
* {
  --el-text-color-regular: black;
  --el-pagination-font-size: 20px;
  --el-pagination-border-radius: 50%;
}
.md-editor-previewOnly {
  border: none;
  height: auto;
  border-radius: 20px;
}
</style>
