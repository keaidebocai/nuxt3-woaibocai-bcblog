<script setup lang="ts">
definePageMeta({
  layout: "mobile",
});
useHead({
  title: "首页",
});
const myStrings = ref([
  "Wecome To<br>BoCai's Kennel",
  "欢迎来到<br>菠菜的小窝!",
]);
// import
import { GetIndexArticle } from "~/api/blog/article";
// elementPlus 国际化
import zh from "element-plus/es/locale/lang/zh-cn";
const indexArticle = ref();
const page = ref({
  current: 1,
  size: 3,
});
// 必须初始化值为 number 0 不然 你使用了一些已被废弃的用法，请参考 el-pagination 的官方文档
const total = ref(0);
const fetchData = async () => {
  const { data } = await GetIndexArticle(page.value.current, page.value.size);
  indexArticle.value = data;
  total.value = data.total;
};

// onMounted(() => {
//   fetchData();
// });
if (typeof window !== "undefined") {
  fetchData();
}
</script>

<template>
  <AppMainWelcome :myStrings="myStrings" />
  <el-row>
    <el-col :span="22">
      <AppMainMyAlert />
      <AppMainArticle :is-mobile="true" :index-article="indexArticle" />
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
