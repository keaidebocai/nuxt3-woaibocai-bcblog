<script lang="ts" setup>
definePageMeta({
    layout: 'nothing'
})
const heandleclick = () => {
  ElMessage.success('成功!')
}
const phone = ref(true)
useHead({
    title: '首页'
})
</script>

<template>
    <div class="affix-container">
        <el-affix target=".affix-container">
            <AppHeader />
        </el-affix>
        <div style="
        height: 92vh;
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
    </div>
    <el-backtop :right="40" :bottom="40" :visibility-height="1000" />
    <div style="display: flex;">
        <div style="width: 25%;height: 110vh; background-color: #fff;">
            fsdfsd
        </div>
        <div style="width: 50%;height: 110vh; background-color: green;">
            asdasd
        </div>
        <div style="width: 25%;height: 110vh; background-color: #fff;">
            fsdfsd
        </div>
    </div>
</template>

<style lang="scss" scoped>
.affix-container {
    height: 100vh;
}
</style>