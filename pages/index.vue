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
        <!-- <div style="display: flex;">
            <div style="width: 25%;height: 110vh; background-color: #fff;">
                fsdfsd
            </div>
            <div style="width: 50%;height: 110vh; background-color: green;">
                asdasd
            </div>
            <div style="width: 25%;height: 110vh; background-color: #fff;">
                fsdfsd
            </div>
        </div> -->
        <!-- 
            <AppMainLeft
        -->
    <el-row>
        <el-col :span="6">

            <AppMainLeft   justify="center" />
        </el-col>
        <el-col :span="12">
            <div class="articleCard" style="height: 210vh;">
                <div>
                    <el-alert
                        title="每日一言"
                        description="秦奋六世之余烈,东出灭六国而统一天下！"
                        effect="light"
                        center
                    />
                </div>

            </div>
        </el-col>
        <el-col :span="6">
            <div style="background-color: #fff;height: 110vh;">

            </div>
        </el-col>
    </el-row>
</template>
<style>
body {
    /* https://img2.wallspic.com/previews/8/3/5/6/7/176538/176538-tu_biao-shu_ma_yi_shu-yi_shu-bing_chuan_de_mao-xie_po-x750.jpg */
    background-image: url(https://img2.wallspic.com/previews/8/3/5/6/7/176538/176538-tu_biao-shu_ma_yi_shu-yi_shu-bing_chuan_de_mao-xie_po-x750.jpg);
}
</style>
<style lang="scss" scoped>
.affix-container {
    height: 100vh;
}
.articleCard {
    background-color: green;
}

* {
    // 提示卡片
    --el-alert-title-font-size: 2rem;
    --el-alert-description-font-size: 1.5rem;
    --el-alert-padding: 20px 16px;
}
:deep(.el-alert__description) {
    margin: 15px 0 0 0;
}
:deep(.el-alert__title) {
    display: flex;
    align-items: center; 
    justify-content: center;
}
</style>