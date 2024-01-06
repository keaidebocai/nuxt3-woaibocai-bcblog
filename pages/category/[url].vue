<script setup lang="ts">
import { GetArticlePageBycategoryUrl } from "~/api/blog/article";
// elementPlus 国际化
import zh from "element-plus/es/locale/lang/zh-cn";
const route = useRoute();
const url = route.params.url.toString();
const articlePage = ref();
const page = ref({
  current: 1,
  size: 3,
});
const myClass = ref("MyButtom");
const tagData = {
  tagName: "",
  remark: "",
};
const tag = ref(tagData);
const total = ref();
const title = ref();
const description = ref();
const fetchData = async () => {
  const { data } = await GetArticlePageBycategoryUrl(
    url,
    page.value.current,
    page.value.size
  );
  articlePage.value = data;
  page.value.current = data.current;
  page.value.size = data.size;
  total.value = data.total;
  tag.value.remark = data.category.description;
  tag.value.tagName = data.category.categoryName;
  description.value = data.category.description;
  title.value = data.category.categoryName;
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
      content: url,
    },
  ],
});
onMounted(() => {
  fetchData();
});
</script>

<template>
  <AppCategoryOrTagInfo :data="tag" />
  <div style="display: flex; justify-content: center">
    <div>
      <AppMainMyAlert />
      <AppMainArticle class="article-main" :index-article="articlePage" />
      <el-config-provider size="large" :locale="zh">
        <el-pagination
          v-model:current-page="page.current"
          v-model:page-size="page.size"
          :small="false"
          :disabled="false"
          :background="true"
          layout="total, prev, pager, next"
          :hide-on-single-page="true"
          @update:page-size="fetchData()"
          @update:current-page="fetchData()"
          :total="total"
          style="display: flex; justify-content: center; align-content: center"
        />
      </el-config-provider>
      <AppButtom :my-class="myClass" />
    </div>
    <div style="margin-left: 30px">
      <AppMainRightBlogInfo />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-main {
  width: 100%;
}
* {
  --el-text-color-regular: black;
  --el-pagination-font-size: 20px;
  --el-pagination-border-radius: 50%;
}
</style>
