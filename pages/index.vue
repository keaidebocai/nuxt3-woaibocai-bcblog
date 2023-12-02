<script lang="ts" setup>
const heandleclick = () => {
  ElMessage.success('成功!')
}
</script>

<template>
    <div style="
      height: 100vh;
      width: 100%;
      display: flex;
      align-items: center; 
      justify-content: center;">
      <div 
        style="
        font-size: 5rem;
        color: #fff;
        ">
            <p>
                暂时预留模块
            </p>
      </div>
      <br/>
      <ElIconArrowDownBold style="width: 2rem;position: absolute;bottom: 2rem;color: #fff;"/>
    </div>
<!-- <div style="width: 100%;height: 20vh;">
        <div 
        style="
        font-size: 5rem;
        color: #fff;
        display: flex;
        align-items: center; 
        justify-content: center;">
            <p >
                暂时预留模块
            </p>
        </div>
    </div> -->
    <div style="display: flex;">
        <div style="width: 25%;height: 80vh; background-color: #fff;">
            fsdfsd
        </div>
        <div style="width: 50%;height: 80vh; background-color: green;">
            asdasd
        </div>
        <div style="width: 25%;height: 80vh; background-color: #fff;">
            fsdfsd
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>