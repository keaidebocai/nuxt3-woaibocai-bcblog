<script lang="ts" setup>
import { MdPreview } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
import { useRoute } from 'vue-router';
const id = 'preview-only';
const text = ref('#### Hello Editor\n  **<p style="color:red;">亲爱的旅人：</p>**\n当你看见这封信的时候我已经将菠菜的时光邮局开发出来了\n我开发时光邮局的目的很简单！\n\n1.人是感性的\n2.我想看看别人的故事');

// 路由
const route = useRoute()
const sloganTypeMethod = (type: string) => {
    if (route.fullPath.match(type)) return "opacity: 1;font-size: 1rem;font-weight: bolder;";
    return "font-size: 0.9rem;";
}
const props = defineProps(['paginationUrl', 'total', 'current', 'selectionDate'])
const likeElMessage = () => {
    ElMessage.info("请进入信件详细界面进行点赞！")
}
</script>

<template>
    <div class="selection-letters-box">
        <div class="selection-letters">
            <!-- 标签页-页头 -->
            <div class="selection-letters-label-box">
                <div class="selection-letters-label">
                    <a href="/m/letter/public/selection" class="selection-letters-label-item"
                        :style="sloganTypeMethod('selection')">
                        <IconSelection />
                        <p style="margin-left: 5px;">甄选信</p>
                    </a>
                    <a href="/m/letter/public/writing" class="selection-letters-label-item" style="margin: 0 auto;"
                        :style="sloganTypeMethod('writing')">
                        <IconNowDelivery :size="28" />
                        <p style="margin-left: 5px;">最新书写</p>
                    </a>
                    <a href="/m/letter/public/delivery" class="selection-letters-label-item"
                        :style="sloganTypeMethod('delivery')">
                        <IconNowWrite :size="28" />
                        <p style="margin-left: 5px;">最新投递</p>
                    </a>
                </div>
            </div>
            <!-- 信件内容 -->
            <div class="selection-letters-text-box">
                <div class="selection-letters-text">
                    <div class="selection-letters-text-item-box" v-for="item in props.selectionDate">
                        <div class="selection-letters-text-item">
                            <!-- 投递状态和间隔时间 -->
                            <div class="selection-letters-text-item-delivery-box">
                                <div style="display: flex;align-items: center;" v-if="item.isDelivery == 'Y'">
                                    <IconService />
                                    <p style="margin-left: 5px;font-size: 18px;">已投递·跨越{{ item.useTime }}的时光</p>
                                </div>
                                <div style="display: flex;align-items: center;" v-else>
                                    <IconDelivering />
                                    <p style="margin-left: 5px;font-size: 18px;">正在{{ item.useTime }}的时光旅行中...</p>
                                </div>
                            </div>
                            <!-- 信件标题 -->
                            <div class="selection-letters-text-item-title">
                                <p style="font-size: 1.4rem;">{{ item.title }}</p>
                            </div>
                            <!-- 信件内容 -->
                            <a target="_blank" :href="`/m/letter/text/${item.id}`"
                                class="selection-letters-text-item-text">
                                <MdPreview previewTheme="vuepress" :editorId="id" :modelValue="item.content" />
                            </a>

                            <div style="display: flex;align-items: center;">
                                <p
                                    style="font-size: 1rem;height: 25px;display: flex;justify-content: left;margin-bottom: 15px;">
                                    {{ item.writingDate.substring(0,9) }} → {{ item.deliveryDate.substring(0,9) }}
                                </p>
                                <!-- 底栏 -->
                                <div class="selection-letters-text-item-bottom-box">
                                    <div class="selection-letters-text-item-bottom">

                                        <div @click="likeElMessage" class="selection-letters-text-item-bottom-button" v-if="true">
                                            &nbsp;赞&nbsp;🩵&nbsp;{{ item.likeCount }}
                                        </div>
                                        <div class="selection-letters-text-item-bottom-button-love" v-else>
                                            &nbsp;已赞&nbsp;❤️&nbsp;11&nbsp;
                                        </div>
                                        <!-- <div class="selection-letters-text-item-bottom-comment" style="margin-left: auto;">
                                        <IconComment />&nbsp;0&nbsp;
                                    </div> -->
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- 分页 -->
                    <LazyLetterMPagination :paginationUrl="props.paginationUrl" :total="props.total"
                        :current="props.current"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.selection-letters-text-item-text .md-editor {
    --md-bk-color: none;
}
</style>

<style lang="scss" scoped>
.selection-letters-box {
    width: 100%;
    // height: 1300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    .selection-letters {
        width: 100%;
        height: 100%;
        border-radius: 15px;
        // background-color: rgba($color: #fff, $alpha: 0.8);

        // 标签页-页头
        .selection-letters-label-box {
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba($color: #fff, $alpha: 0.8);
            border-radius: 15px;

            .selection-letters-label {
                width: 100%;
                height: 100%;
                // border-bottom: 1px solid #64748b;
                display: flex;

                .selection-letters-label-item {
                    width: 33%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    color: black;
                    opacity: 0.6;
                }

                .selection-letters-label-item:hover {
                    opacity: 1;
                }
            }
        }

        // 信件内容
        .selection-letters-text-box {
            width: 100%;
            margin-top: 15px;
            display: flex;
            justify-content: center;

            .selection-letters-text {
                width: calc(100%);

                .selection-letters-text-item-box {
                    width: 100%;
                    // background-color: antiquewhite;
                    border-radius: 10px;
                    margin-bottom: 15px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba($color: #fff, $alpha: 0.8);
                    border-radius: 15px;

                    .selection-letters-text-item {
                        width: calc(100% - 40px);
                        height: calc(100% - 30px);

                        .selection-letters-text-item-delivery-box {
                            width: 100%;
                            height: 32px;
                            display: flex;
                            align-items: center;
                            margin-top: 10px;
                        }

                        // 标题
                        .selection-letters-text-item-title {
                            height: 40px;
                            display: flex;
                            align-items: center;
                            font-weight: bolder;
                        }

                        // 内容
                        .selection-letters-text-item-text {
                            width: 100%;
                            text-decoration: none;
                        }

                        // 底栏
                        .selection-letters-text-item-bottom-box {
                            width: calc(100% - 170px);
                            display: flex;
                            align-items: center;
                            justify-content: right;
                            margin-bottom: 15px;

                            .selection-letters-text-item-bottom {
                                height: 100%;
                                display: flex;
                                align-items: center;

                                .selection-letters-text-item-bottom-button {
                                    background-color: #eff6ff;
                                    color: #1d4ed8;
                                    min-width: 70px;
                                    height: 25px;
                                    display: flex;
                                    align-items: center;
                                    font-size: 1rem;
                                    justify-content: center;
                                    border-radius: 5px;
                                    box-shadow: 0px 0px 2px #7696be;
                                }

                                .selection-letters-text-item-bottom-button-love {
                                    background-color: #fde2e2;
                                    color: #d8331d;
                                    min-width: 80px;
                                    height: 25px;
                                    display: flex;
                                    align-items: center;
                                    font-size: 1rem;
                                    justify-content: center;
                                    border-radius: 5px;
                                    box-shadow: 0px 0px 2px #d13030;
                                }

                                .selection-letters-text-item-bottom-comment {
                                    display: flex;
                                    align-items: center;
                                    font-size: 18px;
                                    margin-right: 10px;
                                }
                            }
                        }
                    }
                }

                // box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.3);
                .selection-letters-text-item-box:hover {
                    box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.3);
                }
            }
        }
    }
}
</style>