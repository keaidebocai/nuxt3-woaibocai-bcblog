<script setup lang="ts">
definePageMeta({
    layout: "mobile",
});
useHead({
    title: "站点事记",
});
</script>

<template>
    <el-row>
        <el-col :span="22">
            <AppMainMyAlert />
            <div style="display: flex; justify-content: center">
                <div class="history-looking-box">
                        <div class="history-looking">
                            <el-timeline style="max-width: 800px;">
                                <el-timeline-item center timestamp="2023-12-24" placement="top">
                                    <el-card style="border-radius: 15px;">
                                        <div style="display: flex;">
                                            <h4>站点更名：&nbsp;</h4>
                                            <h4 style="color: red;">菠菜的小窝</h4>
                                        </div>
                                        <div style="display: flex;">
                                            <h4>网址：&nbsp;</h4>
                                            <a href="https://www.likebocai.com" target="_blank"
                                                style="color: red;">https://www.likebocai.com</a>
                                        </div>
                                        <div style="display: flex;">
                                            <h5>版本：</h5>
                                            <p>v2.0.0.231224_likebocai</p>
                                        </div>
                                        <hr style="border-top: 1px solid black;margin: 5px 0;">
                                        <p>前后端全部重写与设计</p>
                                        <h5>主要优化与改进：</h5>
                                        <h5 style="color: red;">前端：</h5>
                                        <p>&emsp;1.文本使用MarkDown的形式储存与展示</p>
                                        <p>&emsp;2.全站模块组件化并使用NUXT3框架利于SSR</p>
                                        <p>&emsp;3.添加RSS订阅以及添加站点地图</p>
                                        <h5>前端技术栈：</h5>
                                        <p>&emsp;Vue3、Nuxt3、Element-Plus、vue-router、pinia、types/rss、nuxtjs/sitemap、md-editor-v3、pm2、还有一个装在我身上的爱因斯坦的大脑！
                                        </p>
                                        <h5 style="color: red;">后端：</h5>
                                        <p>&emsp;1.使用微服务架构接口全都交给gateway处理，细分模块以便后面网站功能的拓展。</p>
                                        <p>&emsp;2.接入腾讯云cos，将静态资源与用户上传的图片存储与管理。</p>
                                        <p>&emsp;3.接入QQ邮箱，用于用户的注册与忘记密码操作</p>
                                        <p>&emsp;4.使用redis进行缓存与锁操作，包括但不限于用户密码错误后封禁5分钟……</p>
                                        <h5>后端技术栈：</h5>
                                        <p>&emsp;SpringBoot3、SpringCloud
                                            Alibaba、Nacos、Gateway、OpenFeign、Mybatis、腾讯云cos、JavaEmail、redis、Mysql、nginx
                                        </p>
                                        <h4 style="color: red;">项目太简单了，以至于开发神速，但是架构设计为网站的拓展提供可能</h4>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item center timestamp="2023-12-11" placement="top">
                                    <el-card style="border-radius: 15px;">
                                        <div style="display: flex;">
                                            <h4>购买域名</h4>
                                            <p style="color: red;">likebocai.com</p>
                                        </div>
                                        <hr style="border-top: 1px solid black;margin: 5px 0;">
                                        <p>其实很早就已经开始学这些东西，只不过我现在没东西写了……</p>
                                        <br>
                                        <p style="color: red;">前端：</p>
                                        <p>&emsp;学习更加利于SSR的前端框架NUXT3</p>
                                        <p style="color: red;">后端：</p>
                                        <p>&emsp;学习基于SpringCloud的微服务架构，为多个模块的划分与延展打了基础。</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="2023-06-08" placement="top">
                                    <el-card style="border-radius: 15px;">
                                        <div style="display: flex;">
                                            <h4>创建了站点：&nbsp;</h4>
                                            <h4 style="color: red;">菠菜的博客</h4>
                                        </div>

                                        <div style="display: flex;">
                                            <h5>版本：</h5>
                                            <p>v1.0.0.230608_woaibocai</p>
                                        </div>
                                        <hr style="border-top: 1px solid black;margin: 5px 0;">
                                        <p>前端是别人写的，后端自己敲的，主要功能就是博客文章的展示和后端的管理系统。</p>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                    </div>
            </div>

            <AppButtom :is-mobile="true" :my-class="'MyButtomMobile'" />
        </el-col>
    </el-row>
</template>

<style>
.history-looking-box .el-timeline-item__timestamp.is-top {
    font-size: 18px;
    color: black;
}

.history-looking-box .el-timeline {
    font-size: 18px;
    color: #73767a;
}
</style>

<style lang="scss" scoped>
.el-row {
    display: flex;
    align-items: center;
    justify-content: center;
}
.container {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(2, 360px);
    //   grid-template-rows: repeat(auto-fill, 200px 200px);
    row-gap: 20px;
    column-gap: 60px;
    padding: 20px 10px;
    border-radius: 25px;
    background-color: rgba(255, 255, 255, 0.4);
}

.affix-container {
    width: 100%;
    height: 100vh;
}
.history-looking-box {
    width: 100%;
    background-color: rgba($color: #fff, $alpha: 0.3);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    .history-looking {
        width: 80%;
        margin: 40px 0px;
    }
}
</style>