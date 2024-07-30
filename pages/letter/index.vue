<script setup lang="ts">
definePageMeta({
    layout: "email",
});
useHead({
    title: "首页 - 时光邮局 - 时光信箱",
});

const myClass = ref("MyButtom");

const issueList = ref([
    {
        question: '开发【菠菜的小窝-时光邮局】的初衷',
        answer: '原起于2021年在qq邮箱给自己写了一封【写给未来自己的信】，然后再2022年收到了它，内容无一不是对自己未来规划，这是其一。然后又在抖音刷到很多旅客在高铁垃圾袋上写留言留给下一位乘客，其中文笔优雅，让人深深感到了文字的魅力和人间的温暖，从产生了做一个发邮件的平台，让这个世界上从未谋面的人们多一种交流的方式！',
        isShow: false
    },
    {
        question: '在【菠菜的小窝-时光邮局】可以做什么，免费吗？',
        answer: '完全免费！【菠菜的小窝-时光邮局】您可以用信件的形式记录这一刻的感受，写下今天的故事或是许下未来的愿望，但并不立即寄出，而是在您设定的时间间隔之后发送给收信人。',
        isShow: false
    },
    {
        question: '信的内容有限制吗',
        answer: '亲爱的用户，我们非常欢迎您在信件中倾诉您的思绪和情感。您可以自由地表达您的故事、梦想或是分享您的日常点滴。我们相信，每一封信都承载着独特且珍贵的情感价值。同时，我们也温馨提醒您，在书写过程中，请确保内容遵循法律法规，保持文明和谐的表达方式。此外，若您选择附加图片，为了确保网站的顺畅运行和良好的浏览体验，上传的单张图片大小请不要超过5MB。感谢您的理解和支持，期待您的美好文字能在未来的某一天，为您带来温暖的回忆。',
        isShow: false
    },
    {
        question: '我可以修改已封缄的信件的内容吗',
        answer: '唔。。如果您可以修改信件的内容，那么等待的过程和收信的那一刻是不是会少了很多惊喜和乐趣呢？因此，修改已封缄的信件的内容是不可以的。',
        isShow: false
    },
    {
        question: '我可以不登录就寄信吗？',
        answer: '当然可以，但是最好注册一下，现在时光邮局还未完全开发完成，注册账号可以保留自己的数据。',
        isShow: false
    },
    {
        question: '寄信->收信的流程',
        answer: '你写信 -> 等待 -> 发送给你/TA -> 通知你/TA已经收到信 -> 在两封邮件中分别带有专属于你们信件的本站网址',
        isShow: false
    },
    {
        question: '可以给多久的未来寄信？',
        answer: '一小时 ———— 目前打算15年',
        isShow: false
    },
    {
        question: '我的邮件由谁发送？如果设为信件内容会泄露吗？',
        answer: '信件由菠菜配送，没错它是一只2019年出生的母柯基~\n事实上信件由系统自动发送无人工干预，发送邮件的邮箱为bocai@likebocai.com。\n正如我所说，信件由系统发送，不会送错，你要做到的就是将地址写对！',
        isShow: false
    },
    {
        question: '寄邮件需要什么？',
        answer: '你的邮箱，TA的邮箱，投递时间，信件内容',
        isShow: false
    },
    {
        question: '如果有一天时光邮局倒闭了，那我的信还能寄出去吗？',
        answer: '当然！天下没有不散的宴席，如有一天网站遇到不可抗的原因关站，我在此承诺，我一定会将所有信封邮寄出去之后再暂停后台服务器！每一封！',
        isShow: false
    },
    {
        question: '如果将信件设为私密信件，那谁可以看见这封信？',
        answer: '本站的私密信件不会发布在网站的公开信中，我们会将赐封信的网址隐藏，待到发信的那一天，发送给你和TA。',
        isShow: false
    },
    {
        question: '只可以寄给未来的自己吗',
        answer: '寄一封信给未来的自己是非常有趣的事情，这也是PostoMe诞生的初衷。但PostoMe并不会妨碍您寄信给其他人，相反，我们都期望能将某一刻的感受、想法与期望，和我们的家人、朋友、爱人一起分享，不是吗？在写信时，您可以改变收信人的email地址，以寄给他人，与他人一同分享这一刻的世界。',
        isShow: false
    },
    {
        question: '如果有问题，怎样联系官方',
        answer: '您可以发邮件给我们 likebocai#qq.com (将#换成@),或直接在菠菜的小窝留言给我',
        isShow: false
    },
    {
        question: '鸣谢【PostoMe】',
        answer: '本站特别感谢【PostoMe】(https://postome.com/)，我的审美不是很好，再加上是个人开发者，前后端都是我自己写，非常的缺乏灵感，所以就直接借鉴(偷)【PostoMe】的UI设计，但是都是自己用NUXT3敲出来的，然后再配色~',
        isShow: false
    }
])
const newReload = () => {
    location.reload();
}
const MyUrl = useRuntimeConfig().public.HTTP_URL;
const { data } = await useAsyncData('index', () =>
    $fetch(MyUrl + `/blog/email/public/index`, { method: "get" })
);
const indexData = ref(data.value.data.data)
const noNumber = ref(data.value.data.noNumber)
const yesNumber = ref(data.value.data.yesNumber)
const errorHandler = () => true
</script>

<template>
    <div>
        <div style="display: flex; justify-content: center; align-content: center;">
            <div class="affix-container">
                <el-affix target=".affix-container">
                    <!-- <AppHeader /> -->
                    <AppMyHeader />
                </el-affix>
                <div style="display: flex; justify-content: center;width: 100%;margin-top: 60px;">
                    <div>
                        <!-- 主体内容 -->
                        <div class="look-boby">
                            <!-- 首页介绍 -->
                            <div class="index-box">
                                <!-- 左边的 文字 和 按钮 -->
                                <div class="index-left-box">
                                    <div class="index-left-word-box">
                                        <p style="font-size: 60px;font-weight: bolder;margin-bottom: 10px;">亲爱的旅人……</p>
                                        <p style="font-size: 24px;">愿你在未来的某一天，读到这封信，依旧怀揣着当初的勇气和梦想。</p>
                                        <div class="index-left-word-button-box">
                                            <a href="/letter/writeLetter" class="aLinkStyle">
                                                <div class="myButtonLink" style="">
                                                    <span>编写信件</span>
                                                </div>
                                            </a>
                                            <a class="linkStyle" href="/letter/public/selection">
                                                <span>
                                                    看看别人写的信→
                                                </span>
                                            </a>
                                        </div>
                                        <p style="font-size: 22px;">
                                            在这里，我们相信每一个文字、每一个句子都寄托着深情与期望。你可以撰写一封信件，选择在未来的某个时间投递给某个人，可以是恋人、家人、亦或是未来的自己。投递时间可以是一天、一周、一月、一年或某个特定节日，也许你可能忘记自己写过这封信，在未来的某天突然收到这封穿越时间长河，经过时光润色的信件，昔日写信的情绪涌上心头成为未来不可多得的惊喜和珍贵回忆。让我们帮您把握时间，留住情感，让今日的思念与祝福，在未来的某一天绽放。
                                        </p>
                                        <p style="font-size: 22px;font-weight: bold;margin-top: 18px;">
                                            菠菜的时光邮局，让每一个文字都有意义……</p>
                                    </div>
                                </div>

                                <!-- 右边的图片 -->
                                <div class="index-right-box">
                                    <div class="index-right-img-box">
                                        <div class="index-right-img-item" style="margin-right: 20px;">
                                            <el-image style="border-radius: 10px;margin-top: 180px;"
                                                src="https://cdn.likebocai.com/letter/statis/index-letter-img01.jpg"
                                                fit="cover" />
                                            <el-image style="border-radius: 10px;margin-top: 20px;"
                                                src="https://cdn.likebocai.com/letter/statis/index-letter-img02.jpg"
                                                fit="cover" />
                                        </div>
                                        <div class="index-right-img-item" style="width: 300px;">
                                            <!-- https://pic2.zhimg.com/50/v2-adce767e381058e8c36eb5abc8cbef36_hd.jpg?source=1940ef5c -->
                                            <el-image style="border-radius: 10px;margin-top: 20px;"
                                                src="https://cdn.likebocai.com/letter/statis/index-letter-img03.jpg"
                                                fit="cover" />
                                            <el-image style="border-radius: 10px;margin-top: 20px;"
                                                src="https://cdn.likebocai.com/letter/statis/index-letter-img04.jpg"
                                                fit="cover" />
                                        </div>
                                        <div class="index-right-img-item"
                                            style="width: 120px;margin-left: 20px;font-size: 45px;display: flex;justify-content: center;align-items: center;">
                                            <p style="width: 40px;color: #E8FCFF;">从前车马很慢，书信很远，一生只够爱一个人。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 公开信模块 -->
                            <div class="open-letter-box">
                                <p
                                    style="color: #FFA500;font-size: 60px;text-align: center;position: absolute;top: -20px;left: 560px;">
                                    公开信</p>
                                <p style="font-size: 28px;text-align: center;padding-top: 30px;color: #dbe2ef">
                                    心里种花，人生才不会荒废。</p>
                                <!-- 公开信展示板块 -->
                                <div class="open-letter-looking-box">
                                    <div class="open-letter-looking">
                                        <div class="open-letter-looking-item">
                                            <img :src="`${indexData[0].imgUrl ? indexData[0].imgUrl : 'https://cdn.likebocai.com/letter/statis/index-letter-img03.jpg'}`"
                                                alt="信封图片">
                                            <div class="open-letter-looking-item-info">
                                                <!-- 标题 -->
                                                <div style="display: flex;align-items: center;">
                                                    <a :href="`/letter/text/${indexData[0].id}`">
                                                        <p
                                                            style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
                                                            <el-tooltip raw-content
                                                                :content="`<p style='font-size: 18px;'>${indexData[0].title}</p>`"
                                                                effect="light" placement="top">
                                                                {{ indexData[0].title }}
                                                            </el-tooltip>
                                                        </p>
                                                    </a>
                                                    <div class="isSend" v-if="indexData[0].isDelivery == 'Y'">
                                                        <p>已投递</p>
                                                    </div>
                                                    <div v-else class="isSend"
                                                        style="background-color: #fcd3d3;border: 1px solid #c45656;">
                                                        <p style="color: #F56C6C;">待投递</p>
                                                    </div>
                                                </div>
                                                <!-- 内向简略 -->
                                                <p
                                                    style="width: calc(100% -20px);font-size: 16px;margin: 0 5px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 10;-webkit-box-orient: vertical;">
                                                    &emsp;{{ indexData[0].content }}
                                                </p>
                                                <!-- 写信人信息 -->
                                                <div class="open-letter-looking-item-info-userInfo">
                                                    <!-- 头像 -->
                                                    <el-avatar style="margin-left: 5px;" :size="50"
                                                        :src="indexData[0].url" @error="errorHandler">
                                                        <img src="~/assets/error-avatar.png" />
                                                    </el-avatar>
                                                    <!-- 信息 -->
                                                    <div style="margin-left: 10px;">
                                                        <p
                                                            style="font-size: 18px;margin-bottom: 10px;font-weight: 550;">
                                                            {{ indexData[0].nickName }}</p>
                                                        <p style="font-size: 15px;font-weight: 500;">
                                                            {{
                                                                indexData[0].writingDate.slice(0,10).replace("T","日").replace("-","年").replace("-","月")
                                                            }}
                                                            &emsp;→&emsp;
                                                            {{
                                                                indexData[0].deliveryDate.slice(0,10).replace("T","日").replace("-","年").replace("-","月")
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="open-letter-looking-item" style="margin: 0 30px;">
                                            <img :src="`${indexData[1].imgUrl ? indexData[1].imgUrl : 'https://cdn.likebocai.com/letter/statis/index-letter-img03.jpg'}`"
                                                alt="信封图片">
                                            <div class="open-letter-looking-item-info">
                                                <!-- 标题 -->
                                                <div style="display: flex;align-items: center;">
                                                    <a :href="`/letter/text/${indexData[1].id}`">
                                                        <p
                                                            style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
                                                            <el-tooltip raw-content
                                                                :content="`<p style='font-size: 18px;'>${indexData[1].title}</p>`"
                                                                effect="light" placement="top">
                                                                {{ indexData[1].title }}
                                                            </el-tooltip>
                                                        </p>
                                                    </a>
                                                    <div class="isSend" v-if="indexData[1].isDelivery == 'Y'">
                                                        <p>已投递</p>
                                                    </div>
                                                    <div v-else class="isSend"
                                                        style="background-color: #fcd3d3;border: 1px solid #c45656;">
                                                        <p style="color: #F56C6C;">待投递</p>
                                                    </div>
                                                </div>
                                                <!-- 内向简略 -->
                                                <p
                                                    style="width: calc(100% -20px);font-size: 16px;margin: 0 5px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 10;-webkit-box-orient: vertical;">
                                                    &emsp;{{ indexData[1].content }}
                                                </p>
                                                <!-- 写信人信息 -->
                                                <div class="open-letter-looking-item-info-userInfo">
                                                    <!-- 头像 -->
                                                    <el-avatar style="margin-left: 5px;" :size="50"
                                                        :src="indexData[1].url" @error="errorHandler">
                                                        <img src="~/assets/error-avatar.png" />
                                                    </el-avatar>
                                                    <!-- 信息 -->
                                                    <div style="margin-left: 10px;">
                                                        <p
                                                            style="font-size: 18px;margin-bottom: 10px;font-weight: 550;">
                                                            {{ indexData[1].nickName }}</p>
                                                        <p style="font-size: 15px;font-weight: 500;">
                                                            {{
                                                                indexData[1].writingDate.slice(0,10).replace("T","日").replace("-","年").replace("-","月")
                                                            }}
                                                            &emsp;→&emsp;
                                                            {{
                                                                indexData[1].deliveryDate.slice(0,10).replace("T","日").replace("-","年").replace("-","月")
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="open-letter-looking-item">
                                            <img :src="`${indexData[2].imgUrl ? indexData[2].imgUrl : 'https://cdn.likebocai.com/letter/statis/index-letter-img03.jpg'}`"
                                                alt="信封图片">
                                            <div class="open-letter-looking-item-info">
                                                <!-- 标题 -->
                                                <div style="display: flex;align-items: center;">
                                                    <a :href="`/letter/text/${indexData[1].id}`">
                                                        <p
                                                            style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
                                                            <el-tooltip raw-content
                                                                :content="`<p style='font-size: 18px;'>${indexData[2].title}</p>`"
                                                                effect="light" placement="top">
                                                                {{ indexData[2].title }}
                                                            </el-tooltip>
                                                        </p>
                                                    </a>
                                                    <div class="isSend" v-if="indexData[2].isDelivery == 'Y'">
                                                        <p>已投递</p>
                                                    </div>
                                                    <div v-else class="isSend"
                                                        style="background-color: #fcd3d3;border: 1px solid #c45656;">
                                                        <p style="color: #F56C6C;">待投递</p>
                                                    </div>
                                                </div>
                                                <!-- 内向简略 -->
                                                <p
                                                    style="width: calc(100% -20px);font-size: 16px;margin: 0 5px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 10;-webkit-box-orient: vertical;">
                                                    &emsp;{{ indexData[2].content }}
                                                </p>
                                                <!-- 写信人信息 -->
                                                <div class="open-letter-looking-item-info-userInfo">
                                                    <!-- 头像 -->
                                                    <el-avatar style="margin-left: 5px;" :size="50"
                                                        :src="indexData[2].url" @error="errorHandler">
                                                        <img src="~/assets/error-avatar.png" />
                                                    </el-avatar>
                                                    <!-- 信息 -->
                                                    <div style="margin-left: 10px;">
                                                        <p
                                                            style="font-size: 18px;margin-bottom: 10px;font-weight: 550;">
                                                            {{ indexData[2].nickName }}</p>
                                                        <p style="font-size: 15px;font-weight: 500;">
                                                            {{
                                                                indexData[2].writingDate.slice(0,10).replace("T","日").replace("-","年").replace("-","月")
                                                            }}
                                                            &emsp;→&emsp;
                                                            {{
                                                                indexData[2].deliveryDate.slice(0,10).replace("T","日").replace("-","年").replace("-","月")
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 公开信的按钮 -->
                                <div class="open-letter-buttom-box">
                                    <a href="/letter/writeLetter" class="open-letter-buttom"
                                        style="width: 140px;box-shadow: 0px 0px 15px #fff;">
                                        <div class="mybuttom" style="color: #fff;">
                                            现在写信一封
                                        </div>
                                    </a>
                                    <div @click="newReload" class="open-letter-buttom"
                                        style="margin: 0 50px;background-color: #67C23A;box-shadow: 0px 0px 15px #e6a23c;">
                                        <div class="mybuttom" style="color: #e6a23c;">
                                            刷新
                                        </div>
                                    </div>
                                    <a href="/letter/public/selection" class="open-letter-buttom"
                                        style="background-color: #E6A23C;box-shadow: 0px 0px 15px #409eff;">
                                        <div class="mybuttom" style="color: #409eff;">
                                            查看更多→
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <!-- 投递信息 -->
                            <div class="open-deliveryInfo-box">
                                <div class="open-deliveryInfo">
                                    <div style="text-align: center;margin-top: 40px;">
                                        <p style="font-size: 60px;font-weight: 500;margin-bottom: 30px;">穿越时空</p>
                                        <p style="font-size: 24px;font-weight: 500;margin-bottom: 10px;">
                                            在这里，每一封信背后都藏着一个故事</p>
                                        <p style="font-size: 48px;font-weight: 500;">期待你的留言，一起传递更多情感</p>
                                    </div>
                                    <div class="open-deliveryInfo-info-box">
                                        <div class="open-deliveryInfo-info">
                                            <p
                                                style="font-size: 48px;font-weight: 600;margin-top: 30px;color: #409eff;">
                                                {{ yesNumber }}
                                            </p>
                                            <p style="font-size: 24px;">封已投递</p>
                                        </div>
                                        <div class="open-deliveryInfo-info" style="margin: 0 80px;">
                                            <p
                                                style="font-size: 48px;font-weight: 600;margin-top: 30px;color: #409eff;">
                                                {{ noNumber }}
                                            </p>
                                            <p style="font-size: 24px;">封待投递</p>
                                        </div>
                                        <div class="open-deliveryInfo-info">
                                            <p
                                                style="font-size: 48px;font-weight: 600;margin-top: 30px;color: #409eff;">
                                                {{ ((new Date().getTime() - new Date("2024-07-20 00:00:00").getTime()) /
                                                86400000).toFixed(2) }}</p>
                                            <p style="font-size: 24px;">开业天数</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 常见问题 -->
                            <div class="index-issue-box">
                                <div class="index-issue">
                                    <p style="height: 60px;font-size: 48px;margin-top: 30px;font-weight: 600;">❓常见问题</p>
                                    <div class="index-issue-item-box">
                                        <div class="index-issue-item" v-for="(item, index) in issueList">
                                            <div class="index-issue-item-question-box"
                                                @click="issueList[index].isShow = !issueList[index].isShow">
                                                <div
                                                    style="display: flex;align-items: center;position: relative;height: 80px;">
                                                    <p class="index-issue-item-question">
                                                        {{ item.question }}
                                                    </p>
                                                    <p class="index-issue-item-question"
                                                        style="position: absolute;right: 0px;font-weight: bolder;">{{
                                                        item.isShow ? '👆':'👇' }}</p>
                                                </div>
                                                <!-- 回答 -->
                                                <div class="index-issue-item-answer-box" v-show="item.isShow">
                                                    <p class="index-issue-item-answer">
                                                        {{ item.answer }}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 100%;display: flex; justify-content: center">
                            <AppButtom :myClass="myClass" />
                        </div>
                    </div>
                </div>
                <!-- <slot /> -->
            </div>
        </div>
        <el-backtop :right="40" :bottom="40" :visibility-height="1000" />
    </div>
</template>

<style lang="scss" scoped>
.look-boby {
    // height: 1500px;
    width: 1300px;

    // 首页介绍
    .index-box {
        width: 100%;
        height: 800px;
        border-radius: 20px;
        display: flex;

        // background-color: rgba(255, 255, 255, 0.1);
        .index-left-box {
            width: 600px;
            height: 100%;
            display: flex;
            align-items: center;

            .index-left-word-box {
                margin-left: 30px;

                .index-left-word-button-box {
                    height: 80px;
                    display: flex;
                    align-items: center;

                    .aLinkStyle {
                        text-decoration: none;

                        .myButtonLink {
                            width: 120px;
                            height: 40px;
                            background-color: #409eff;
                            font-family: YunFengHanChanTi;
                            font-size: 22px;
                            border-radius: 10px;
                            margin-right: 10px;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            span {
                                color: #fff;
                            }
                        }
                    }

                    .aLinkStyle:hover {
                        .myButtonLink {
                            background-color: #79bbff;
                            height: 44px;
                            border-radius: 11px;
                        }
                    }

                    .linkStyle {
                        color: rgba(0, 0, 0, 0.7);
                        width: 150px;
                        height: 40px;
                        font-family: YunFengHanChanTi;
                        font-weight: bolder;
                        font-size: 18px;
                        margin-top: 8px;
                        text-decoration: none;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .linkStyle:hover {
                        span {
                            color: rgba(0, 0, 0, 0.4);
                        }
                    }

                }
            }
        }

        .index-right-box {
            width: 700px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .index-right-img-box {
                width: 660px;
                height: 100%;
                display: flex;

                .index-right-img-item {
                    width: 200px;
                    height: 100%;
                }
            }
        }
    }

    // 公开信展示
    .open-letter-box {
        width: 100%;
        position: relative;
        margin-top: 30px;

        .open-letter-looking-box {
            width: 100%;
            height: 500px;
            display: flex;
            justify-content: center;
            margin-top: 30px;

            .open-letter-looking {
                width: 1000px;
                height: 100%;
                display: flex;

                .open-letter-looking-item {
                    box-shadow: 0px 0px 10px rgba($color: black, $alpha: 0.5);
                    border-radius: 15px;
                    width: 330px;
                    height: 100%;
                    background-color: rgba($color: #fff, $alpha: 0.3);
                    // background-color: #fff;
                    position: relative;

                    img {
                        border-radius: 15px;
                        transition: all 1s;
                        width: 100%;
                        max-height: 220px;
                    }

                    img:hover {
                        transform: scale(1.1);
                    }

                    .open-letter-looking-item-info {
                        width: 100%;
                        height: 280px;
                        border-bottom-left-radius: 15px;
                        border-bottom-right-radius: 15px;
                        position: absolute;
                        bottom: 0;

                        // background-color: aliceblue;
                        a {
                            max-width: 200px;
                            height: 40px;
                            text-decoration: none;
                            display: flex;
                            align-items: center;
                            margin-left: 5px;

                            p {
                                font-size: 20px;
                                color: black;
                                font-weight: 500;
                            }
                        }

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

                        .open-letter-looking-item-info-userInfo {
                            width: 100%;
                            height: 80px;
                            border-bottom-left-radius: 15px;
                            border-bottom-right-radius: 15px;
                            display: flex;
                            align-items: center;
                            position: absolute;
                            bottom: 0;
                        }
                    }
                }

                .open-letter-looking-item:hover {
                    box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.4);
                }
            }
        }

        .open-letter-buttom-box {
            width: 100%;
            height: 100px;
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;

            a {
                text-decoration: none;
            }

            .open-letter-buttom {
                width: 120px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #409eff;
                border-radius: 25px;
                cursor: pointer;

                .mybuttom {
                    font-size: 18px;
                    font-weight: bold;
                }
            }
        }
    }

    // 投递信息
    .open-deliveryInfo-box {
        width: 100%;
        height: 350px;
        margin-top: 30px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        .open-deliveryInfo {
            width: 1000px;
            height: 100%;
            background-color: rgba($color: #fff, $alpha: 0.5);
            border-radius: 10px;
            text-align: center;
            position: relative;

            .open-deliveryInfo-info-box {
                width: 800px;
                height: 180px;
                border-radius: 10px;
                margin-left: 100px;
                margin-top: 20px;
                background-color: #f1eded;
                display: flex;
                justify-content: center;
                align-items: center;

                .open-deliveryInfo-info {
                    width: 180px;
                    height: 120px;
                }
            }
        }
    }

    // 常见问题
    .index-issue-box {
        width: 100%;
        background-color: rgba($color: #98E6FA, $alpha: 0.7);
        margin-top: 100px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        color: #fff;

        .index-issue {
            width: 1000px;
            margin-top: 60px;
            border-radius: 15px;

            .index-issue-item-box {
                width: 100%;
                margin-bottom: 30px;

                .index-issue-item {
                    width: 100%;
                    min-height: 60px;
                    cursor: pointer;
                    border-top: 1px solid rgba($color: #fff, $alpha: 0.6);

                    .index-issue-item-question-box {
                        height: 100%;

                        .index-issue-item-question {
                            font-size: 32px;
                            font-weight: 700;
                        }

                        .index-issue-item-answer-box {
                            min-height: 30px;
                            width: 90%;

                            .index-issue-item-answer {
                                font-size: 24px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
