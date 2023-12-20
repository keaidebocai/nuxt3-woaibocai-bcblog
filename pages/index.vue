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
const items = [{name: 1},{name: 2},{name: 3},{name: 4}]
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
    <el-row style="display:flex;justify-content: center;" :gutter="30">
        <el-col :span="10">
            <div class="articleCard" >
                <div>
                    <el-alert
                        title="每日一言"
                        description="秦奋六世之余烈,东出灭六国而统一天下！"
                        effect="light"
                        center
                    />
                </div>
                <div  v-for="item in items" class="articleCard-box">
                    <!-- <div class="articleCard-box-left"></div> -->
                    <!-- https://img.zhisheji.com/bbs/forum/201401/05/153945tbr7pg5torfzptso.jpg -->
                    <!-- https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg -->
                    <el-image class="articleCard-box-left" fit="fill" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
                        <template #error>
                            <div class="image-slot">
                                <ElIconPicture />
                                <p>哎呀!图片不见啦!</p>
                            </div>
                        </template>
                    </el-image>
                    <div class="articleCard-box-right">
                        <div class="articleCard-box-right-top">
                            <p class="articleCard-box-right-top-title">关于nuxt3奴有的解读与记录</p>
                            <p>{{ item.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="4">
            <div style="border-radius: 20px; background-color: #fff;height: 110vh;">

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
    // background-color: green;
    .articleCard-box {
        width:100%;
        height: 25vh;
        display:flex;
        padding: 10px 0;
        .articleCard-box-left {
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            height: 25vh;
            width:40%;
            background-color: #fff;
            // 图片加载失败的图标
            display: flex;
            justify-content: center;
            align-items: center;
            color: #909399;
            background-color: #f5f7fa;
            .image-slot {
                width: 10vh;
                font-size: 0.8rem;
            }
        }
        .articleCard-box-left:hover {
            width: 44.4vh;
            height: 25vh;
            border-radius: 20px;
            z-index: 1;
            transform: scale(1.05);
        }
        .articleCard-box-right {
            border-bottom-right-radius: 20px;
            border-top-right-radius: 20px;
            background-color: aquamarine;
            height: 25vh;
            width: 60%;
            .articleCard-box-right-top {
                border-top-right-radius: 20px;
                display:flex;
                align-items: center;
                justify-content: center;
                background-color: blue;
                height: 5vh;
                .articleCard-box-right-top-title {
                    font-size: 1.5rem;
                }
            }
        }
    }
    .articleCard-box:hover {
        padding: 0;
        margin: 10px 0;
        border-radius: 20px;
        box-shadow: 5px 5px 5px 5px rgba(0,0,0,.3);
        transform: scale(1.03);
        .articleCard-box-right {
            position: absolute;
            right: 0;
        }
    }
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
:deep(.el-alert) {
    margin-bottom: 15px;
    border-radius: 10px;
}
:deep(.el-alert:hover) {
    border-radius: 10px;
    box-shadow: 5px 5px 5px 2px rgba(0,0,0,.3);
}
</style>