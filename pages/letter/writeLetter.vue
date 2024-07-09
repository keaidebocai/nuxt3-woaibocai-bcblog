<script setup lang="ts">
definePageMeta({
  layout: "email",
});
useHead({
  title: "写信 - 时光邮局 - 时光信箱",
});

import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import type { ToolbarNames } from "md-editor-v3";

const toolbars: ToolbarNames[] = [
  "bold",
  "underline",
  "italic",
  "strikeThrough",
  "-",
  "title",
  "sub",
  "sup",
  "quote",
  "unorderedList",
  "orderedList",
  "task",
  "-",
  "codeRow",
  "link",
  "image",
  "katex",
  "pageFullscreen",
];

// 发送数据 sendEmailReg
const sendEmailDate = reactive({
  emailTitle: '',
  userEmail: '123@qq.com',
  userEmailReg: computed(() => {
  if(sendEmailDate.userEmail == '') {
    return ''
  }
  if(!/^[\w._]+@(qq|gmail|163|yahoo|hotmail|outlook|sohu|sina|139)\.com(\r\n|\r|\n)?$/.test(sendEmailDate.userEmail)) {
    return 'red'
  }
  return ''
}),
  sendEmail: '',
  sendEmailReg: computed(() => {
  if(sendEmailDate.sendEmail == '') {
    return ''
  }
  if(!/^[\w._]+@(qq|gmail|163|yahoo|hotmail|outlook|sohu|sina|139)\.com(\r\n|\r|\n)?$/.test(sendEmailDate.sendEmail)) {
    return 'red'
  }
  return ''
}),
  isSelf: false,
  dateString: new Date(),
  isOpen: "即刻公开",
  emailText: '',
})

const colorGroup = computed(() => {
  if (sendEmailDate.isOpen == "设为私密") {
    return "#ef4444";
  }
  if (sendEmailDate.isOpen == "寄达公开") {
    return "#eab308";
  }
  return "#409eff"
})

// 计算日期
const realDate = (num: number) => {
  sendEmailDate.dateString = new Date(new Date().getTime() + 86400000 * num)
}
const tips = ref('')

// checkTable
const checkTable = () => {
  if(sendEmailDate.emailTitle == '') {
    tips.value = '请填写邮件标题！'
  } else if(sendEmailDate.userEmail == '') {
    tips.value = '请填写你的邮箱！'
  } else if(!/^[\w._]+@(qq|gmail|163|yahoo|hotmail|outlook|sohu|sina|139)\.com(\r\n|\r|\n)?$/.test(sendEmailDate.userEmail)){
    tips.value = '请填写正确邮箱'
  } else if(sendEmailDate.sendEmail == '' && sendEmailDate.isSelf) {
    tips.value = '请填写TA的邮箱！'
  } else if(!/^[\w._]+@(qq|gmail|163|yahoo|hotmail|outlook|sohu|sina|139)\.com(\r\n|\r|\n)?$/.test(sendEmailDate.sendEmail) && sendEmailDate.isSelf) {
    tips.value = '请正确填写TA的邮箱！'
  } else if(new Date().getTime() - sendEmailDate.dateString.getTime() + 1000 * 60 * 60 > 0) {
    tips.value = '投递时间必须在一小时以后！'
  } else if(sendEmailDate.emailText == '' || sendEmailDate.emailText.length < 20) {
    tips.value = '邮件内容必须不能为空且大于20字！'
  } else {
    tips.value = ''
    ElMessage.success("发送成功！")
    return
  }
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
        <!-- <slot /> -->
        <div class="writeLetter-looking-box">
          <div class="writeLetter-looking">
            <!-- 站长寄语 -->
            <div class="writeLetter-looking-webmaster">
              <!-- 寄语 -->
              <div class="writeLetter-looking-webmaster-left">
                <p class="webmaster-left-title">🐶站长寄语</p>
                <div class="webmaster">
                  <p>
                    <strong>站长(开发者)：</strong><br>&emsp;你可以在感性/理性的时候在此页面撰写信件并选择在未来某个时间发送，
                    这些信件可以寄给自己或他人，或许在很久以后你已经忘记自己写过这封信，那么它就可以作为一个惊喜或珍贵的回忆来勾起你写信时的感受。
                    <br><strong>菠菜(邮差):</strong><br>&emsp;一定能准确地将你们的信封按时送出，并希望你们记录写信时的感受、故事或愿望，并跨越时间的长河，
                    将这些情感和思绪传递到未来。
                    通过信件这一传统但充满情感的媒介，创造独特且持久的记忆。
                  </p>
                </div>
              </div>
              <!-- 提交框 -->
              <div class="writeLetter-looking-webmaster-useMethods">
                <p style="margin-top: 10px;margin-bottom: 10px;font-size: 48px;text-align: center;">写信🌟</p>
                <div class="webmaster" style="display: flex;">
                  <div style="width: 480px;">
                    <div style="margin-left: 10px;margin-bottom: 10px;">
                      邮件标题：&emsp;
                      <ElInput maxlength="30" type="text" :show-word-limit="true"
                        input-style="font-family: YunFengHanChanTi;font-size: 18px;" v-model="sendEmailDate.emailTitle"
                        style="width: 360px;height: 40px;" placeholder="2024年写给菠菜的一封信" />
                    </div>
                    <div style="margin-left: 10px;margin-bottom: 10px;" :style="{ 'color' : sendEmailDate.userEmailReg  }">
                      你的邮箱：&emsp;
                      <ElInput maxlength="30" type="text" :show-word-limit="true"
                        input-style="font-family: YunFengHanChanTi;font-size: 18px;" v-model="sendEmailDate.userEmail"
                        style="width: 360px;height: 40px;" placeholder="此信息完全保密" />
                    </div>
                    <div style="margin-left: 10px;margin-bottom: 10px;">
                      给TA写信？&emsp;
                      <el-switch size="large" v-model="sendEmailDate.isSelf">
                        <template #active-action>
                          <span class="custom-active-action" style="font-size: 20px;">是</span>
                        </template>
                        <template #inactive-action>
                          <span class="custom-inactive-action" style="font-size: 20px;">否</span>
                        </template>
                      </el-switch>
                    </div>
                    <div style="margin-left: 10px;margin-bottom: 10px;" v-show="sendEmailDate.isSelf" :style="{ 'color' : sendEmailDate.sendEmailReg  }">
                      收信邮箱：&emsp;
                      <ElInput maxlength="30" type="text" :show-word-limit="true"
                        input-style="font-family: YunFengHanChanTi;font-size: 18px;" v-model="sendEmailDate.sendEmail"
                        style="width: 360px;height: 40px;" placeholder="尽量填写国内邮箱……" />
                    </div>
                    <div style="margin-left: 10px;margin-bottom: 10px;">
                      投递日期：&emsp;<el-date-picker :editable="false" :clearable="false" v-model="sendEmailDate.dateString" style="width: 360px;height: 40px;"
                        type="datetime" placeholder="请选择投递日期" />
                    </div>
                    <div style="margin-left: 10px;margin-bottom: 10px;">
                      <ElButton @click="realDate(1)">一天后</ElButton>
                      <ElButton @click="realDate(7)">一周后</ElButton>
                      <ElButton @click="realDate(365)">一年后</ElButton>
                    </div>
                    <div style="margin-left: 10px;margin-bottom: 10px;display: flex;align-items: center;">
                      <p>是否公开？</p>&emsp;
                      <el-radio-group v-model="sendEmailDate.isOpen" size="large" :fill="colorGroup">
                        <el-radio-button label="即刻公开" value="即刻公开" />
                        <el-radio-button label="寄达公开" value="寄达公开" />
                        <el-radio-button label="设为私密" value="设为私密" />
                      </el-radio-group>
                    </div>
                  </div>
                  <div style="width: 75px;margin-left: 10px;border-radius: 15px;">
                    <ElButton @click="checkTable" type="primary" style="width: 100%;height: 40px;border-radius: 20px;font-family: YunFengHanChanTi;font-size: 20px;">发送</ElButton>
                    <div style="width: 100%;height: calc(100% - 50px);margin-top: 10px;display: flex;justify-content: center;">
                      <div style="font-size: 14px;width: 16px;display: flex;justify-content: center;">
                        <p style="font-size: 20px;width: 18px;height: calc(100% - 50px);color: red;">
                          {{ tips }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 书写区 -->
            <div class="writeLetter-box">
              <MdEditor v-model="sendEmailDate.emailText" placeholder="<p style='color: red;'>这个子就可以变成红色了</p>" :toolbars="toolbars" />
            </div>
          </div>

        </div>
      </div>
    </div>
    <el-backtop :right="40" :bottom="40" :visibility-height="1000" />
  </div>
</template>


<style lang="scss" scoped>
.writeLetter-looking-box {
  --el-font-size-base: 18px;
  width: 1300px;
  height: 1200px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  .writeLetter-looking {
    width: 1000px;
    height: 100%;

    .writeLetter-looking-webmaster {
      width: 100%;
      height: 420px;
      border-radius: 15px;
      display: flex;

      .writeLetter-looking-webmaster-left {
        width: 400px;
        height: 100%;
        background-color: rgba($color: aqua, $alpha: 0.4);
        border-radius: 15px;
        text-align: center;

        .webmaster-left-title {
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: 48px;
        }

        .webmaster {
          padding: 0 5px;
          font-size: 24px;
          text-align: left;
        }
      }
    }

    .writeLetter-looking-webmaster-useMethods {
      width: 580px;
      height: 420px;
      margin-left: 20px;
      border-radius: 15px;
      background-color: rgba($color: #fff, $alpha: 0.4);

      .webmaster {
        padding: 0 5px;
        font-size: 20px;
        text-align: left;
      }
    }

    .writeLetter-box {
      width: 100%;
      height: 700px;
      // background-color: #fff;
      margin-top: 20px;
      border-radius: 15px;

      .md-editor {
        --md-bk-color: rgba($color: #fff, $alpha: 0.8);
        border-radius: 15px;
        height: 700px;
        background-color: rgba($color: #fff, $alpha: 0.8);
      }
    }
  }
}
</style>
