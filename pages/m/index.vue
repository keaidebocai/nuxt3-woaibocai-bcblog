<script setup lang="ts">
definePageMeta({
    layout: 'mobile'
})
useHead({
  title: "首页",
});
const myStrings = ref(["Wecome To<br>BoCai's Kennel", "欢迎来到<br>菠菜的小窝!"])
</script>

<template>
    <AppMainWelcome :myStrings="myStrings" />
    <el-row>
        <el-col :span="22">
            <AppMainMyAlert />
            <AppMainArticle :is-mobile="true" />
            <AppMainRightBlogInfo />
            <AppButtom :is-mobile="true" />
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.el-row {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>