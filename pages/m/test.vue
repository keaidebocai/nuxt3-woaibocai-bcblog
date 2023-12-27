<script setup lang="ts">
definePageMeta({
    layout: 'mobile'
})
useHead({
  title: "test",
});
</script>

<template>
    <el-row>
        <el-col :span="22">
            <AppMainMyAlert />
            <AppMainArticle :is-mobile="true" />
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
