<script setup lang="ts">
definePageMeta({
  layout: "mobile",
});
// import
useHead({
  title: "写信 - 时光邮局 - 时光信箱",
  meta: [
    {
      hid: "keywords",
      name: "keywords",
      content: "时光邮箱，时光信箱，菠菜的时光邮局，菠菜的小窝",
    },
  ],
});
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import type { ToolbarNames } from "md-editor-v3";
import { useTokenStore } from '~/store/useToken';
const useLocalInfo = useTokenStore()
const toolbars: ToolbarNames[] = [
  "bold",
  "underline",
  "italic",
  "strikeThrough",
  "sub",
  "sup",
  "orderedList",
  "task",
  "codeRow",
  "image",
];

// 发送数据 sendEmailReg
const sendEmailDate = reactive({
  emailTitle: '',
  userEmail: '123@qq.com',
  userEmailReg: computed(() => {
    if (sendEmailDate.userEmail == '') {
      return ''
    }
    if (!/^[\w._]+@(qq|gmail|163|yahoo|hotmail|outlook|sohu|sina|139)\.com(\r\n|\r|\n)?$/.test(sendEmailDate.userEmail)) {
      return 'red'
    }
    return ''
  }),
  sendEmail: '',
  sendEmailReg: computed(() => {
    if (sendEmailDate.sendEmail == '') {
      return ''
    }
    if (!/^[\w._]+@(qq|gmail|163|yahoo|hotmail|outlook|sohu|sina|139)\.com(\r\n|\r|\n)?$/.test(sendEmailDate.sendEmail)) {
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
  if (sendEmailDate.emailTitle == '') {
    tips.value = '请填写邮件标题！'
  } else if (sendEmailDate.userEmail == '') {
    tips.value = '请填写你的邮箱！'
  } else if (!/^[\w._]+@(qq|gmail|163|yahoo|hotmail|outlook|sohu|sina|139)\.com(\r\n|\r|\n)?$/.test(sendEmailDate.userEmail)) {
    tips.value = '请填写正确邮箱'
  } else if (sendEmailDate.sendEmail == '' && sendEmailDate.isSelf) {
    tips.value = '请填写TA的邮箱！'
  } else if (!/^[\w._]+@(qq|gmail|163|yahoo|hotmail|outlook|sohu|sina|139)\.com(\r\n|\r|\n)?$/.test(sendEmailDate.sendEmail) && sendEmailDate.isSelf) {
    tips.value = '请正确填写TA的邮箱！'
  } else if (new Date().getTime() - sendEmailDate.dateString.getTime() + 1000 * 60 * 60 > 0) {
    tips.value = '投递时间必须在一小时以后！'
  } else if (sendEmailDate.emailText == '' || sendEmailDate.emailText.length < 20) {
    tips.value = '邮件内容必须不能为空且大于20字！'
  } else {
    tips.value = ''
    ElMessage.success("发送成功！")
    return
  }
}

const onBlurBySave = () => {
  useLocalInfo.saveEmailText(sendEmailDate.emailText)
}
onMounted(() =>{
  sendEmailDate.emailText = useLocalInfo.getEmailText
})
// 监听邮件内容数据
watch(() => { return sendEmailDate.emailText},() => {
  onBlurBySave()
})
</script>

<template>
  <el-row>
    <el-col :span="22">
      <div class="writeLetter-looking-box">
        <div class="writeLetter-looking">
          <!-- 站长寄语 -->
          <div class="writeLetter-looking-webmaster">
            <!-- 寄语 -->
            <div class="writeLetter-looking-webmaster-left">
              <p class="webmaster-left-title">🐶站长寄语</p>
              <div class="webmaster">
                <p style="padding-bottom: 1rem;">
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
              <p style="margin-top: 10px;margin-bottom: 10px;font-size: 3.5rem;text-align: center;padding-top: 20px;">
                写信🌟</p>
              <div class="webmaster">
                <div style="width: calc(100% - 10px);">
                  <div style="margin-left: 10px;margin-bottom: 10px;">
                    <div>
                      邮件标题：&emsp;
                    </div>
                    <ElInput maxlength="30" type="text" :show-word-limit="true"
                      input-style="font-family: YunFengHanChanTi;font-size: 18px;" v-model="sendEmailDate.emailTitle"
                      style="width: 100%;height: 40px;margin-top: 8px;" placeholder="2024年写给菠菜的一封信" />
                  </div>
                  <div style="margin-left: 10px;margin-bottom: 10px;"
                    :style="{ 'color': sendEmailDate.userEmailReg }">
                    <div>
                      你的邮箱：&emsp;
                    </div>
                    <ElInput maxlength="30" type="text" :show-word-limit="true"
                      input-style="font-family: YunFengHanChanTi;font-size: 18px;" v-model="sendEmailDate.userEmail"
                      style="width: 100%;height: 40px;margin-top: 8px;" placeholder="此信息完全保密，通知发信状态" />
                  </div>
                  <div style="margin-left: 10px;margin-bottom: 10px;">
                    <div>
                      给TA写信？&emsp;
                    </div>
                    <el-switch size="large" v-model="sendEmailDate.isSelf">
                      <template #active-action>
                        <span class="custom-active-action" style="font-size: 20px;">是</span>
                      </template>
                      <template #inactive-action>
                        <span class="custom-inactive-action" style="font-size: 20px;">否</span>
                      </template>
                    </el-switch>
                  </div>
                  <div style="margin-left: 10px;margin-bottom: 10px;" v-show="sendEmailDate.isSelf"
                    :style="{ 'color': sendEmailDate.sendEmailReg }">
                    <div>
                      收信邮箱：&emsp;
                    </div>
                    <ElInput maxlength="30" type="text" :show-word-limit="true"
                      input-style="font-family: YunFengHanChanTi;font-size: 18px;" v-model="sendEmailDate.sendEmail"
                      style="width: 100%;height: 40px;margin-top: 10px;" placeholder="收信人信箱" />
                  </div>
                  <div style="margin-left: 10px;margin-bottom: 10px;">
                    <div>
                      投递日期：&emsp;
                    </div><el-date-picker :editable="false" :clearable="false" v-model="sendEmailDate.dateString"
                      style="width: 100%;height: 40px;" type="datetime" placeholder="请选择投递日期" />
                  </div>
                  <div style="margin-left: 10px;margin-bottom: 10px;">
                    <ElButton style="font-family: YunFengHanChanTi;" @click="realDate(1)">一天</ElButton>
                    <ElButton style="font-family: YunFengHanChanTi;" @click="realDate(7)">一周</ElButton>
                    <ElButton style="font-family: YunFengHanChanTi;" @click="realDate(365)">一年</ElButton>
                    <ElButton style="font-family: YunFengHanChanTi;" @click="realDate(521)">521天</ElButton>
                  </div>
                  <div
                    style="margin-left: 10px;margin-bottom: 10px;margin-top: 10px;display: flex;justify-content: center;align-items: center;height: 60px;">
                    <el-radio-group style="width: 100%;" v-model="sendEmailDate.isOpen" size="default" :fill="colorGroup">
                      <el-radio-button label="即刻公开" value="即刻公开" />
                      <el-radio-button label="寄达公开" value="寄达公开" />
                      <el-radio-button label="设为私密" value="设为私密" />
                    </el-radio-group>
                  </div>

                  <div style="width: 100%;margin-left: 10px;border-radius: 15px;">
                    <ElButton @click="checkTable" type="primary"
                      style="width: calc(100% - 10px);height: 40px;border-radius: 20px;font-family: YunFengHanChanTi;font-size: 20px;">
                      发送</ElButton>
                    <div
                      style="width: 100%;height: calc(100% - 50px);margin-top: 10px;display: flex;justify-content: center;">
                      <div style="font-size: 14px;width: 100%;display: flex;justify-content: center;">
                        <p style="font-size: 20px;width: 100%;height: calc(100% - 50px);color: red;text-align: center;margin-bottom: 10px;">
                          {{ tips }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 书写区 -->
          <div class="writeLetter-box-m">
            <MdEditor v-model="sendEmailDate.emailText" placeholder="1.&nbsp;请在此输入内容……&#10;2.&nbsp;内容会自动保存到你的本地，不小心手滑关了浏览器也无需担心……&#10;3.&nbsp;<p style='color: red;'>这段文字就可以变成红色了</p>&#10;4.&nbsp;长按工具栏的图片点击 上传图片 即可获取到 图片链接&#10;5.&nbsp;**这里是要加粗的字体**(直接点击工具栏的B然后再输入也可)&#10;6.&nbsp;<u>这里是要加下划线的的字体</u>&#10;7.&nbsp;<u>**这里是要加粗加下划线的的字体**</u>"
              :toolbars="toolbars" @onBlur="onBlurBySave"/>
          </div>
        </div>
      </div>
      <AppButtom :is-mobile="true" :my-class="'MyButtomMobile'" />
    </el-col>
  </el-row>
</template>

<style>
.writeLetter-box-m .md-editor-content {
  display: block;
}
.writeLetter-box-m .md-editor-input-wrapper {
  width: 100% !important;
  height: 300px !important; 
}
/* .writeLetter-box-m .md-editor-resize-operate {
  display: none;
} */
</style>

<style lang="scss" scoped>
.el-row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.writeLetter-looking-box {
  --el-font-size-base: 18px;
  width: 93vw;
  margin-top: 10px;

  .writeLetter-looking {
    width: 100%;
    height: 100%;

    .writeLetter-looking-webmaster {
      width: 100%;
      // height: 460px;
      border-radius: 15px;
      .writeLetter-looking-webmaster-left {
        width: 100%;
        height: 100%;
        background-color: rgba($color: aqua, $alpha: 0.4);
        border-radius: 15px;
        text-align: center;

        .webmaster-left-title {
          padding-top: 20px;
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: 48px;
        }

        .webmaster {
          // width: calc(100% - 20px);
          padding: 0 10px;
          font-size: 24px;
          text-align: left;
        }
      }
    }

    .writeLetter-looking-webmaster-useMethods {
      // width: 100%;
      border-radius: 15px;
      background-color: rgba($color: #fff, $alpha: 0.4);

      .webmaster {
        padding: 0 5px;
        font-size: 20px;
      }
    }

    .writeLetter-box-m {
      width: 100%;
      // background-color: #fff;
      margin-top: 20px;
      border-radius: 15px;
      .md-editor {
        --md-bk-color: rgba($color: #fff, $alpha: 0.8);
        border-radius: 15px;
        background-color: rgba($color: #fff, $alpha: 0.8);
        min-height: 300px;
        height: auto;
      }
    }
  }
}
</style>
