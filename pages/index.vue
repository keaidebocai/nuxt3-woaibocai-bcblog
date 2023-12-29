<script lang="ts" setup>
definePageMeta({
  layout: "nothing",
});
useHead({
  title: "首页",
});
// import
import { GetIndexArticle } from "~/api/blog/article";
// elementPlus 国际化
import zh from "element-plus/es/locale/lang/zh-cn";
// AppMainArticle 的css样式
const myStrings = ref(["Wecome To BoCai's Kennel", "欢迎来到菠菜的小窝!"]);
const indexArticle = ref();
const page = ref({
  current: 1,
  size: 5,
});
// 必须初始化值为 number 0 不然 你使用了一些已被废弃的用法，请参考 el-pagination 的官方文档
const total = ref(0);
const fetchData = async () => {
  const { data } = await GetIndexArticle(page.value.current, page.value.size);
  indexArticle.value = data;
  total.value = data.total;
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <div style="display: flex; justify-content: center; align-content: center">
      <div class="affix-container">
        <el-affix target=".affix-container">
          <AppHeader />
        </el-affix>
        <AppMainWelcome :myStrings="myStrings" />
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
            <AppMainArticle :index-article="indexArticle" />
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
                style="
                  display: flex;
                  justify-content: center;
                  align-content: center;
                "
              />
            </el-config-provider>

            <AppButtom />
          </div>
          <div style="margin-left: 30px">
            <AppMainRightBlogInfo />
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
</style>
