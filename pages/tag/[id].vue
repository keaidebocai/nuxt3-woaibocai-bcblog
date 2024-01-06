<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div style="display: flex; justify-content: center">
    <div>
      <AppMainMyAlert />
      {{ route.params.id }}
      <!-- <AppMainArticle /> -->
      <AppButtom :my-class="'MyButtom'" />
    </div>
    <div style="margin-left: 30px">
      <AppMainRightBlogInfo />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
