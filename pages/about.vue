<script setup lang="ts">
definePageMeta({
  layout: "nothing",
});
useHead({
  title: "about",
});
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { GetAbout } from "~/api/blog/other";
const catalogList = ref([]);
const onGetCatalog = (list) => {
  catalogList.value = list;
};
const onHtmlChanged = () => {
  // Check if `document` is available
  if (process.browser) {
    const { hash } = location;

    if (/^#/.test(hash)) {
      const headingId = decodeURIComponent(hash.replace("#", ""));

      if (headingId) {
        const targetHeadDom = document.getElementById(headingId);
        if (targetHeadDom) {
          const scrollLength =
            (targetHeadDom as HTMLHeadElement).offsetTop + 414 - 10;

          window.scrollTo({
            top: scrollLength,
            behavior: "smooth",
          });
        }
      }
    }
  }
};
const myClass = ref("MyButtom");
const friendsCommentPlaceholder =
  "本站评论支持MarkDown语法欢迎表演!\n右上角的图片图标可上传图片\n支持png、jdg、git格式且大小不超过1MB\n符合条件会直接贴在输入框，反之不会。";
const aboutData = ref({
  text: "",
  editorId: "about",
});
// 接口取值
type ResponedType<T> = {
  code: number;
  message: string;
  data: T;
};
const getAbout = async () => {
  const res: ResponedType<string> = await GetAbout();
  aboutData.value.text = res.data;
};
getAbout();
</script>

<template>
  <div>
    <div style="display: flex; justify-content: center; align-content: center">
      <div class="affix-container">
        <el-affix target=".affix-container">
          <!-- <AppHeader /> -->
          <AppMyHeader />
        </el-affix>
        <div class="about-look-box">
          <div class="about-look">关于·About~</div>
        </div>
        <div style="height: 50vh; display: flex; justify-content: center">
          <div>
            <MdPreview
              previewTheme="mk-cute"
              :modelValue="aboutData.text"
              :editorId="aboutData.editorId"
              @onGetCatalog="onGetCatalog"
              @onHtmlChanged="onHtmlChanged"
              class="aboutMd"
            />
            <LazyAppMainComment
              :article-id="'likebocaiabout114514'"
              :comment-type="friendsCommentPlaceholder"
            />
            <AppButtom :myClass="myClass" />
          </div>
          <div style="margin-left: 30px">
            <AppMainRightBlogInfo />
            <div class="tagCloud-box">
              <div class="tagCloud-box-title">
                <img
                  src="https://cdn.woaibocai.top/bcblog/assets/icon/tag.png"
                  alt="标签"
                />
                <h2>标签云</h2>
                (点点标签~)
              </div>
              <AppMainRightTagCloud
                width="320"
                height="320"
                radius="120"
                style="position: relative; left: 20px; top: -40px"
              />
            </div>
            <el-affix position="top" :offset="0">
              <MarkDownCataLog :editorId="aboutData.editorId" />
            </el-affix>
          </div>
        </div>
        <!-- <slot /> -->
      </div>
    </div>
    <el-backtop :right="40" :bottom="40" :visibility-height="1000" />
  </div>
</template>

<style lang="scss" scoped>
.about-look-box {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .about-look {
    font-size: 60px;
    color: rgba(0, 0, 0, 0.8);
  }
}
.aboutMd {
  border-radius: 25px;
  padding: 10px 0;
  margin-bottom: 30px;
}
.tagCloud-box {
  min-width: 250px;
  max-width: 400px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  .tagCloud-box-title {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding-top: 10px;
    color: #32325d;
    img {
      width: "32px";
      height: "32px";
      margin-right: 10px;
    }
    h2 {
      font-size: 1.5rem;
    }
  }
}
</style>
