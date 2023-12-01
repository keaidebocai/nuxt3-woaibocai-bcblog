<script setup lang="ts">
import { ref } from 'vue'
const activeIndex2 = ref('100')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const goto = ref("/")
</script>
<!-- #545c64 #fff #ffd04b -->
<template>
<client-only>
    <el-menu
    :default-active="activeIndex2"
    class="el-menu-mydemo"
    mode="horizontal"
    background-color="000000"
    text-color="#fff"
    active-text-color="000000"
    @select="handleSelect"
  >
    <el-menu-item index="1" class="blog-title-logo"><img src="https://qiniu.woaibocai.top/static/img/tou.png" style="width: 60px;height: 60px;"/></el-menu-item>
    <el-menu-item index="11"><nuxt-link :to="goto"><h1 class="blog-title">菠菜的小窝</h1></nuxt-link></el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4">Orders</el-menu-item>
  </el-menu>
</client-only>
</template>

<style lang="scss" scoped>
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #fff;
  // 菠菜的小窝选中状态下面横线的颜色
  color: #fff !important;
  background-color: 000000;

}
.blog-title {
  color: #fff;
  font-size: 30px;
}
.blog-title-logo {
  padding: 0 0 0 20px;
}
</style>