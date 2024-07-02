<script setup lang="ts">
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
  <div style="display: flex; justify-content: center">
    <div>
      <AppMainMyAlert />
      <AppMainArticle class="article-main" :index-article="articlePage" />
      <el-config-provider size="large" :locale="zh">
        <el-pagination v-model:current-page="page.current" v-model:page-size="page.size" :small="false" :disabled="false"
          :background="true" layout="total, prev, pager, next" :hide-on-single-page="true" @update:page-size="fetchData()"
          @update:current-page="fetchData()" :total="total"
          style="display: flex; justify-content: center; align-content: center" />
      </el-config-provider>
      <AppButtom :my-class="myClass" />
    </div>
    <div style="margin-left: 30px">
      <AppMainRightBlogInfo />
      <div class="tagCloud-box">
        <div class="tagCloud-box-title">
          <img src="https://cdn.likebocai.com/bcblog/assets/icon/tag.png" alt="标签" />
          <h2>标签云</h2>
          (点点标签~)
        </div>
        <AppMainRightTagCloud width="320" height="320" radius="120" style="position: relative; left: 20px; top: -40px" />
      </div>
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
</style>
