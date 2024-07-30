<script setup lang="ts">
definePageMeta({
  layout: "email",
});
useHead({
  title: "写信 - 时光邮局 - 时光信箱"
});

import { MdEditor, MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import type { ToolbarNames } from "md-editor-v3";
import { useTokenStore } from '~/store/useToken';
import { SendEmailContent } from '~/api/email/user';
const useLocalInfo = useTokenStore()
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
const userInfo = reactive({
  nickName: '',
  avatar: '',
  sex: '',
  userId: '',
  email: ''
})
// 发送数据 sendEmailReg
const sendEmailDate = reactive({
  emailTitle: '',
  userEmail: userInfo.email,
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
    if (useLocalInfo.getUserInfo.email) {
      sendEmailDate.userEmail = userInfo.email
      tips.value = '您是登录用户，已自动帮你填入邮箱'
    } else {
      tips.value = '请填写你的邮箱！'
    }
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
    dialogVisible.value = true
    handleClose()
    return
  }
}
const onBlurBySave = () => {
  useLocalInfo.saveEmailText(sendEmailDate.emailText)
}

// 监听邮件内容数据
watch(() => { return sendEmailDate.emailText }, () => {
  onBlurBySave()
})

// 发送请求
// 防抖
const isSucceed = ref(true)
const sendData = computed(() => {
  let recipient = sendEmailDate.sendEmail;
  if (!sendEmailDate.isSelf) {
    recipient = sendEmailDate.userEmail
  }
  return {
    id: '',
    userId: userInfo.userId || '',
    title: sendEmailDate.emailTitle,
    senderEmail: sendEmailDate.userEmail,
    recipientEmail: recipient,
    isPublic: sendEmailDate.isOpen == "即刻公开" ? "Y" : (sendEmailDate.isOpen == "寄达公开" ? "W" : "N"),
    content: sendEmailDate.emailText,
    deliveryTime: sendEmailDate.dateString,
  }
})
onMounted(() => {
  sendEmailDate.emailText = useLocalInfo.getEmailText
  userInfo.email = useLocalInfo.getUserInfo.email
  userInfo.userId = useLocalInfo.getUserInfo.userId
})
const dialogVisible = ref(false)
const handleClose = () => {
  //  /\!\[\]\((.*?)\)/gi 提取markdown的图片
  // 去掉图片里的描述
  let quitdes = sendData.value.content.replace(/\[(.*?)\]/gi,"[]");
  console.log(quitdes)
  // 把markdown的标签转成html的
  let newDate = quitdes.replace(/\!\[\]\((.*?)\)/gi, '<div style="display: flex;justify-content: center;align-items: center;width: 100%;margin: 10px 0;"><img width="300" style="border-radius: 15px;" src="$1"></div><br>')
  console.log(newDate)
  sendData.value.content = newDate
}
const toYearMonDayHourMin = (date: Date) => {
   return date.getFullYear()+"年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" + date.getHours() + ":" + date.getMinutes();
}
const hasDays = (now: Date,after: Date) => {
  return Math.ceil((after.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) > 1 ? (Math.ceil((after.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) + "天后送达") : (Math.ceil((after.getTime() - now.getTime()) / (1000 * 60 * 60)) + "小时后送达")
}

const clearSendEmailData = () => {
  sendEmailDate.emailTitle=  '',
  sendEmailDate.userEmail=  userInfo.email,
  sendEmailDate.sendEmail=  '',
  sendEmailDate.isSelf=  false,
  sendEmailDate.dateString=  new Date(),
  sendEmailDate.isOpen=  "即刻公开",
  sendEmailDate.emailText=  ''
}

// 发送请求
const sendEmailContentPrimise = async() => {
  // 防抖 锁上
  isSucceed.value = false
  await SendEmailContent(sendData.value).then(res => {
    if(res.code == 200) {
      // 清理缓存
      useLocalInfo.removeEmailText()
      // 清空表单
      clearSendEmailData()
      // 发送提示
      ElMessage.success("发送成功！")
      // 放开 防抖
      isSucceed.value = true
      // 关闭 预览弹窗
      dialogVisible.value = false
      return
    }
    // 放开
    isSucceed.value = true
    ElMessage.error(res.message)
    return
  }).catch(err => {
    isSucceed.value = true
    console.log(err)
    ElMessage.error("网络错误，请稍后再试或联系站长！")
  })
}
import { UserOnUploadImage } from "~/api/blog/comment";
const onUploadImg = async (
  files: File[],
  callback: (result: string[]) => void
) => {
  const form = new FormData();
  files.map((file: File) => {
    // files 这个必须和后端所要求的字段名 一摸一样
    form.append("files", file);
  });
  const res = await UserOnUploadImage(form).then(res => {
    if(res.code == 200) {
      ElMessage.success("上传成功！")
      return res
    }
    ElMessage.error("图片过大/登录之后才可以上传图片！")
  }).catch(err => {
    ElMessage.error("图片过大/登录之后才可以上传图片！")
    return;
  })

  // 切记这是个数组
  callback(res.data);
};
</script>

<template>
  <!-- 与发送前的预览 -->
  <ClientOnly>
    <el-dialog v-model="dialogVisible" title="预览" width="800">
      <div class="preview-diolog-box">
        <div class="preview-diolog">
          <div class="selection-letters-text-box">
            <div class="selection-letters-text">
              <div class="selection-letters-text-item-box">
                <div class="selection-letters-text-item">
                  <!-- 底栏 -->
                  <div class="selection-letters-text-item-bottom-box">
                    <div class="selection-letters-text-item-bottom">
                      <p style="font-size: 24px;margin-right: 10px;color: red;">发信人：</p>
                      <p style="font-size: 20px;margin-right: 30px;">{{ sendData.senderEmail }}</p>
                      <p style="font-size: 24px;margin-right: 10px;color: red;">收信人：</p>
                      <p style="font-size: 20px;margin-right: 10px;">{{ sendData.recipientEmail }}</p>
                    </div>
                  </div>
                  <div class="selection-letters-text-item-bottom-box">
                    <div class="selection-letters-text-item-bottom">
                      <p style="font-size: 24px;margin-right: 10px;color: red;">投递日期：</p>
                      <p style="font-size: 20px;margin-right: 30px;">{{ toYearMonDayHourMin(new Date()) }} → {{ toYearMonDayHourMin(sendEmailDate.dateString) }}</p>
                      <IconDelivering />
                      <p style="font-size: 20px;margin-right: 10px;margin-left: 10px;">{{ hasDays(new Date(),sendEmailDate.dateString) }}</p>
                    </div>
                  </div>
                  <div class="selection-letters-text-item-bottom-box">
                    <div class="selection-letters-text-item-bottom">
                      <p style="font-size: 24px;margin-right: 10px;color: red;">是否公开：</p>
                      <p style="font-size: 20px;margin-right: 10px;">{{ sendData.isPublic == 'Y' ? "即刻公开" : (sendData.isPublic == 'W' ? "寄达公开" : "设为私密") }}</p>
                    </div>
                  </div>
                  <!-- 投递状态和间隔时间 -->
                  <!-- <div class="selection-letters-text-item-delivery-box">
                                <div style="display: flex;align-items: center;" v-if="true">
                                    <IconService />
                                    <p style="margin-left: 5px;font-size: 18px;">已投递·跨越1年3月的时光</p>
                                </div>
                                <div style="display: flex;align-items: center;" v-if="false">
                                    <IconDelivering />
                                    <p style="margin-left: 5px;font-size: 18px;">正在1年3月的时光旅行中...</p>
                                </div>
                            </div> -->
                  <div style="display: flex;justify-content: center;align-items: center;height: 60px;">
                    <hr style="width: calc(50% - 100px);border-top: 1px solid #7e8e9b;margin-right: 10px;">
                    <IconNowDelivery />
                    <p style="font-size: 16px;color: #7e8e9b;margin-left: 5px;">书信内容</p>
                    <hr style="width: calc(50% - 100px);border-top: 1px solid #7e8e9b;margin-left: 10px;">
                  </div>
                  <!-- 信件标题 -->
                  <div class="selection-letters-text-item-title">
                    <p style="font-size: 28px;font-weight: bolder;">{{ sendData.title }}</p>
                  </div>
                  <!-- 信件内容 -->
                  <div class="selection-letters-text-item-text">
                    <MdPreview previewTheme="vuepress" editorId="asdasdas" :modelValue="sendData.content" />
                  </div>
                  <!-- 就此搁笔 -->
                  <div style="display: flex;justify-content: center;align-items: center;height: 60px;">
                    <hr style="width: calc(50% - 100px);border-top: 1px solid #005293;margin-right: 10px;">
                    <IconWriteLetters />
                    <p style="font-size: 16px;color: #005293;">就此搁笔</p>
                    <hr style="width: calc(50% - 100px);border-top: 1px solid #005293;margin-left: 10px;">
                  </div>
                </div>
              </div>
              <!-- 分页 -->
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消发送</el-button>
          <el-button type="primary" :disabled="!isSucceed" @click="sendEmailContentPrimise">
            确认发送
          </el-button>
        </div>
      </template>
    </el-dialog>
  </ClientOnly>
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
                    <div v-show="!userInfo.email" style="margin-left: 10px;margin-bottom: 10px;"
                      :style="{ 'color': sendEmailDate.userEmailReg }">
                      你的邮箱：&emsp;
                      <ElInput maxlength="30" type="text" :show-word-limit="true"
                        input-style="font-family: YunFengHanChanTi;font-size: 18px;" v-model="sendEmailDate.userEmail"
                        style="width: 360px;height: 40px;" placeholder="此信息完全保密，通知发信状态" />
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
                    <div style="margin-left: 10px;margin-bottom: 10px;" v-show="sendEmailDate.isSelf"
                      :style="{ 'color': sendEmailDate.sendEmailReg }">
                      收信邮箱：&emsp;
                      <ElInput maxlength="30" type="text" :show-word-limit="true"
                        input-style="font-family: YunFengHanChanTi;font-size: 18px;" v-model="sendEmailDate.sendEmail"
                        style="width: 360px;height: 40px;" placeholder="收信人信箱" />
                    </div>
                    <div style="margin-left: 10px;margin-bottom: 10px;">
                      投递日期：&emsp;
                      <ClientOnly>
                        <el-date-picker :editable="false" :clearable="false" v-model="sendEmailDate.dateString"
                          style="width: 360px;height: 40px;" type="datetime" placeholder="请选择投递日期" />
                      </ClientOnly>
                    </div>
                    <div style="margin-left: 110px;margin-bottom: 10px;">
                      <ElButton style="font-family: YunFengHanChanTi;border-radius: 15px;" @click="realDate(1)">一天
                      </ElButton>
                      <ElButton style="font-family: YunFengHanChanTi;border-radius: 15px;" @click="realDate(7)">一周
                      </ElButton>
                      <ElButton style="font-family: YunFengHanChanTi;border-radius: 15px;" @click="realDate(365)">一年
                      </ElButton>
                      <ElButton style="font-family: YunFengHanChanTi;border-radius: 15px;" @click="realDate(521)">521天
                      </ElButton>
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
                    <ElButton @click="checkTable" type="primary"
                      style="width: 100%;height: 40px;border-radius: 20px;font-family: YunFengHanChanTi;font-size: 20px;">
                      发送</ElButton>
                    <div
                      style="width: 100%;height: calc(100% - 50px);margin-top: 10px;display: flex;justify-content: center;">
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
            <!-- 提示 -->
             <div style="width: 100%;height: 40px;border-radius:10px;margin-top: 10px;background-color: #fde2e2;border: 1px solid #c45656;display: flex;align-items: center;">
              <p style="color: #F56C6C;margin-left: 10px;font-size: 18px;">
                ⭐书写时不用理会图片的大小,点击"发送"按钮后可以看到信件投递后的真实样子;
              </p>
             </div>
            <!-- 书写区 -->
            <div class="writeLetter-box">
              <MdEditor @onUploadImg="onUploadImg" :toolbars="toolbars" @onBlur="onBlurBySave" v-model="sendEmailDate.emailText"
                placeholder="1.&nbsp;请在此输入内容……&#10;2.&nbsp;内容会自动保存到你的本地，不小心手滑关了浏览器也无需担心……&#10;3.&nbsp;<p style='color: red;'>这段文字就可以变成红色了</p>&#10;4.&nbsp;长按工具栏的图片点击 上传图片 即可获取到 图片链接&#10;5.&nbsp;**这里是要加粗的字体**(直接点击工具栏的B然后再输入也可)&#10;6.&nbsp;<u>这里是要加下划线的的字体</u>&#10;7.&nbsp;<u>**这里是要加粗加下划线的的字体**</u>" />
            </div>
          </div>

        </div>
      </div>
    </div>
    <el-backtop :right="40" :bottom="40" :visibility-height="1000" />
  </div>
</template>

<style>
.preview-diolog .selection-letters-text-item-text .md-editor-preview-wrapper {
  padding: 0 35px;
}
</style>

<style lang="scss" scoped>
.preview-diolog-box {
  width: 100%;

  .preview-diolog {
    width: 100%;
    height: 100%;

    // 信件内容
    .selection-letters-text-box {
      width: 100%;
      margin-top: 15px;
      display: flex;
      justify-content: center;

      .selection-letters-text {
        width: 860px;

        .selection-letters-text-item-box {
          width: 100%;
          // background-color: antiquewhite;
          border-radius: 10px;
          margin-bottom: 15px;
          display: flex;
          justify-content: center;
          align-items: center;

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
              justify-content: center;
              font-weight: bolder;
            }

            // 内容
            .selection-letters-text-item-text {
              width: 100%;
              text-decoration: none;
            }

            // 底栏
            .selection-letters-text-item-bottom-box {
              width: 100%;
              height: 30px;
              display: flex;
              align-items: center;

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
                  font-size: 18px;
                  justify-content: center;
                  border-radius: 5px;
                  margin-right: 15px;
                  box-shadow: 0px 0px 2px #7696be;
                }

                .selection-letters-text-item-bottom-button-love {
                  background-color: #fde2e2;
                  color: #d8331d;
                  min-width: 80px;
                  height: 25px;
                  display: flex;
                  align-items: center;
                  font-size: 18px;
                  justify-content: center;
                  border-radius: 5px;
                  margin-right: 15px;
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
      }
    }
  }
}

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
      margin-top: 15px;
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
