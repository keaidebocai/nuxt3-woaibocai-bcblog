<script setup lang="ts">
definePageMeta({
  layout: "mobile",
});
// import
useHead({
  title: "甄选 - 公开信 - 时光邮局 - 时光信箱",
  meta: [
    {
      hid: "keywords",
      name: "keywords",
      content: "时光邮箱，时光信箱，菠菜的时光邮局，菠菜的小窝",
    },
  ],
});
const MyUrl = useRuntimeConfig().public.HTTP_URL;
const route = useRoute()
const { data } = await useAsyncData('selection', () =>
  $fetch(MyUrl + `/blog/email/public/selection/3/${route.params.id}`, { method: "get" })
);
const selectionData = ref(data.value.data)
</script>

<template>
  <el-row>
    <el-col :span="22">
      <div style="width: 93vw;display: flex;justify-content: center;">
        <div style="width: 100%;">
          <!-- 标语盒子 -->
          <LetterMSlogan />
          <!-- 内容 -->
          <LetterMLabelText :paginationUrl="'/m/letter/public/selection'" :total="selectionData.total" :current="selectionData.current"
            :selectionDate="selectionData.pageData" />
        </div>
      </div>
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
</style>
