<script lang="ts" setup>
const boom = () => {
  const mydata = {
    articleId: "asdas",
    content: "asdasdasd",
  };
  useMyOtherFetch("/api/blog/comment/sendOneComment", {
    method: "post",
    body: mydata,
  });
};
</script>

<template>
  <el-button @click="boom"></el-button>
</template>
<style lang="scss" scoped></style>
