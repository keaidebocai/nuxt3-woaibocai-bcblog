<script lang="ts" setup>
useHead({
  title: "首页",
});
// AppMainArticle 的css样式
const myStrings = ref(["Wecome To BoCai's Kennel", "欢迎来到菠菜的小窝!"])
</script>

<template>
  <AppMainWelcome :myStrings="myStrings" />
  <!-- <el-row style="display: flex; justify-content: center" :gutter="30">
    <el-col :span="12">
      <AppMainMyAlert />
      <AppMainArticle />
      <AppButtom />
    </el-col>
    <el-col :span="5">
      <AppMainRightBlogInfo />
    </el-col>
  </el-row> -->
  <div style="height: 100vh;display: flex;justify-content: center;padding: 0 214px;">
    <div>
      <AppMainMyAlert />
      <AppMainArticle />
      <AppButtom />
    </div>
    <div style="margin-left: 30px;">
      <AppMainRightBlogInfo />
    </div>
  </div>

</template>
<style lang="scss" scoped>

</style>
