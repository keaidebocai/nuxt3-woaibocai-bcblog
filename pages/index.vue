<script lang="ts" setup>
definePageMeta({
    layout: 'nothing',
})
useHead({
  title: "首页",
});
// AppMainArticle 的css样式
const myStrings = ref(["Wecome To BoCai's Kennel", "欢迎来到菠菜的小窝!"])
</script>

<template>
  <div>
    <div style="display: flex;justify-content: center;align-content: center;">
        <div class="affix-container">
          <el-affix target=".affix-container">
            <AppHeader/>
          </el-affix>
          <AppMainWelcome :myStrings="myStrings" />
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
</style>
