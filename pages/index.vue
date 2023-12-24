<script lang="ts" setup>
useHead({
  title: "首页",
});
// AppMainArticle 的css样式
const myStrings = ref(["Wecome To BoCai's Kennel", "欢迎来到菠菜的小窝!"])
</script>

<template>
  <AppMainWelcome :myStrings="myStrings" />
  <el-row style="display: flex; justify-content: center" :gutter="30">
    <el-col :span="12">
      <AppMainMyAlert />
      <AppMainArticle />
      <AppButtom />
    </el-col>
    <el-col :span="5">
      <AppMainRightBlogInfo />
    </el-col>
  </el-row>

</template>
<style lang="scss" scoped>

</style>
