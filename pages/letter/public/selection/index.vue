<script setup lang="ts">
definePageMeta({
  layout: "email",
});
useHead({
  title: "甄选 - 公开信 - 时光邮局",
});
const MyUrl = useRuntimeConfig().public.HTTP_URL;
const { data } = await useAsyncData('selection', () =>
  $fetch(MyUrl + `/blog/email/public/selection/6/1`, { method: "get" })
);
const selectionData = ref(data.value.data)
</script>

<template>
  <div>
    <div style="display: flex; justify-content: center; align-content: center;">
      <div class="affix-container">
        <el-affix target=".affix-container">
          <!-- <AppHeader /> -->
          <AppMyHeader />
        </el-affix>
        <!-- 公开信 -->
        <div class="selection-box">
          <!-- 标语盒子 -->
          <LetterSlogan />
          <!-- 内容 -->
          <LetterLabelText :paginationUrl="'/letter/public/selection'" :total="selectionData.total" :current="selectionData.current" :selectionDate="selectionData.pageData"/>
          <div style="width: 100%;display: flex; justify-content: center">
            <AppButtom :myClass="'MyButtom'" />
          </div>
        </div>
      </div>
    </div>
    <el-backtop :right="40" :bottom="40" :visibility-height="1000" />
  </div>
</template>

<style lang="scss" scoped>
.selection-box {
  width: 1300px;
}
</style>
