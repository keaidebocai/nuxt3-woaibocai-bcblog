<script setup lang="ts">
definePageMeta({
  layout: "mobile",
});
import { GetArticlePageBytagUrl } from "~/api/blog/article";
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
  const { data } = await GetArticlePageBytagUrl(
    url,
    page.value.current,
    page.value.size
  );
  articlePage.value = data;
  page.value.current = data.current;
  page.value.size = data.size;
  total.value = data.total;
  tag.value.remark = data.tag.remark;
  tag.value.tagName = data.tag.tagName;
  description.value = data.tag.remark;
  title.value = tag.value.tagName + " - 标签";
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
  <el-row>
    <el-col :span="22">
      <AppMainMyAlert />
      <AppMainArticle :is-mobile="true" :index-article="articlePage" />
      <el-config-provider size="large" :locale="zh">
        <el-pagination
          v-model:current-page="page.current"
          v-model:page-size="page.size"
          :small="false"
          :disabled="false"
          :background="true"
          layout="total, prev, pager, next"
          :hide-on-single-page="true"
          @size-change="fetchData()"
          @current-change="fetchData()"
          :total="total"
          style="display: flex; justify-content: center; align-content: center"
        />
      </el-config-provider>
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
* {
  --el-text-color-regular: black;
  --el-pagination-font-size: 20px;
  --el-pagination-border-radius: 50%;
}
</style>
