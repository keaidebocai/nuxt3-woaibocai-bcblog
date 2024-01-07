<script lang="ts" setup>
const tags = [
  { name: "01. 人员招聘难", color: "#006666" },
  { name: "02. 人才复制难", color: "#009999" },
  { name: "03. 门店管理难", color: "#333333" },
  { name: "04. 客户引流难", color: "#660099" },
  { name: "05. 客户不稳定", color: "#990066" },
  { name: "06. 技术门槛高", color: "#CC0099" },
  { name: "07. 营销策划能", color: "#CC3300" },
  { name: "08. 行业内卷利", color: "#FF9900" },
  { name: "09. 产品严重", color: "#006633" },
  { name: "10. 技术项目" }, // color 可以不传，默认黑色
];
</script>

<template>
  <AppMainRightTagCloud width="350" height="400" radius="100" />
</template>
<style lang="scss" scoped></style>
