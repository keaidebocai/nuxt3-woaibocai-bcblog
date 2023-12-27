<script setup lang="ts">
const MyStrings = ref([
  "大丈夫岂能郁郁久居人下!&emsp;--吕布",
  "匹夫!死则死尔,何惧之有!&emsp;--张辽",
  "为人者有大度成大气也!&emsp;--司马懿",
  "我的剑也未尝不利!&emsp;--袁绍",
  "袁神歧董!",
  "出生寒微不是耻辱,能屈能伸方为丈夫!&emsp;--邓艾",
  "秦奋六世之余烈,东出灭六国而统一天下!",
  "受命于天,既寿永昌。"
]);
// 打字机效果
import { Typed } from "@duskmoon/vue3-typed-js";
import type { TypedOptions } from "@duskmoon/vue3-typed-js";
const options1: TypedOptions = {
  strings: MyStrings.value,
  loop: true,//true 是否循环
  showCursor: false,//是否显示光标
  typeSpeed: 150, //打字速度
  backSpeed: 70, //删字速度
  backDelay: 2500 //打完一句停留多久
};
</script>

<template>
    <div>
        <el-alert
         title="每日一言"
         description="秦奋六世之余烈,东出灭六国而统一天下！"
         effect="light"
         center
        >
            <div style="height: 2rem;">
                <Typed :options="options1">
                    <p class="typing"></p>
                </Typed>
            </div>
        </el-alert>
    </div>
</template>

<style lang="scss" scoped>
* {
  // 提示卡片
  --el-alert-title-font-size: 2rem;
  --el-alert-description-font-size: 2vh;
  --el-alert-padding: 20px 16px;
  //
  --el-badge-font-size: 1vh;
  --el-color-info: rgba(0,0,0,0.5);
}
:deep(.el-alert__description) {
  margin: 15px 0 0 0;
  text-align: center;
}
:deep(.el-alert__title) {
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.el-alert) {
  background-color: rgba(255,255,255, 0.6);
  margin-bottom: 15px;
  border-radius: 10px;
}
:deep(.el-alert:hover) {
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.3);
  transform: scale(1.03);
}
</style>
