<script setup lang="ts">
const props = defineProps(["data"]);
const data = ref();
data.value = props.data;
</script>

<template>
  <div class="info-box">
    <div>
      <div class="info-box-title">
        <h1>{{ data.tagName }}</h1>
      </div>
      <div class="info-box-remark">
        <h2>{{ data.remark }}</h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info-box {
  width: 100%;
  height: calc(50vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  .info-box-title {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    h1 {
      font-size: 4rem;
      color: rgba(50, 50, 93, 0.6);
    }
  }
  .info-box-remark {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      font-size: 1.8rem;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
