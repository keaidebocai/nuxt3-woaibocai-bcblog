<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

import {
  GetPageCommentByArticle,
  ReplyOneComment,
  SendOneComment,
  UserOnUploadImage,
  LikeThisComment,
  QuitLikeThisComment,
} from "~/api/blog/comment";

import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import type { ToolbarNames } from "md-editor-v3";
const props = defineProps(["articleId", "commentType"]);
const text = ref("");
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
  "code",
  "link",
  "image",
  "table",
  "mermaid",
  "katex",
  "pageFullscreen",
];
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
  isLike: boolean;
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
  isLike: boolean;
  oneCommentVoList: [TwoCommentType];
};
type CommentType = {
  code: number;
  message: string;
  data: {
    total: number;
    comment: [OneCommentType];
  };
};
type ResponesdData<T> = {
  code: number;
  message: string;
  data: T;
};
const commentData = ref<CommentType>();
const page = ref({
  current: 1,
  size: 5,
});
const nowTotal = ref(0);
const getOneCommentData = async () => {
  // 3be273791def4569895bf12cbe94a944
  // 2bd8ecc2bfd24912a7405c3a05f818f0
  const responesd: CommentType = await GetPageCommentByArticle(
    props.articleId,
    1,
    5
  );
  commentData.value = responesd;
  if (!commentData.value.data.comment) {
    commentData.value.data.total == -1;
    return;
  }
  for (const one of commentData.value.data.comment) {
    one.isShow = false;
    one.isLike = false;
    if (one.oneCommentVoList) {
      nowTotal.value += one.oneCommentVoList.length + 1;
      for (const two of one?.oneCommentVoList) {
        two.isShow = false;
        two.isLike = false;
      }
    } else {
      nowTotal.value += 1;
    }
  }
};
type ReplyOneCommentType = {
  replyCommentId: string;
  sendCommentUserId: string;
  replyCommentUserId: string;
  content: string;
  address: string;
  articleId: string;
  parentId: string;
};
// 回复一级评论
const replyOneComment = async (
  replyCommentId: string,
  replyCommentUserId: string,
  content: string,
  parentId: string,
  index: number
) => {
  const data: ReplyOneCommentType = {
    replyCommentId: replyCommentId,
    sendCommentUserId: "",
    replyCommentUserId: replyCommentUserId,
    content: content,
    address: "",
    articleId: props.articleId,
    parentId: parentId,
  };
  await ReplyOneComment(data).then((res: ResponesdData<TwoCommentType>) => {
    const twoComment = ref();
    twoComment.value = res.data;
    commentData.value.data.comment[index].isShow = false;
    commentData.value.data.comment[index].oneCommentVoList.push(
      twoComment.value
    );
    commentData.value.data.total += 1;
    text.value = "";
  });
  // .catch((err) => {
  //   // if (res.code == 204) {
  //   //   ElMessage.error(res.message);
  //   //   ElMessage.error(res.data);
  //   // }
  //   text.value = "";
  //   throw new Error(err);
  // });
};
const replyTwoComment = async (
  replyCommentId: string,
  replyCommentUserId: string,
  content: string,
  parentId: string,
  index: number,
  tindex: number
) => {
  const data: ReplyOneCommentType = {
    replyCommentId: replyCommentId,
    sendCommentUserId: "",
    replyCommentUserId: replyCommentUserId,
    content: content,
    address: "",
    articleId: props.articleId,
    parentId: parentId,
  };
  await ReplyOneComment(data)
    .then((res: ResponesdData<TwoCommentType>) => {
      const twoComment = ref();
      twoComment.value = res.data;
      commentData.value.data.comment[index].oneCommentVoList[tindex].isShow =
        false;
      commentData.value.data.comment[index]?.oneCommentVoList.push(
        twoComment.value
      );
      commentData.value.data.total += 1;
      text.value = "";
    })
    .catch((err) => {
      // if (res.code == 204) {
      //   ElMessage.error(res.message);
      //   ElMessage.error(res.data);
      // }
      text.value = "";
      throw new Error(err);
    });
};

// 发送 一级标题
type SendOneCommentType = {
  articleId: string;
  content: string;
  userId: string;
  address: string;
};
const sendOneComment = async (content: string) => {
  const data: SendOneCommentType = {
    articleId: props.articleId,
    content: text.value,
    userId: "",
    address: "",
  };
  await SendOneComment(data)
    .then((res: ResponesdData<OneCommentType>) => {
      if (res.code == 204) {
        ElMessage.info(res.message);
        ElMessage.info(res.data);
      }
      const oneComment = ref();
      oneComment.value = res.data;
      oneComment.value.oneCommentVoList = [];
      commentData.value.data.comment.push(oneComment.value);
      commentData.value.data.total += 1;
      text.value = "";
      ElMessage.success("发送成功！");
    })
    .catch((err) => {
      text.value = "";
      ElMessage.error("发送失败，可以先尝试登陆或等待……");
      throw new Error();
    });
};
const onUploadImg = async (
  files: File[],
  callback: (result: string[]) => void
) => {
  const form = new FormData();
  files.map((file: File) => {
    // files 这个必须和后端所要求的字段名 一摸一样
    form.append("files", file);
  });
  const res = await UserOnUploadImage(form);
  // 切记这是个数组
  callback(res.data);
};
const oneIsLike = async (index: number) => {
  if (!commentData.value.data.comment[index].isLike) {
    const res = await LikeThisComment(commentData.value.data.comment[index].id);
    if (res.code == 200) {
      commentData.value.data.comment[index].likeCount = res.data;
      commentData.value.data.comment[index].isLike = true;
      ElMessage.success(res.message);
      return;
    }
    ElMessage.error("操作失败！");
    return;
  }
  const res = await QuitLikeThisComment(
    commentData.value.data.comment[index].id
  );
  if (res.code == 200) {
    commentData.value.data.comment[index].likeCount = res.data;
    commentData.value.data.comment[index].isLike = false;
    ElMessage.success(res.message);
    return;
  }
  ElMessage.error("操作失败！");
};
const twoIsLike = async (index: number, tindex: number) => {
  if (!commentData.value.data.comment[index].oneCommentVoList[tindex].isLike) {
    const res = await LikeThisComment(
      commentData.value.data.comment[index].oneCommentVoList[tindex].id
    );
    if (res.code == 200) {
      commentData.value.data.comment[index].oneCommentVoList[tindex].likeCount =
        res.data;
      commentData.value.data.comment[index].oneCommentVoList[tindex].isLike =
        true;
      ElMessage.success(res.message);
      return;
    }
    ElMessage.success("操作失败！");
    return;
  }
  const res = await QuitLikeThisComment(
    commentData.value.data.comment[index].oneCommentVoList[tindex].id
  );
  if (res.code == 200) {
    commentData.value.data.comment[index].oneCommentVoList[tindex].likeCount =
      res.data;
    commentData.value.data.comment[index].oneCommentVoList[tindex].isLike =
      false;
    ElMessage.success(res.message);
    return;
  }
  ElMessage.error("操作失败！");
};

// 加载更多
const pullMore = async () => {
  if (commentData.value.data.total <= nowTotal.value) {
    ElMessage.info("真没评论了，要不你再写两条？");
    return;
  }
  await GetPageCommentByArticle(
    props.articleId,
    ++page.value.current,
    page.value.size
  ).then((res: CommentType) => {
    if (res.code == 200) {
      const moreComment = ref<OneCommentType[]>();
      moreComment.value = res.data.comment;
      // 初始化 点赞 回复 模块的显示
      for (const one of moreComment.value) {
        one.isLike = false;
        one.isShow = false;
        if (one.oneCommentVoList) {
          nowTotal.value += one.oneCommentVoList.length + 1;
          for (const two of one.oneCommentVoList) {
            two.isLike = false;
            two.isShow = false;
          }
        } else {
          nowTotal.value += 1;
        }
        commentData.value.data.comment.push(one);
      }

      // 推上总列表里 concat 无法用很奇怪
    }
  });
};

getOneCommentData();
</script>

<template>
  <!-- 发表一级评论 -->
  <div class="sendOneComment">
    <div class="sendOneComment-box">
      <div class="sendOneComment-box-title">
        <h2>快来登录发表你的见解叭~</h2>
      </div>
      <MdEditor
        v-model="text"
        :toolbars="toolbars"
        @onUploadImg="onUploadImg"
        :placeholder="props.commentType"
      />
      <div class="sendOneComment-box-button">
        <button class="send" @click="sendOneComment(text)">发送</button>
        <button class="clear" @click="text = ''">清空</button>
      </div>
    </div>
  </div>
  <!-- 评论数据 -->
  <div class="comment-box" v-show="commentData?.data.total > 0">
    <div class="comment-box-info">
      <span class="comment-box-info-span"
        >{{ commentData?.data.total }} 条评论</span
      >
    </div>

    <div
      v-for="(comment, index) in commentData?.data.comment"
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
            <div class="bang" @click="oneIsLike(index)">
              <a title="点赞">
                <img
                  v-show="!comment.isLike"
                  src="~/assets/icon/bang0.png"
                  alt="未点赞"
                />
                <img
                  v-show="comment.isLike"
                  src="~/assets/icon/bang.png"
                  alt="已点赞"
                />
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
              <span>{{ comment.oneCommentVoList?.length }}</span>
            </div>
          </div>
        </div>

        <div class="comment-box-main-rght-userInfo-content">
          <MdPreview previewTheme="github" :modelValue="comment.content" />
        </div>
        <span>{{
          comment.createTime.replace("T", " ").slice(0, 19) +
          " · " +
          comment.address
        }}</span>
        <!-- 回复板块在这里！ -->
        <div
          v-show="comment.isShow"
          class="comment-box-main-rght-userInfo-sendComment"
        >
          <MdEditor v-model="text" :toolbars="toolbars" />
          <div class="comment-box-main-rght-userInfo-sendComment-button">
            <button
              class="send"
              style="background-color: #03a2f0"
              @click="
                replyOneComment(
                  comment.id,
                  comment.sendId,
                  text,
                  comment.id,
                  index
                )
              "
            >
              发送
            </button>
            <button class="letLook">预览</button>
            <button @click="comment.isShow = false" class="seeyou">取消</button>
          </div>
        </div>
        <div
          v-for="(oneComment, tindex) in comment?.oneCommentVoList"
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
                  <div class="bang-sub" @click="twoIsLike(index, tindex)">
                    <a title="点赞">
                      <img
                        v-show="!oneComment.isLike"
                        src="~/assets/icon/bang0.png"
                        alt="未点赞"
                      />
                      <img
                        v-show="oneComment.isLike"
                        src="~/assets/icon/bang.png"
                        alt="已点赞"
                      />
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
                  "@ " + oneComment.replyUserNickName + " :"
                }}</span>
              </div>
              <div class="comment-sub-box-main-rght-userInfo-content">
                <MdPreview
                  previewTheme="github"
                  :modelValue="oneComment.content"
                />
              </div>
              <span>{{
                oneComment.createTime.replace("T", " ").slice(0, 19) +
                " · " +
                oneComment.address
              }}</span>
              <!-- 回复板块在这里！ -->
              <div
                v-show="oneComment.isShow"
                class="comment-sub-box-main-rght-userInfo-sendComment"
              >
                <MdEditor v-model="text" :toolbars="toolbars" />
                <div
                  class="comment-sub-box-main-rght-userInfo-sendComment-button"
                >
                  <button
                    class="send"
                    style="background-color: #03a2f0"
                    @click="
                      replyTwoComment(
                        oneComment.id,
                        oneComment.sendId,
                        text,
                        comment.id,
                        index,
                        tindex
                      )
                    "
                  >
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
  <div v-show="commentData?.data.total > 0" class="loadSub">
    <h3 @click="pullMore">
      {{ commentData?.data.total > nowTotal ? "加载更多" : "没有了" }}
    </h3>
  </div>
</template>

<style lang="scss" scoped></style>
