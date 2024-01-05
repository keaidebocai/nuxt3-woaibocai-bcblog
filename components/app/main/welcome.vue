<script setup lang="ts">
// 打字机效果
import { Typed } from "@duskmoon/vue3-typed-js";
import type { TypedOptions } from "@duskmoon/vue3-typed-js";
const props = defineProps(["myStrings"]);
const options: TypedOptions = {
  strings: props.myStrings,
  loop: false, //true 是否循环
  showCursor: false, //是否显示光标
  typeSpeed: 70, //打字速度
  backSpeed: 50, //删字速度
  backDelay: 1000, //打完一句停留多久
};
</script>

<template>
  <div class="MyWelcome">
    <div
      style="font-weight: bold; font-size: 5vh; color: rgba(255, 255, 255, 0.8)"
    >
      <!-- <p>暂时预留模块</p> -->
      <Typed :options="options">
        <p class="typing"></p>
      </Typed>
    </div>
    <br />
    <ElIconArrowDownBold
      style="width: 2vh; position: absolute; bottom: 2vh; color: #fff"
    />
  </div>
</template>

<style lang="scss" scoped>
.MyWelcome {
  height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
