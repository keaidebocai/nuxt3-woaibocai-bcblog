<script lang="ts" setup>
const heandleclick = () => {
  ElMessage.success('成功!')
}

</script>

<template>
<div>
    <div style="width: 100%;height: 100vh;">
      asd
    </div>
    <div class="common-layout">
    <el-container>
      <el-header style="width: 100%;height: 10vh;; background-color: antiquewhite;">
        Header
      </el-header>
      <el-container>
        <el-aside style="width: 300px;height: 90vh;background-color: aqua;">Aside</el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer style="width: 100%;height: 100px; background-color: blue;">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</div>
</template>

<style lang="scss" scoped>

</style>