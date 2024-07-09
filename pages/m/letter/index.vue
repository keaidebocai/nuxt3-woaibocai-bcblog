<script setup lang="ts">
definePageMeta({
  layout: "mobile",
});
// import
useHead({
  title: "首页 - 时光邮局 - 时光信箱",
  meta: [
    {
      hid: "keywords",
      name: "keywords",
      content: "时光邮箱，时光信箱，菠菜的时光邮局，菠菜的小窝",
    },
  ],
});
const issueList = ref([
    {
        question: '你知道 1 + 1 = ?',
        answer: '当然不等于3！',
        isShow: false
    },
    {
        question: '你知道邮局的心事是谁吗？',
        answer: '菠菜',
        isShow: false
    },
    {
        question: '你知道为什么北极熊不吃企鹅吗？',
        answer: '因为吃不到，一个在北极一个在南极！',
        isShow: false
    },
    {
        question: '只可以寄给未来的自己吗',
        answer: '寄一封信给未来的自己是非常有趣的事情，这也是PostoMe诞生的初衷。但PostoMe并不会妨碍您寄信给其他人，相反，我们都期望能将某一刻的感受、想法与期望，和我们的家人、朋友、爱人一起分享，不是吗？在写信时，您可以改变收信人的email地址，以寄给他人，与他人一同分享这一刻的世界。',
        isShow: false
    }
]) 
</script>

<template>
  <el-row>
    <el-col :span="22">
                  <!-- 主体内容 -->
                  <div class="look-boby">
                <!-- 首页介绍 -->
                 <div class="index-box">
                    <!-- 左边的 文字 和 按钮 -->
                     <div class="index-left-box">
                        <div class="index-left-word-box">
                            <p style="font-size:3.5rem;font-weight: bolder;margin-bottom: 10px;color: #F0F2F5;">亲爱的旅人……</p>
                            <p style="font-size: 1.5rem;color: #F0F2F5">愿你在未来的某一天，读到这封信，依旧怀揣着当初的勇气和梦想。</p>
                            <div class="index-left-word-button-box">
                                <a href="/letter/writeLetter" class="aLinkStyle">
                                    <div class="myButtonLink" style="">
                                        <span>编写信件</span>
                                    </div>
                                </a>
                                <a class="linkStyle" href="/letter/weiter">
                                    <span style="color: #E6A23C;">
                                        看看别人写的信→
                                    </span>
                                </a>
                            </div>
                            <p style="font-size: 22px;color: #F0F2F5;">
                                &emsp;在这里，我们相信每一个文字、每一个句子都寄托着深情与期望。你可以撰写一封信件，选择在未来的某个时间投递给某个人，可以是恋人、家人、亦或是未来的自己。投递时间可以是一天、一周、一月、一年或某个特定节日，也许你可能忘记自己写过这封信，在未来的某天突然收到这封穿越时间长河，经过时光润色的信件，昔日写信的情绪涌上心头成为未来不可多得的惊喜和珍贵回忆。让我们帮您把握时间，留住情感，让今日的思念与祝福，在未来的某一天绽放。
                            </p>
                            <p style="font-size: 22px;font-weight: bold;margin-top: 18px;color: #409EFF">菠菜的时光邮局，让每一个文字都有意义……</p>
                        </div>
                     </div>
                 </div>

                 <!-- 公开信模块 -->
                  <div class="open-letter-box">
                    <p style="color: #FFA500;font-size: 3.5rem;text-align: center;position: absolute;top: -20px;left: calc(50vw - 5.25rem);">公开信</p>
                    <p style="font-size: 1.5rem;text-align: center;padding-top: 30px;color: #dbe2ef">心里种花，人生才不会荒废。</p>
                    <!-- 公开信展示板块 -->
                     <div class="open-letter-looking-box">
                        <div class="open-letter-looking">
                            <div class="open-letter-looking-item">
                                <img src="https://cdn.likebocai.com/letter/statis/index-letter-img03.jpg" alt="信封图片">
                                <div class="open-letter-looking-item-info">
                                    <!-- 标题 -->
                                    <div style="display: flex;align-items: center;">
                                        <a href="/letter/asdasdas">
                                            <p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
                                                <el-tooltip raw-content content="<p style='font-size: 18px;'>写给三年后的自己</p>" effect="light" placement="top">
                                                    写给三年后的自己
                                                </el-tooltip>
                                            </p>
                                        </a>
                                        <div class="isSend">
                                            <p>已投递</p>
                                        </div>
                                    </div>
                                    <!-- 内向简略 -->
                                    <p style="width: calc(100% -20px);font-size: 16px;margin: 0 5px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 10;-webkit-box-orient: vertical;">
                                        &emsp;在这里，我们相信每一个文字、每一个句子都寄托着深情与期望。你可以撰写一封信件，选择在未来的某个时间投递给某个人，可以是恋人、家人、亦或是未来的自己。投递时间可以是一天、一周、一月、一年或某个特定节日，也许你可能忘记自己写过这封信，在未来的某天突然收到这封穿越时间长河，经过时光润色的信件，昔日写信的情绪涌上心头成为未来不可多得的惊喜和珍贵回忆。让我们帮您把握时间，留住情感，让今日的思念与祝福，在未来的某一天绽放。在这里，我们相信每一个文字、每一个句子都寄托着深情与期望。你可以撰写一封信件，选择在未来的某个时间投递给某个人，可以是恋人、家人、亦或是未来的自己。投递时间可以是一天、一周、一月、一年或某个特定节日，也许你可能忘记自己写过这封信，在未来的某天突然收到这封穿越时间长河，经过时光润色的信件，昔日写信的情绪涌上心头成为未来不可多得的惊喜和珍贵回忆。让我们帮您把握时间，留住情感，让今日的思念与祝福，在未来的某一天绽放。
                                    </p>
                                    <!-- 写信人信息 -->
                                     <div class="open-letter-looking-item-info-userInfo">
                                        <!-- 头像 -->
                                        <el-avatar style="margin-left: 5px;" :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                                        <!-- 信息 -->
                                        <div style="margin-left: 10px;">
                                            <p style="font-size: 18px;margin-bottom: 10px;font-weight: 550;">菠菜的小迷弟</p>
                                            <p style="font-size: 15px;font-weight: 500;">2024年5月21日&emsp;→&emsp;2024年7月1日</p>
                                        </div>
                                     </div>

                                </div>
                            </div>
                            <div class="open-letter-looking-item" style="margin: 1.5rem 0;">
                                <img src="https://cdn.likebocai.com/letter/statis/index-letter-img03.jpg" alt="信封图片">
                                <div class="open-letter-looking-item-info">
                                    <!-- 标题 -->
                                    <div style="display: flex;align-items: center;">
                                        <a href="/letter/asdasdas">
                                            <p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
                                                <el-tooltip raw-content content="<p style='font-size: 18px;'>写给三年后的自己</p>" effect="light" placement="top">
                                                    写给三年后的自己
                                                </el-tooltip>
                                            </p>
                                        </a>
                                        <div class="isSend">
                                            <p>已投递</p>
                                        </div>
                                    </div>
                                    <!-- 内向简略 -->
                                    <p style="width: calc(100% -20px);font-size: 16px;margin: 0 5px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 10;-webkit-box-orient: vertical;">
                                        &emsp;在这里，我们相信每一个文字、每一个句子都寄托着深情与期望。你可以撰写一封信件，选择在未来的某个时间投递给某个人，可以是恋人、家人、亦或是未来的自己。投递时间可以是一天、一周、一月、一年或某个特定节日，也许你可能忘记自己写过这封信，在未来的某天突然收到这封穿越时间长河，经过时光润色的信件，昔日写信的情绪涌上心头成为未来不可多得的惊喜和珍贵回忆。让我们帮您把握时间，留住情感，让今日的思念与祝福，在未来的某一天绽放。在这里，我们相信每一个文字、每一个句子都寄托着深情与期望。你可以撰写一封信件，选择在未来的某个时间投递给某个人，可以是恋人、家人、亦或是未来的自己。投递时间可以是一天、一周、一月、一年或某个特定节日，也许你可能忘记自己写过这封信，在未来的某天突然收到这封穿越时间长河，经过时光润色的信件，昔日写信的情绪涌上心头成为未来不可多得的惊喜和珍贵回忆。让我们帮您把握时间，留住情感，让今日的思念与祝福，在未来的某一天绽放。
                                    </p>
                                    <!-- 写信人信息 -->
                                     <div class="open-letter-looking-item-info-userInfo">
                                        <!-- 头像 -->
                                        <el-avatar style="margin-left: 5px;" :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                                        <!-- 信息 -->
                                        <div style="margin-left: 10px;">
                                            <p style="font-size: 18px;margin-bottom: 10px;font-weight: 500;">菠菜的小迷弟</p>
                                            <p style="font-size: 15px;font-weight: 500;">2024年5月21日&emsp;→&emsp;2024年7月1日</p>
                                        </div>
                                     </div>

                                </div>
                            </div>
                            <div class="open-letter-looking-item">
                                <img src="https://cdn.likebocai.com/letter/statis/index-letter-img03.jpg" alt="信封图片">
                                <div class="open-letter-looking-item-info">
                                    <!-- 标题 -->
                                    <div style="display: flex;align-items: center;">
                                        <a href="/letter/asdasdas">
                                            <p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
                                                <el-tooltip raw-content content="<p style='font-size: 18px;'>写给三年后的自己</p>" effect="light" placement="top">
                                                    写给三年后的自己
                                                </el-tooltip>
                                            </p>
                                        </a>
                                        <div class="isSend">
                                            <p>已投递</p>
                                        </div>
                                    </div>
                                    <!-- 内向简略 -->
                                    <p style="width: calc(100% -20px);font-size: 16px;margin: 0 5px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 10;-webkit-box-orient: vertical;">
                                        &emsp;在这里，我们相信每一个文字、每一个句子都寄托着深情与期望。祝福，在未来的某一天绽放。
                                    </p>
                                    <!-- 写信人信息 -->
                                     <div class="open-letter-looking-item-info-userInfo">
                                        <!-- 头像 -->
                                        <el-avatar style="margin-left: 5px;" :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                                        <!-- 信息 -->
                                        <div style="margin-left: 10px;">
                                            <p style="font-size: 18px;margin-bottom: 10px;font-weight: 500;">菠菜的小迷弟</p>
                                            <p style="font-size: 15px;font-weight: 500;">2024年5月21日&emsp;→&emsp;2024年7月1日</p>
                                        </div>
                                     </div>

                                </div>
                            </div>
                        </div>
                     </div>
                     <!-- 公开信的按钮 -->
                      <div class="open-letter-buttom-box">
                        <a href="/letter/writeLetter" class="open-letter-buttom" style="width: 140px;box-shadow: 0px 0px 15px #fff;">
                            <div class="mybuttom" style="color: #fff;">
                                现在写信一封
                            </div>
                        </a>
                        <div class="open-letter-buttom" style="margin: 0 1rem;background-color: #67C23A;box-shadow: 0px 0px 15px #e6a23c;">
                            <div class="mybuttom" style="color: #e6a23c;">
                                刷新
                            </div>
                        </div>
                        <a href="/letter/asdasdasd" class="open-letter-buttom" style="background-color: #E6A23C;box-shadow: 0px 0px 15px #409eff;">
                            <div class="mybuttom" style="color: #409eff;">
                                查看更多→
                            </div>
                        </a>
                      </div>
                </div>

                <!-- 投递信息 -->
                 <div class="open-deliveryInfo-box" >
                    <div class="open-deliveryInfo">
                        <div style="text-align: center;">
                            <p style="font-size: 3.5rem;font-weight: 500;margin-bottom: 30px;">穿越时空</p>
                            <p style="font-size: 1.5rem;font-weight: 500;margin-bottom: 10px;">在这里，每一封信背后都藏着一个故事</p>
                            <p style="font-size: 2.8rem;font-weight: 500;">期待你的留言，一起传递更多情感</p>
                        </div>
                        <div class="open-deliveryInfo-info-box">
                            <div class="open-deliveryInfo-info">
                                <div>
                                    <p style="font-size: 3.5rem;font-weight: 600;margin-top: 30px;color: #409eff;">86422</p>
                                    <p style="font-size: 1.5rem;">封已投递</p>
                                </div>
                            </div>
                            <div class="open-deliveryInfo-info">
                                <div>
                                    <p style="font-size: 3.5rem;font-weight: 600;margin-top: 10px;color: #409eff;">422</p>
                                    <p style="font-size: 1.5rem;">封待投递</p>
                                </div>
                            </div>
                            <div class="open-deliveryInfo-info">
                                <div>
                                    <p style="font-size: 3.5rem;font-weight: 600;margin-top: 30px;color: #409eff;">{{ ((new Date().getTime() - new Date("2024-07-07 00:00:00").getTime()) / 86400000).toFixed(2) }}</p>
                                    <p style="font-size: 1.5rem;margin-bottom: 40px">开业天数</p>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>

                 <!-- 常见问题 -->
                 <div class="index-issue-box">
                    <div class="index-issue">
                        <p style="height: 60px;font-size: 3.5rem;margin-top: 30px;font-weight: 600;">❓常见问题</p>
                        <div class="index-issue-item-box">
                            <div class="index-issue-item" v-for="(item,index) in issueList">
                                <div class="index-issue-item-question-box" @click="issueList[index].isShow = !issueList[index].isShow">
                                    <div style="display: flex;align-items: center;position: relative;height: 60px;">
                                        <p class="index-issue-item-question">
                                            {{ item.question }}
                                        </p>
                                        <p class="index-issue-item-question" style="position: absolute;right: 0px;font-weight: bolder;">{{ item.isShow ? '👆':'👇' }}</p>
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
      <AppButtom :is-mobile="true" :my-class="'MyButtomMobile'" />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.el-row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.look-boby {
    // height: 1500px;
    width: 93vw;
    // 首页介绍
    .index-box {
        width: 100%;
        border-radius: 20px;
        display: flex;
        margin-top: 1rem;
        // background-color: rgba(255, 255, 255, 0.1);
        .index-left-box {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            .index-left-word-box {
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
                            background-color:  #79bbff;
                            height: 44px;
                            border-radius: 11px;
                        }
                    }
                    .linkStyle {
                        color:rgba(0, 0, 0, 0.7);
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
                            color:rgba(0, 0, 0, 0.4);
                        }
                    }
                    
                }
            }
        }
    }
    // 公开信展示
    .open-letter-box {
        width: 100%;
        position: relative;
        margin-top: 3rem;
        height: 1800px;
        .open-letter-looking-box {
            width: 100%;
            margin-top: 30px;
            .open-letter-looking {
                width: 100%;
                .open-letter-looking-item {
                    box-shadow: 0px 0px 10px rgba($color: black, $alpha: 0.5);
                    border-radius: 15px;
                    width: 100%;
                    height: 510px;
                    background-color: rgba($color: #fff, $alpha: 0.3);
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
            border-radius: 25px;
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
                    font-size: 1rem;
                    font-weight: bold;
                }
            }
        }
    }
    // 投递信息
    .open-deliveryInfo-box {
        width: 100%;
        margin-top: 30px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .open-deliveryInfo {
            width: 100%;
            background-color: rgba($color: #fff, $alpha: 0.5);
            border-radius: 10px;
            text-align: center;
            position: relative;
            .open-deliveryInfo-info-box {
                width: 100%;
                border-radius: 10px;
                background-color:  #f1eded;
                margin-top: 1.5rem;
                .open-deliveryInfo-info {
                    width: 100%;
                    height: 120px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
    // 常见问题
    .index-issue-box {
        width: 100%;
        background-color: rgba($color: #98E6FA, $alpha: 0.7);
        margin-top: 40px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        color: #fff;
        .index-issue {
            width: 100%;
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
                        .index-issue-item-question {
                            font-size: 1.5rem;
                            font-weight: 700;
                            margin-left: 1rem;
                        }
                        .index-issue-item-answer-box {
                            min-height: 30px;
                            width: 90%;
                            .index-issue-item-answer{
                                font-size: 1.3rem;
                                margin-left: 1.1rem;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
