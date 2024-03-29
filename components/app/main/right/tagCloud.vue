<template>
  <!-- touchmove -->
  <div
    class="cloud"
    :style="{ width: width + 'px', height: height + 'px' }"
    @mousemove="listener"
  >
    <div
      class="cloud-item"
      v-for="cloud of clouds"
      :style="{
        transform: `translate3d(${cloud.x}px,${cloud.y}px,${cloud.z}px) scale(${
          (400 + cloud.z) / 600
        })`,
        opacity: (400 + cloud.z) / 600,
        color: cloud.color,
      }"
    >
      <a
        :href="'/tag/' + cloud.tagUrl"
        :style="{ color: cloud.color, textDecoration: 'none' }"
      >
        {{ cloud.tagName }}
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, reactive } from "vue";
interface Tag {
  tagName: string;
  color?: string;
  tagUrl: string;
}
const tags = ref();
const MyUrl = useRuntimeConfig().public.HTTP_URL;
const { data } = await useAsyncData("tagCloud-tags", () =>
  $fetch(MyUrl + "/blog/info/tagCloud")
);
tags.value = data.value.data;
interface Cloud {
  x: number;
  y: number;
  z: number;
  tagName: string;
  color?: string;
  tagUrl: string;
}

const prop = withDefaults(
  defineProps<{
    // tags: Tag[];
    width?: string; // 宽
    height?: string; // 高
    radius?: string; // 半径
  }>(),
  { width: "600", height: "600", radius: "250" }
);

let speedX = Math.PI / 360;
let speedY = Math.PI / 360;
const clouds: Cloud[] = reactive([]);

// 球心坐标
const CX = computed(() => {
  return parseInt(prop.width) / 3.5;
});
const CY = computed(() => {
  return parseInt(prop.height) / 2;
});

// 创建标签
const createTags = (): Cloud[] => {
  let clouds: Cloud[] = [];
  for (let i = 0, len = tags.value.length; i < len; i++) {
    let k = -1 + (2 * (i + 1) - 1) / len;
    let a = Math.acos(k);
    let b = a * Math.sqrt(len * Math.PI);
    let cloud: Cloud = {
      x: CX.value + +prop.radius * Math.sin(a) * Math.cos(b),
      y: CY.value + +prop.radius * Math.sin(a) * Math.sin(b),
      z: +prop.radius * Math.cos(a),
      tagName: tags.value[i].tagName,
      color: tags.value[i].color || "#333",
      tagUrl: tags.value[i].tagUrl,
    };
    clouds.push(cloud);
  }

  return clouds;
};

clouds.push(...createTags());
// 云球旋转函数-X
const rotateX = (angleX: number) => {
  let cos = Math.cos(angleX);
  let sin = Math.sin(angleX);
  for (let cloud of clouds) {
    let _y = (cloud.y - CY.value) * cos - cloud.z * sin + CY.value;
    let _z = cloud.z * cos + (cloud.y - CY.value) * sin;
    cloud.y = _y;
    cloud.z = _z;
  }
};
// 云球旋转函数-Y
const rotateY = (angleY: number) => {
  let cos = Math.cos(angleY);
  let sin = Math.sin(angleY);
  for (let cloud of clouds) {
    let _x = (cloud.x - CX.value) * cos - cloud.z * sin + CX.value;
    let _z = cloud.z * cos + (cloud.x - CX.value) * sin;
    cloud.x = _x;
    cloud.z = _z;
  }
};

// 定时器
let timer: number;
onMounted(() => {
  timer = setInterval(() => {
    rotateX(speedX);
    rotateY(speedY);
  }, 20);
});
onUnmounted(() => {
  clearInterval(timer);
});

// 手指滑动事件
// const listener = (event: TouchEvent) => {
//   let x = event.touches[0].pageX - CX.value;
//   let y = event.touches[0].pageX - CY.value;
//   speedX =
//     x * 0.0001 > 0
//       ? Math.min(+prop.radius * 0.00002, x * 0.0001)
//       : Math.max(-prop.radius * 0.00002, x * 0.0001);
//   speedY =
//     y * 0.0001 > 0
//       ? Math.min(+prop.radius * 0.00002, y * 0.0001)
//       : Math.max(-prop.radius * 0.00002, y * 0.0001);
// };
// pc
const listener = (event: MouseEvent) => {
  let x = event.clientX - CX.value;
  let y = event.clientY - CY.value;
  speedX =
    x * 0.0001 > 0
      ? Math.min(+prop.radius * 0.00002, x * 0.0001)
      : Math.max(-prop.radius * 0.00002, x * 0.0001);
  speedY =
    y * 0.0001 > 0
      ? Math.min(+prop.radius * 0.00002, y * 0.0001)
      : Math.max(-prop.radius * 0.00002, y * 0.0001);
};
</script>

<style lang="scss" scoped>
.cloud {
  position: relative;
  .cloud-item {
    position: absolute;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 30px;
    transition: all 2s linear;
  }
}
</style>
