<script setup lang="ts">
// 菜单图标显示的控制
const showIcon = ref(false);
const showSearch = ref(false);
const searchData = ref("");
</script>

<template>
  <div>
    <div class="affix-container">
      <el-affix target=".affix-container">
        <div class="mobile-menu">
          <div class="mobile-menu-left" @click="showIcon = !showIcon">
            <ElIconFold v-show="!showIcon" style="width: 6vw" />
            <ElIconExpand v-show="showIcon" style="width: 6vw" />
          </div>
          <div class="mobile-menu-title">
            <h1><a href="/">菠菜的小窝</a></h1>
          </div>
          <div class="mobile-menu-right" @click="showSearch = !showSearch">
            <ElIconSearch style="width: 6vw" />
          </div>
        </div>
      </el-affix>
      <ClientOnly>
        <el-drawer
          size="80%"
          direction="ltr"
          v-model="showIcon"
          :lock-scroll="false"
          :with-header="false"
        >
          <AppMainRightBlogInfo />
        </el-drawer>
        <el-drawer
          class="searchDrawer"
          size="20%"
          direction="ttb"
          v-model="showSearch"
          :lock-scroll="false"
          :with-header="false"
        >
          <div class="searchDrawer-inputDiv">
            <el-input
              v-model="searchData"
              placeholder="搜索点什么..."
              type="text"
              size="large"
              :prefix-icon="ElIconSearch"
              :suffix-icon="ElIconRight"
            />
          </div>
        </el-drawer>
      </ClientOnly>
      <slot />
    </div>
  </div>
  <el-backtop :right="40" :bottom="40" :visibility-height="500" />
</template>
<style>
body {
  background-image: url(https://picx.zhimg.com/80/v2-c472b1d9064f724efe138ebcdc317a18_720w.webp?source=1def8aca);
}
</style>
<style lang="scss" scoped>
.affix-container {
  height: 100vh;
}
.mobile-menu {
  display: flex;
  background-color: rgba(255, 255, 255, 0.3);
  color: rgba($color: #000000, $alpha: 0.6);
  margin-bottom: 10px;
  .mobile-menu-left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15vw;
    height: 8vh;
  }
  .mobile-menu-title {
    height: 8vh;
    width: 70vw;
    font-size: 3vh;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      a {
        font-size: 3vh;
        color: rgba($color: #000000, $alpha: 0.6);
        text-decoration: none;
      }
    }
  }
  .mobile-menu-right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 8vh;
    width: 15vw;
  }
}
:deep(.el-input--large) {
  font-size: 1rem;
}
:deep(.el-drawer__body) {
  flex: 1;
  padding: 10px;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.searchDrawer {
  display: flex;
  align-items: center;
  justify-content: center;
  .searchDrawer-inputDiv {
    height: 10vh;
    width: 80vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
* {
  --el-bg-color: rgba(255, 255, 255, 0.6);
  --el-input-height: 3rem;
  --el-input-border-radius: 1.5rem;
  .appRightMyInfo {
    background-color: transparent;
  }
}
</style>
