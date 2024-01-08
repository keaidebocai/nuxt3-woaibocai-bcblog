<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
const text = ref("🖨 title\n*~~hello~~*\n");
</script>

<template>
  <div class="comment-box">
    <div class="comment-box-info">
      <span class="comment-box-info-span">21 条评论</span>
    </div>

    <div class="comment-box-main">
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
          <div class="comment-box-main-rght-userInfo-date">
            <span>2024-01-08 12:00:00</span>
          </div>
          <div class="comment-box-main-rght-userInfo-icon">
            <div class="bang">
              <a href="#">
                <img src="~/assets/icon/bang0.png" alt="已点赞" />
              </a>
              <span>1</span>
            </div>
            <div class="bang">
              <a href="#">
                <img src="~/assets/icon/comment.png" alt="评论" />
              </a>
              <span>1</span>
            </div>
          </div>
        </div>

        <div class="comment-box-main-rght-userInfo-content">
          <MdPreview
            previewTheme="github"
            :modelValue="text"
            editorId="editorId1"
          />
        </div>

        <div></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
