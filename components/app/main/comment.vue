<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

import { GetPageCommentByArticle } from "~/api/blog/comment";
type TwoCommentType = {
  id: string;
  sendId: string;
  sendUserAvater: string;
  sendUserNickName: string;
  replyId: string;
  replyUserAvater: string;
  replyUserNickName: string;
  createTime: string;
  content: string;
  parentId: string;
  likeCount: number;
  address: string;
  isShow: boolean;
  replyCommentId: string;
};
type OneCommentType = {
  id: string;
  sendId: string;
  sendUserAvater: string;
  sandUserNickName: string;
  createTime: string;
  content: string;
  likeCount: number;
  address: string;
  isShow: boolean;
  oneCommentVoList: [data: TwoCommentType];
};
type CommentType = {
  code: number;
  message: string;
  data: {
    total: number;
    comment: [data: OneCommentType];
  };
};
const commentData = ref<CommentType>();

const mynum = ref(1);
const thisCommentTotal = ref(2);
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
    console.log("现在加1页现在共" + mynum.value);
    return;
  }
};

const tmynum = ref(1);
const tthisCommentTotal = ref(2);
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
    tmynum.value += 1;
    if (tmynum.value >= tthisCommentTotal.value) {
      tmynum.value = tthisCommentTotal.value;
      console.log("评论已耗尽！");
      tlookButton.value = 1;
      return;
    }
    console.log("现在加1页现在共" + tmynum.value);
    return;
  }
  tmynum.value = tthisCommentTotal.value;
  console.log("评论已耗尽！");
  tlookButton.value = 1;
};
const getOneCommentData = async () => {
  // 3be273791def4569895bf12cbe94a944
  // 2bd8ecc2bfd24912a7405c3a05f818f0
  const responesd: CommentType = await GetPageCommentByArticle(
    "2bd8ecc2bfd24912a7405c3a05f818f0",
    1,
    2
  );
  commentData.value = responesd;
  for (const one of commentData.value.data.comment) {
    one.isShow = false;
    for (const two of one.oneCommentVoList) {
      two.isShow = false;
    }
  }
  tthisCommentTotal.value = commentData.value.data.comment.length;

  console.log(responesd);
};
const itemsShow = (index: number) => {
  console.log(index);
};
const itemsShow1 = (address, index, tindex) => {
  console.log(address);
  console.log(index);
  console.log(tindex);
};
getOneCommentData();
</script>

<template>
  <div class="comment-box" v-show="commentData?.data.total > 0">
    <div class="comment-box-info">
      <span class="comment-box-info-span"
        >{{ commentData?.data.total }} 条评论</span
      >
    </div>

    <div
      v-for="(comment, index) in commentData?.data.comment.slice(0, tmynum)"
      :key="index"
      class="comment-box-main"
    >
      <img :src="comment.sendUserAvater" alt="用户头像" width="48px" />
      <div class="comment-box-main-rght">
        <div class="comment-box-main-rght-userInfo">
          <div class="comment-box-main-rght-userInfo-userName">
            <a href="#">{{ comment.sandUserNickName }}</a>
          </div>
          <div v-show="comment.sendId == '114514'" class="myself">
            <h2>博主</h2>
          </div>
          <div class="comment-box-main-rght-userInfo-icon">
            <div class="bang">
              <a title="点赞">
                <img src="~/assets/icon/bang0.png" alt="已点赞" />
              </a>
              <span>{{ comment.likeCount }}</span>
            </div>
            <div class="bang">
              <a title="评论">
                <img
                  @click="comment.isShow = true"
                  src="~/assets/icon/comment.png"
                  alt="评论"
                />
              </a>
              <span>{{ comment.oneCommentVoList.length }}</span>
            </div>
          </div>
        </div>

        <div class="comment-box-main-rght-userInfo-content">
          <MdPreview previewTheme="github" :modelValue="comment.content" />
        </div>
        <span>{{
          comment.createTime.replace("T", " ") + " · " + comment.address
        }}</span>
        <!-- 回复板块在这里！ -->
        <div
          v-show="comment.isShow"
          class="comment-box-main-rght-userInfo-sendComment"
        >
          <textarea rows="5" placeholder="登录才能让菠菜知道你是谁！" />
          <div class="comment-box-main-rght-userInfo-sendComment-button">
            <button class="send" style="background-color: #03a2f0">发送</button>
            <button class="letLook">预览</button>
            <button @click="comment.isShow = false" class="seeyou">取消</button>
          </div>
        </div>
        <div
          v-for="(oneComment, tindex) in comment.oneCommentVoList"
          :key="tindex"
        >
          <hr />
          <!-- 子评论 -->
          <div class="comment-sub-box-main">
            <img
              :src="oneComment.replyUserAvater"
              alt="用户头像"
              width="48px"
            />
            <div class="comment-sub-box-main-rght">
              <div class="comment-sub-box-main-rght-userInfo">
                <div class="comment-sub-box-main-rght-userInfo-userName">
                  <a href="#">{{ oneComment.sendUserNickName }}</a>
                </div>
                <div v-show="oneComment.sendId == '114514'" class="myself-sub">
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
                    <span>{{ oneComment.likeCount }}</span>
                  </div>
                  <div class="bang-sub">
                    <a title="评论">
                      <img
                        @click="oneComment.isShow = true"
                        src="~/assets/icon/comment.png"
                        alt="评论"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div class="comment-sub-box-main-rght-userInfo-to">
                <span class="to">回复</span>
                <span class="user">{{
                  "@ " + oneComment.sendUserNickName + " :"
                }}</span>
              </div>
              <div class="comment-sub-box-main-rght-userInfo-content">
                <MdPreview
                  previewTheme="github"
                  :modelValue="oneComment.content"
                />
              </div>
              <span>{{
                oneComment.createTime.replace("T", " ") +
                " · " +
                oneComment.address
              }}</span>
              <!-- 回复板块在这里！ -->
              <div
                v-show="oneComment.isShow"
                class="comment-sub-box-main-rght-userInfo-sendComment"
              >
                <textarea rows="5" placeholder="登录才能让菠菜知道你是谁！" />
                <div
                  class="comment-sub-box-main-rght-userInfo-sendComment-button"
                >
                  <button class="send" style="background-color: #03a2f0">
                    发送
                  </button>
                  <button class="letLook">预览</button>
                  <button @click="oneComment.isShow = false" class="seeyou">
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- 子评论 -->
        </div>
        <!-- <div v-show="thisCommentTotal > 1" class="loadSub" @click="handleSub">
          <h3>{{ lookButton == 0 ? "加载更多" : "收起" }}</h3>
        </div> -->
      </div>
    </div>
  </div>
  <div v-show="commentData?.data.total > 0" class="loadSub" @click="thandleSub">
    <h3 v-show="tthisCommentTotal > 0">
      {{ tlookButton == 0 ? "加载更多" : "收起" }}
    </h3>
  </div>
</template>

<style lang="scss" scoped></style>
