<script setup lang="ts">

definePageMeta({
    layout: "email",
});
useHead({
    title: "2024年写给未来菠菜的一封信 - 公开信 - 时光邮局",
});

import { MdPreview } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
const id = 'preview-only';
const text = ref('#### Hello Editor\n  **<p style="color:red;">亲爱的旅人：</p>**\n<div style="width:100%;text-align:center;margin-bottom: 20px;"><img width="400px" style="border-radius: 15px;box-shadow: 0px 0px 5px #b1b3b8;" src="https://cdn.likebocai.com/bcblog/public/src/tou.png"></div>\n当你看见这封信的时候我已经将菠菜的时光邮局开发出来了\n我开发时光邮局的目的很简单！\n\n1.人是感性的\n2.我想看看别人的故事');
const MyUrl = useRuntimeConfig().public.HTTP_URL;
const route = useRoute()
const { data } = await useAsyncData('selection', () =>
    $fetch(MyUrl + `/blog/email/public/text/${route.params.id}`, { method: "get" })
);
const textData = ref(data.value.data)
const errorHandler = () => true

import { LikeEmailContent } from '~/api/email/user'
const isLike = ref(true)
const likeEmailContentMethods = async(id: string) => {
    await LikeEmailContent(id)
    .then(res => {
        if(res.code == 200) {
            isLike.value = false
            ElMessage.success("点赞成功！")
        }
    })
    .catch(err => {
        ElMessage.error("网络异常！")
    })
}
</script>

<template>
    <div>
        <div style="display: flex; justify-content: center; align-content: center;">
            <div class="affix-container">
                <el-affix target=".affix-container">
                    <!-- <AppHeader /> -->
                    <AppMyHeader />
                </el-affix>
                <!-- 公开信 -->
                <div class="text-box">
                    <!-- 内容 -->
                    <div class="text-looking-box">
                        <!-- 内容展示 -->
                        <div class="text-looking">
                            <div class="text-looking-text">
                                <!-- 标题 -->
                                <div style="display: flex;align-items: center;justify-content: center;height: 60px;">
                                    <p style="font-size: 28px;font-weight: bolder;">{{ textData.title }}</p>
                                    <div class="isSend" v-if="textData.isDelivery == 'Y'">
                                        <p>已投递</p>
                                    </div>
                                    <div v-else class="isSend" style="background-color: #fcd3d3;border: 1px solid #c45656;">
                                        <p style="color: #F56C6C;">待投递</p>
                                    </div>
                                </div>
                                <div v-if="textData.isPublic == 'N'"
                                    style="height: 30px;background-color: #fde2e2;border: 1px solid red;border-radius: 10px;display: flex;align-items: center;margin: 5px 0px;">
                                    <p style="font-size: 18px;margin: 0px 10px;color:  #c45656;">
                                        ⭐ 此信为私密信件，只有寄信人和收信人可以在到达投递日后知晓此信件地址
                                    </p>
                                </div>
                                <!-- 发送人信息 -->
                                <div class="text-looking-text-senderInfo">
                                    <el-avatar :size="50" :src="textData.url"  @error="errorHandler">
                                        <img src="~/assets/error-avatar.png" />
                                    </el-avatar>
                                    <p style="font-size: 22px;color: #6b7280;margin-left: 10px;font-weight: bold;">
                                        {{ textData.nickName }}</p>
                                </div>
                                <!-- 发送时间 -->
                                <div class="text-looking-text-sendTime">
                                    <IconEmailNo :size="28" />
                                    <p style="font-size: 16px;margin: 0px 15px 0px 5px;color: #6b7280;">
                                        书写于&nbsp;{{ textData.writingDate.slice(0,16).replace("T","日").replace("-","年").replace("-","月") }}</p>
                                    <IconEmailTime :size="28" />
                                    <p style="font-size: 16px;margin: 0px 15px 0px 5px;color: #6b7280;">经历{{ textData.useTime }}天</p>
                                    <IconEmailOpen :size="28" />
                                    <p style="font-size: 16px;margin: 0px 15px 0px 5px;color: #6b7280;">
                                        已于&nbsp;{{ textData.deliveryDate.slice(0,16).replace("T","日").replace("-","年").replace("-","月") }}&nbsp;投递</p>
                                </div>
                                <!-- 开始分隔符 -->
                                <div style="display: flex;justify-content: center;align-items: center;height: 60px;">
                                    <hr style="width: calc(50% - 100px);border-top: 1px solid #7e8e9b;margin-right: 10px;">
                                    <IconNowDelivery />
                                    <p style="font-size: 16px;color: #7e8e9b;margin-left: 5px;">书信内容</p>
                                    <hr style="width: calc(50% - 100px);border-top: 1px solid #7e8e9b;margin-left: 10px;">
                                </div>
                                <!-- 发送内容 -->
                                <div class="text-looking-text-sendText">
                                    <MdPreview previewTheme="vuepress" :editorId="id" :modelValue="textData.content" />
                                </div>
                                <!-- 就此搁笔 -->
                                <div class="text-looking-text-end-box">
                                    <hr
                                        style="width: calc(50% - 100px);border-top: 1px solid #005293;margin-right: 10px;">
                                    <IconWriteLetters />
                                    <p style="font-size: 16px;color: #005293;">就此搁笔</p>
                                    <hr
                                        style="width: calc(50% - 100px);border-top: 1px solid #005293;margin-left: 10px;">
                                </div>
                                <!-- 赞 -->
                                <div class="text-looking-text-love-box">
                                    <div @click="likeEmailContentMethods(textData.id)" class="selection-letters-text-item-bottom-button" v-if="isLike">
                                        &nbsp;赞&nbsp;🩵&nbsp;{{ textData.likeCount }}
                                    </div>
                                    <div class="selection-letters-text-item-bottom-button-love" v-else>
                                        &nbsp;已赞&nbsp;❤️&nbsp;{{ Number(textData.likeCount) + 1}}&nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 随机翻一页和去写一封 -->
                        <div class="text-goWriting-goLooing">
                            <div class="text-goWriting-goLooing-left">
                                <a :href="`/letter/text/${textData.id}`"
                                    class="text-goWriting-goLooing-left-button">
                                    <IconEmailOpen />
                                    <p style="font-size: 24px;margin-left: 10px;color: #fff;">随机看一封</p>
                                </a>
                            </div>
                            <div class="text-goWriting-goLooing-right">
                                <a href="/letter/writeLetter"
                                    class="text-goWriting-goLooing-right-button">
                                    <p style="font-size: 24px;margin-right: 10px;color: #fff;">去写一封</p>
                                    <IconWriteEmail />
                                </a>
                            </div>
                        </div>

                        <!-- 评论及其展示 -->
                        <!-- <div class="text-comment-box">

                        </div> -->
                    </div>


                </div>
                <div style="width: 100%;display: flex; justify-content: center">
                    <AppButtom :myClass="'MyButtom'" />
                </div>
            </div>
        </div>
        <el-backtop :right="40" :bottom="40" :visibility-height="1000" />
    </div>
</template>

<style>
.text-looking-text-sendText .md-editor {
    --md-bk-color: none;
}

.text-looking-text-sendText .md-editor-preview-wrapper {
    padding: 0px 60px;
}
</style>

<style lang="scss" scoped>
.text-box {
    width: 1300px;
    display: flex;
    justify-content: center;

    .text-looking-box {
        width: 1000px;
        margin-top: 30px;

        .text-looking {
            width: 100%;
            background-color: rgba($color: #fff, $alpha: 0.8);
            border-radius: 15px;
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0px 0px 5px #dcfce7;

            .text-looking-text {
                margin-top: 30px;
                width: calc(100% - 60px);
                margin: 15px 15px;

                .isSend {
                    background-color: #dcfce7;
                    width: 60px;
                    height: 30px;
                    border-radius: 15px;
                    margin-left: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    p {
                        font-size: 16px;
                        color: #15803d;
                    }
                }

                .text-looking-text-senderInfo {
                    width: 100%;
                    height: 60px;
                    display: flex;
                    align-items: center;
                }

                .text-looking-text-sendTime {
                    width: calc(100% - 60px);
                    height: 32px;
                    margin-left: 60px;
                    display: flex;
                    align-items: center;
                }

                .text-looking-text-sendText {
                    width: 100%;
                }

                .text-looking-text-end-box {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 60px;
                }

                .text-looking-text-love-box {
                    width: 100%;
                    height: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .selection-letters-text-item-bottom-button {
                        background-color: #eff6ff;
                        color: #1d4ed8;
                        min-width: 70px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        font-size: 18px;
                        justify-content: center;
                        border-radius: 5px;
                        box-shadow: 0px 0px 2px #7696be;
                        padding: 0 5px;
                        cursor: pointer;
                        transition: 0.5s;
                    }

                    .selection-letters-text-item-bottom-button-love {
                        background-color: #fde2e2;
                        color: #d8331d;
                        min-width: 80px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        font-size: 18px;
                        justify-content: center;
                        border-radius: 5px;
                        box-shadow: 0px 0px 2px #d13030;
                        padding: 0 5px;
                        cursor: pointer;
                    }

                    .selection-letters-text-item-bottom-button:hover {
                        transform: scale(1.1);
                    }
                }
            }

        }

        // 随机写一篇
        .text-goWriting-goLooing {
            width: 100%;
            height: 50px;
            margin-bottom: 30px;
            display: flex;

            .text-goWriting-goLooing-left {
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                .text-goWriting-goLooing-left-button {
                    height: 100%;
                    border-radius: 20px;
                    padding: 0 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #79bbff;
                    border: 1px solid #409EFF;
                    cursor: pointer;
                    transition: 0.5s;
                    text-decoration: none;
                }

                .text-goWriting-goLooing-left-button:hover {
                    transform: scale(1.1);
                }
            }

            .text-goWriting-goLooing-right {
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                .text-goWriting-goLooing-right-button {
                    height: 100%;
                    border-radius: 20px;
                    padding: 0 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #79bbff;
                    border: 1px solid #409EFF;
                    cursor: pointer;
                    transition: 0.5s;
                    text-decoration: none;
                }

                .text-goWriting-goLooing-right-button:hover {
                    transform: scale(1.1);
                }
            }
        }

        // 留言及评论
        .text-comment-box {
            width: 100%;
            height: 300px;
            background-color: azure;

        }
    }
}
</style>
