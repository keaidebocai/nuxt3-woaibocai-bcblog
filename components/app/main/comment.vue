<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
const text = ref(
  "### hello\n```java\npublic Result asd (){\n  return Result.build(null,ResultEnun.SUEES);\n}```"
);
const mynum = ref(1);
const thisCommentTotal = ref(3);
// 显示 加载 0 还是 收起 1
const lookButton = ref(0);
const handleSub = () => {
  if (lookButton.value == 1) {
    console.log("现在按钮是收起，初始化值将子评论变为1");
    mynum.value = 1;
    lookButton.value = 0;
    return;
  }
  if (mynum.value <= thisCommentTotal.value) {
    mynum.value += 1;
    if (mynum.value >= thisCommentTotal.value) {
      mynum.value = thisCommentTotal.value;
      console.log("评论已耗尽！");
      lookButton.value = 1;
      return;
    }
    console.log("现在加3页现在共" + mynum.value);
    return;
  }
};

const tmynum = ref(1);
const tthisCommentTotal = ref(7);
// 显示 加载 0 还是 收起 1
const tlookButton = ref(0);
const thandleSub = () => {
  if (tlookButton.value == 1) {
    console.log("现在按钮是收起，初始化值将子评论变为1");
    tmynum.value = 1;
    tlookButton.value = 0;
    return;
  }
  if (tmynum.value <= tthisCommentTotal.value) {
    tmynum.value += 3;
    if (tmynum.value >= tthisCommentTotal.value) {
      tmynum.value = tthisCommentTotal.value;
      console.log("评论已耗尽！");
      tlookButton.value = 1;
      return;
    }
    console.log("现在加3页现在共" + tmynum.value);
    return;
  }
};
</script>

<template>
  <div class="comment-box">
    <div class="comment-box-info">
      <span class="comment-box-info-span">21 条评论</span>
    </div>

    <div v-for="i in tmynum" class="comment-box-main">
      <img
        src="https://qiniu.woaibocai.top/static/img/tou.png"
        alt="用户头像"
        width="48px"
      />
      <div class="comment-box-main-rght">
        <div class="comment-box-main-rght-userInfo">
          <div class="comment-box-main-rght-userInfo-userName">
            <a href="#">一只猫</a>
          </div>
          <div style="display: none" class="myself"><h2>博主</h2></div>
          <div class="comment-box-main-rght-userInfo-icon">
            <div class="bang">
              <a title="点赞">
                <img src="~/assets/icon/bang0.png" alt="已点赞" />
              </a>
              <span>1</span>
            </div>
            <div class="bang">
              <a title="评论">
                <img src="~/assets/icon/comment.png" alt="评论" />
              </a>
              <span>1</span>
            </div>
          </div>
        </div>

        <div class="comment-box-main-rght-userInfo-content">
          <MdPreview previewTheme="github" :modelValue="text" />
        </div>
        <span>2024-01-08 12:00:00 · 陕西西安</span>
        <div v-for="i in mynum">
          <hr />
          <!-- 子评论 -->
          <div class="comment-sub-box-main">
            <img
              src="https://qiniu.woaibocai.top/static/img/tou.png"
              alt="用户头像"
              width="48px"
            />
            <div class="comment-sub-box-main-rght">
              <div class="comment-sub-box-main-rght-userInfo">
                <div class="comment-sub-box-main-rght-userInfo-userName">
                  <a href="#">一只猫</a>
                </div>
                <div style="display: none" class="myself-sub">
                  <h2>博主</h2>
                </div>
                <!-- <div class="comment-sub-box-main-rght-userInfo-date">
                  <span>2024-01-08 12:00:00 · 陕西西安</span>
                </div> -->
                <div class="comment-sub-box-main-rght-userInfo-icon">
                  <div class="bang-sub">
                    <a title="点赞">
                      <img src="~/assets/icon/bang0.png" alt="已点赞" />
                    </a>
                    <span>1</span>
                  </div>
                  <div class="bang-sub">
                    <a title="评论">
                      <img src="~/assets/icon/comment.png" alt="评论" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="comment-sub-box-main-rght-userInfo-to">
                <span class="to">回复</span>
                <span class="user">@一只狗:</span>
              </div>
              <div class="comment-sub-box-main-rght-userInfo-content">
                <MdPreview previewTheme="github" :modelValue="text" />
              </div>
              <span>2024-01-08 12:00:00 · 陕西西安</span>
            </div>
          </div>
          <!-- 子评论 -->
        </div>
        <div v-show="thisCommentTotal > 0" class="loadSub" @click="handleSub">
          <h3>{{ lookButton == 0 ? "加载更多" : "收起" }}</h3>
        </div>
      </div>
    </div>
  </div>
  <div v-show="tthisCommentTotal > 0" class="loadSub" @click="thandleSub">
    <h3>{{ tlookButton == 0 ? "加载更多" : "收起" }}</h3>
  </div>
</template>

<style lang="scss" scoped></style>
