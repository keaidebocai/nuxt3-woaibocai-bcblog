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
onMounted(() => {
  const scrollElement = document.documentElement;
  myScrollElement.value = scrollElement;
});
</script>

<template>
  <div class="myCataLog">
    <MdCatalog
      :editorId="props.editorId"
      :scrollElement="myScrollElement"
      :scrollElementOffsetTop="10"
      @onClick="onClick"
    />
  </div>
</template>

<style lang="scss" scoped>
.myCataLog {
  margin-top: 10px;
  min-width: 250px;
  max-width: 400px;
  // height: 500px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  padding: 2vh 0;
}
:deep(.md-editor-catalog) {
  padding: 5px 15px;
}
:deep(.md-editor-catalog-link) {
  font-size: 1rem;
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
