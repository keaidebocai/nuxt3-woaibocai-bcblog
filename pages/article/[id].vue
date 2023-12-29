<script setup lang="ts">
const url = ref("https://www.baidu.com");
</script>

<template>
  <div>
    <Title>{{ $route.params.id }}</Title>

    <a :href="url" target="_blank" alt="asdasdas">asdasdasdasdas</a>
  </div>
</template>

<style lang="scss" scoped></style>
