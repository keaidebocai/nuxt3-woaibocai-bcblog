<script setup lang="ts">
import { ref } from 'vue'
const activeIndex2 = ref('100')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const items = [
  {
    asd: '1',
    qwe: '1-1'
  },
  {
    asd: '2',
    qwe: '2-1'
  }
]
const liginName = ref(true)
const asdasd = () => {
  console.log("asdasdas")
}
</script>
<!-- #545c64 #fff #ffd04b -->
<template>
  <el-row>
    <el-col :span="21">
      <client-only>
      <el-menu
          router
          unique-opened
          mode="horizontal"
          background-color="transparent"
          @select="handleSelect"
        >
        <!-- <el-menu-item index="/" class="blog-title-logo"></el-menu-item> -->
        <el-menu-item style="display: flex;" index="/">
          <img class="blog-title-logo" src="https://qiniu.woaibocai.top/static/img/tou.png"/>
          <h1 class="blog-title">菠菜的小窝</h1>
        </el-menu-item>
        <el-sub-menu style="background-color: transparent !important;" index="/nmsl">
          <template #title><h1 style="color: #fff; font-size: 20px;">分类</h1></template>
            <el-menu-item v-for="item in items" :index="item.asd">
              <p style="font-weight: bolder; font-size: 20px;">
                {{ item.qwe }}
              </p>
            </el-menu-item>
            <!-- <el-menu-item index="2-3">item three</el-menu-item> -->
        </el-sub-menu>
        <el-menu-item v-for="item in items" :index="item.asd">
          <p style="font-weight: bolder; font-size: 20px; color: #fff;">
            {{ item.qwe }}
          </p>
        </el-menu-item>
      </el-menu>
    </client-only>
    </el-col>
    <el-col :span="3">
      <div class="myLogin">
        <p style="font-size: 20px;color: #fff;" link v-show="liginName" @click="asdasd">登录</p>
        <el-dropdown v-show="!liginName">
          <span>
            <el-avatar :size="32" src="https://qiniu.woaibocai.top/static/img/tou.png" />
            <p>hello! likebocai</p>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>编辑</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.myLogin {
  height: 8vh;
  display: flex;
  align-items: center; 
  justify-content: center;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 0;
  // 菠菜的小窝选中状态下面横线的颜色
  color: #fff !important;
  background-color: transparent !important;

}
.blog-title {
  color: #fff;
  font-size: 30px;
}
.blog-title-logo {
  width: 8vh;
  height: 8vh;
  padding-right: 20px;

}
.el-menu--horizontal ul {
  margin-bottom: 0;
}
* {
  cursor: url(https://cdn.woaibocai.top/bcblog/assets/cursor/help.cur), pointer;
}
:deep(.el-menu--horizontal.el-menu) {
  border-bottom: solid 10px 0 !important;
}
// 菜单栏下面的border
.el-menu--horizontal.el-menu {
  border-bottom: 0;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  outline: 0;
  color: #fff;
  background-color: transparent;
}
// .el-menu-item:hover {
//   background-color: red;
// }
.el-menu--horizontal .el-menu .el-menu-item:hover {
  background-color: transparent !important;
  color: green;
}
.el-dropdown-link {
    display: flex;
    justify-content: center;
    align-items: center;
}
* {
  // 菜单栏的宽度
  --el-menu-horizontal-height: 8vh; 
  --el-menu-bg-color: transparent;
  --el-menu-hover-bg-color: transparent;
}
</style>