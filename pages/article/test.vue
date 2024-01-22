<script lang="ts" setup></script>

<template>
  <div class="container">
    <div class="item item-1">1</div>
    <div class="item item-2">2</div>
    <div class="item item-3">3</div>
    <div class="item item-4">4</div>
    <div class="item item-5">5</div>
    <div class="item item-6">6</div>
    <div class="item item-7">7</div>
    <div class="item item-8">8</div>
    <div class="item item-9">9</div>
    <div class="item item-10">10</div>
    <div class="item item-11">11</div>
    <div class="item item-12">12</div>
    <div class="item item-13">13</div>
    <div class="item item-3">3</div>
    <div class="item item-4">4</div>
    <div class="item item-5">5</div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 80vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-template-rows: repeat(3, 200px 200px);
  row-gap: 10px;
  column-gap: 10px;
}
.item {
  font-size: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-1 {
  background-color: #55efc4;
}
.item-2 {
  background-color: #81ecec;
}
.item-3 {
  background-color: #74b9ff;
}
.item-4 {
  background-color: #a29bfe;
}
.item-5 {
  background-color: #00b894;
}
.item-6 {
  background-color: #0984e3;
}
.item-7 {
  background-color: #6c5ce7;
}
.item-8 {
  background-color: #fab1a0;
}
.item-9 {
  background-color: #fdcb6e;
}
.item-10 {
  background-color: #fd79a8;
}
.item-11 {
  background-color: #00b894;
}
.item-12 {
  background-color: #0984e3;
}
.item-13 {
  background-color: #6c5ce7;
}
</style>
