<script setup lang="ts">
// 组件通信
const props = defineProps(["isMobile", "indexArticle"]);
const articleClass = ref("articleCard-box");
if (props.isMobile) {
  articleClass.value = "articleCard-box-m";
}
type indexArticleType = {
  total: number;
  current: number;
  size: number;
  data: [
    {
      id: string;
      userName: string;
      title: string;
      summary: string;
      content: string;
      blogCategoryName: string;
      categoryId: string;
      thumbnail: string;
      isTop: number;
      viewCount: number;
      updateTime: string;
      articleLength: number;
      readingDuration: number;
      tags: [
        {
          id: string;
          tagName: string;
          thisTagHasArticleCount: number;
        }
      ];
    }
  ];
};
const indexArticle = ref<indexArticleType>();
</script>

<template>
  <div
    v-for="article in props.indexArticle?.data"
    :key="article.id"
    :class="articleClass"
  >
    <!-- https://img2.wallspic.com/previews/8/3/5/6/7/176538/176538-tu_biao-shu_ma_yi_shu-yi_shu-bing_chuan_de_mao-xie_po-x750.jpg -->
    <!-- https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg -->
    <el-image
      @click="navigateTo(`article/${article.url}`)"
      class="articleCard-box-left"
      fit="fill"
      :src="article.thumbnail"
    >
      <template #error>
        <div class="image-slot">
          <ElIconPicture />
          <p>哎呀!图片不见啦!</p>
        </div>
      </template>
    </el-image>
    <div class="articleCard-box-right">
      <!-- 标题 -->
      <div class="articleCard-box-right-top">
        <h2 class="articleCard-box-right-top-title">
          <a :href="`article/${article.url}`">{{ article.title }}</a>
        </h2>
      </div>
      <!-- 时间、浏览量、发布人、分类、字数、阅读时间 -->
      <div class="articleCard-box-right-items">
        <div class="top">
          <ul>
            <li v-show="article.isTop == 1 ? true : false">
              <div class="header-span">
                <ElIconStar class="icon" />
                <div class="Mydiv">置顶</div>
                <span>|</span>
              </div>
            </li>
            <li>
              <div class="header-span">
                <ElIconUser class="icon" />
                <div class="Mydiv">{{ article.userName }}</div>
                <span>|</span>
              </div>
            </li>
            <li>
              <div class="header-span">
                <ElIconView class="icon" />
                <div class="Mydiv">{{ article.viewCount }}</div>
                <span>|</span>
              </div>
            </li>
            <li>
              <div class="header-span">
                <ElIconCollectionTag class="icon" />
                <div class="Mydiv">
                  <h2>
                    <a :href="`category/${article.categoryId}`">
                      {{ article.blogCategoryName }}
                    </a>
                  </h2>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="articleCard-box-right-items">
        <div class="top">
          <ul>
            <li>
              <div class="header-span">
                <ElIconDocument class="icon" />
                <div class="Mydiv">{{ article.articleLength }} 字</div>
                <span>|</span>
              </div>
            </li>
            <li>
              <div class="header-span">
                <ElIconTimer class="icon" />
                <div class="Mydiv">
                  {{
                    article.readingDuration === 0 ? 1 : article.readingDuration
                  }}
                  min
                </div>
                <span>|</span>
              </div>
            </li>
            <li>
              <div class="header-span">
                <ElIconStopwatch class="icon" />
                <div class="Mydiv">
                  {{
                    props.isMobile
                      ? article.updateTime.slice(0, 9)
                      : article.updateTime.replace("T", " ")
                  }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 文章简述 -->
      <div
        class="articleCard-box-right-descriptions"
        @click="navigateTo(`article/${article.url}`)"
      >
        <p>
          {{ article.summary }}
        </p>
      </div>

      <!-- 标签 -->
      <div class="articleCard-box-right-tags">
        <div v-show="!props.isMobile" class="articleCard-box-right-tags-icon">
          <IconTags class="MyIconTags" />
        </div>

        <div class="articleCard-box-right-tags-tag">
          <ul>
            <li v-for="tag in article.tags" :key="tag.id">
              <el-badge :value="tag.thisTagHasArticleCount">
                <el-tag>
                  <h2>
                    <a :href="`tag/${tag.id}`">
                      {{ tag.tagName }}
                    </a>
                  </h2>
                </el-tag>
              </el-badge>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.articleCard-box {
  min-width: 873px;
  max-width: 1200px;
  min-height: 278px;
  width: 100%;
  height: 25vh;
  display: flex;
  padding: 0 0 20px 0;
  .articleCard-box-left {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    height: 25vh;
    width: 40%;
    min-height: 278px;
    background-color: #fff;
    // 图片加载失败的图标
    display: flex;
    justify-content: center;
    align-items: center;
    color: #909399;
    background-color: #f5f7fa;
    .image-slot {
      width: 10vh;
      font-size: 0.8rem;
    }
  }
  .articleCard-box-left:hover {
    border-radius: 20px;
    z-index: 99;
    transform: scale(1.05);
  }
  .articleCard-box-right {
    background-color: rgba(255, 255, 255, 0.6);
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    height: 25vh;
    width: 60%;
    min-height: 278px;
    .articleCard-box-right-top {
      border-top-right-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3vh;
      padding-top: 10px;
      min-height: 40px;
      .articleCard-box-right-top-title {
        padding: 5px 0;
        font-size: 1.8rem;
        font-weight: bolder;
      }
    }
    .articleCard-box-right-items {
      height: 1.5vh;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 5px;
      min-height: 22px;
      .top {
        display: flex;
        align-items: center;
        justify-content: center;
        li {
          display: inline-block;
          .header-span {
            height: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            .Mydiv {
              height: 1.1rem;
              padding-left: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            span {
              height: 1.3rem;
              font-size: 1.3rem;
              padding-left: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .icon {
              padding-left: 10px;
              padding-bottom: 3px;
              height: 1.1rem;
              width: 1.1rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
    .articleCard-box-right-descriptions {
      height: 10vh;
      min-height: 120px;
      padding: 5px 1vh;
      p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 7;
        font-size: 1.1rem;
        align-items: center;
        justify-content: center;
      }
    }
    .articleCard-box-right-tags {
      height: 40px;
      // TODO
      min-height: 25px;
      padding: auto 0;
      border-bottom-right-radius: 20px;
      display: flex;
      align-items: center;
      justify-items: center;
      .articleCard-box-right-tags-icon {
        display: flex;
        align-items: center;
        justify-items: center;
        height: 40px;
        width: 65px;
        .MyIconTags {
          display: flex;
          align-items: center;
          justify-items: center;
          height: 2.5rem;
          min-height: 40px;
          margin-left: 0.9vw;
        }
      }
      .articleCard-box-right-tags-tag {
        display: flex;
        align-items: center;
        justify-items: center;
        height: 40px;
        border-bottom-right-radius: 20px;
        ul {
          li {
            display: inline-block;
            margin-right: 1.5vw;
            .el-badge {
              // z-index: 5;
              .el-tag {
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
  }
}
.articleCard-box:hover {
  padding: 0;
  margin: 0 0 20px 0;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.3);
  transform: scale(1.03);
  // .articleCard-box-right {
  //   position: absolute;
  //   right: 0;
  // }
}

.articleCard-box-m {
  width: 100%;
  // min-height: 400px;
  // height: 50vh;
  padding-bottom: 20px;
  .articleCard-box-left {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    // height: 25vh;
    width: 100%;
    aspect-ratio: 1920/1080;
    background-color: #fff;
    // 图片加载失败的图标
    display: flex;
    justify-content: center;
    align-items: center;
    color: #909399;
    background-color: #f5f7fa;
    .image-slot {
      width: 10vh;
      font-size: 0.8rem;
    }
  }
  .articleCard-box-right {
    background-color: rgba(255, 255, 255, 0.6);
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    // height: 25vh;
    width: 100%;
    .articleCard-box-right-top {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1.6rem;
      // TODO
      padding-top: 5px;
      .articleCard-box-right-top-title {
        font-size: 1.5rem;
        font-weight: bolder;
      }
    }
    .articleCard-box-right-items {
      height: 1.1rem;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 5px;
      .top {
        display: flex;
        align-items: center;
        justify-content: center;
        ul {
          height: 1.2rem;
          li {
            display: inline-block;
            .header-span {
              height: 1.2rem;
              display: flex;
              align-items: center;
              justify-content: center;
              .Mydiv {
                height: 1.1rem;
                padding-left: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              span {
                height: 1.3rem;
                font-size: 1.3rem;
                padding-left: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .icon {
                padding-left: 10px;
                padding-bottom: 3px;
                height: 1.1rem;
                width: 1.1rem;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }
        }
      }
    }
    .articleCard-box-right-descriptions {
      height: 3.3rem;
      padding: 0 0.5rem 0.5rem 0.5rem;
      p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        font-size: 1.1rem;
        align-items: center;
        justify-content: center;
      }
    }
    .articleCard-box-right-tags {
      // height: 40px;
      // TODO
      min-height: 25px;
      margin-top: 5px;
      padding-bottom: 10px;
      border-bottom-right-radius: 20px;
      display: flex;
      align-items: center;
      justify-items: center;
      .articleCard-box-right-tags-tag {
        display: flex;
        align-items: center;
        justify-items: center;
        margin: 0 auto;
        // height: 40px;
        border-bottom-right-radius: 20px;
        ul {
          li {
            display: inline-block;
            margin-right: 1.5vw;
            .el-badge {
              // z-index: 5;
              .el-tag {
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
  }
}
a {
  color: black;
  text-decoration: none;
}
</style>
