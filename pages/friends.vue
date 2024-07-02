<script setup lang="ts">
import { GetAllLink } from "~/api/blog/link";
import { GetLink } from "~/api/blog/other";
definePageMeta({
  layout: "nothing",
});
useHead({
  title: "友情链接",
});
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
type ResponedType<T> = {
  code: number;
  message: string;
  data: T;
};
type LinkVo = {
  linkName: string;
  logo: string;
  description: string;
  address: string;
};
const links = ref<ResponedType<LinkVo[]>>();
const getLinkData = async () => {
  const linkData: ResponedType<LinkVo[]> = await GetAllLink();
  links.value = linkData;
};
const myClass = ref("MyButtom");
const friendsCommentPlaceholder =
  "申请要求:\n1.贵站名称\n2.贵站头像地址(也可直接右上图标点击上传)\n3.贵站地址\n4.贵站简介\n5.最好开头https协议\n6.贵站友链已添加本站\n互联网交友，一起玩呗\n本站评论支持MarkDown语法欢迎表演!";
const articleData = ref({
  content: "",
  url: "link",
});
const getData = async () => {
  const res = await GetLink();
  articleData.value.content = res.data;
};

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
getLinkData();
getData();
</script>

<template>
  <div>
    <div style="display: flex; justify-content: center; align-content: center">
      <div class="affix-container">
        <el-affix target=".affix-container">
          <!-- <AppHeader /> -->
          <AppMyHeader />
        </el-affix>
        <div class="friends-look-box">
          <div class="friends-look">友情链接</div>
        </div>
        <div style="height: 50vh; display: flex; justify-content: center">
          <div>
            <MdPreview previewTheme="mk-cute" :modelValue="articleData.content" :editorId="articleData.url"
              @onGetCatalog="onGetCatalog" @onHtmlChanged="onHtmlChanged" class="friendsMd" />
            <div class="container">
              <div class="item item-1" v-for="link in links?.data">
                <img class="avatar" :src="link.logo" />
                <div class="info-box">
                  <h1 class="title">{{ link.linkName }}</h1>
                  <p class="describe">
                    {{ link.description }}
                  </p>
                  <div class="a-box">
                    <a :href="link.address" target="_blank">{{
                      link.address
                    }}</a>
                  </div>
                </div>
              </div>
            </div>
            <LazyAppMainComment :article-id="'likebocaifriends114514'" :comment-type="friendsCommentPlaceholder" />
            <AppButtom :myClass="myClass" />
          </div>
          <div style="margin-left: 30px">
            <AppMainRightBlogInfo />
            <div class="tagCloud-box">
              <div class="tagCloud-box-title">
                <img src="https://cdn.likebocai.com/bcblog/assets/icon/tag.png" alt="标签" />
                <h2>标签云</h2>
                (点点标签~)
              </div>
              <AppMainRightTagCloud width="320" height="320" radius="120"
                style="position: relative; left: 20px; top: -40px" />
            </div>
            <el-affix position="top" :offset="0">
              <MarkDownCataLog :editorId="articleData.url" />
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
.friends-look-box {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .friends-look {
    font-size: 60px;
    color: rgba(0, 0, 0, 0.8);
  }
}

.container {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 360px);
  //   grid-template-rows: repeat(auto-fill, 200px 200px);
  row-gap: 20px;
  column-gap: 60px;
  padding: 20px 10px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.4);
}

.item {
  height: 140px;
  border-radius: 25px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.45);
  border: 2px solid rgba($color: #49b1f5, $alpha: 0.3);
}

.avatar {
  height: 140px;
  width: 125px;
  border-top-right-radius: 70px;
  border-bottom-right-radius: 70px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}

.info-box {
  height: 140px;
  width: 235px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 25px;
    height: 30px;
    color: rgba(50, 50, 93, 0.6);
    font-size: 20px;
  }

  .describe {
    padding: 5px 10px;
    height: 75px;
    font-size: 16px;
    text-align: center;
    color: rgba(50, 50, 93, 0.6);
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }

  .a-box {
    height: 25px;
    border-bottom-right-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      display: block;
      color: rgba(50, 50, 93, 0.8);
      font-size: 16px;
    }

    a:hover {
      text-decoration: none;
    }
  }
}

.item:hover {
  background-color: rgba($color: #49b1f5, $alpha: 0.6);

  .avatar {
    display: none;
  }

  .info-box {
    width: 100%;
    border-radius: 25px;

    .title {
      border-top-left-radius: 25px;
    }

    .a-box {
      border-bottom-left-radius: 25px;
    }
  }
}

.affix-container {
  width: 100%;
  height: 100vh;
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

.friendsMd {
  border-radius: 25px;
  padding: 10px 0;
  margin-bottom: 30px;
}</style>
