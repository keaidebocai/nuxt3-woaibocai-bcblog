<script setup lang="ts">
import { MdCatalog } from "md-editor-v3";
import type { TocItem } from "md-editor-v3/lib/types/MdCatalog/MdCatalog";
const props = defineProps(["editorId"]);
const myScrollElement = ref();
const onClick = (e: MouseEvent, t: TocItem) => {
  console.log("我是onclick");
  const newPath = `${location.pathname}#${t.text}`;
  navigateTo({ path: newPath }, { external: true });
};
// onMounted(() => {
//   const scrollElement = document.documentElement;
//   myScrollElement.value = scrollElement;
// });
if (typeof window !== "undefined") {
  const scrollElement = document.documentElement;
  myScrollElement.value = scrollElement;
}
</script>

<template>
  <div class="myCataLog" >
    <div class="title">
      <img src="https://cdn.likebocai.com/bcblog/assets/icon/directory.png" alt="目录" />
      <h2>目录</h2>
    </div>
    <MdCatalog :editorId="props.editorId" :scrollElement="myScrollElement" :scrollElementOffsetTop="10"
      @onClick="onClick" />
  </div>
</template>

<style lang="scss" scoped>
.myCataLog {
  margin-top: 10px;
  min-width: 250px;
  max-width: 400px;
  height: 100%;
  // background-color: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  padding: 1rem 0;

  .title {
    height: 40px;
    display: flex;
    align-items: center;
    margin-left: 20px;

    img {
      height: 32px;
      margin-bottom: 5px;
    }

    h2 {
      font-size: 1.5rem;
      color: rgba(50, 50, 93, 0.8);
    }
  }
}

:deep(.md-editor-catalog) {
  padding: 5px 15px;
}

:deep(.md-editor-catalog-link) {
  span {
    font-size: 1.2rem;
  }
}

@media screen and (max-width: 1281px),
(max-width: 1441px),
(max-width: 1601px),
(max-width: 2441px) {
  .myCataLog {
    max-width: 320px;
  }
}
</style>
