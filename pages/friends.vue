<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="item item-1" v-for="i in 18">
      <!-- <div class="asda"></div> -->
      <img class="asda" src="https://qiniu.woaibocai.top/static/img/tou.png" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 80vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, 360px);
  //   grid-template-rows: repeat(auto-fill, 200px 200px);
  row-gap: 10px;
  column-gap: 10px;
}
.item {
  background-color: aquamarine;
  color: white;
  height: 140px;
  min-width: 360px;
  width: 360px;
  border-radius: 25px;
}
.asda {
  height: 140px;
  width: 125px;
  background-color: #fff;
  border-top-right-radius: 70px;
  border-bottom-right-radius: 70px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
</style>
