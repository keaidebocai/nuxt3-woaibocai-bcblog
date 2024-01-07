<script setup lang="ts">
const props = defineProps(["articleData", "isMoblie"]);
const article = props.articleData;
const isMoblie = props.isMoblie;
const titleFontSize = ref("4rem");
if (isMoblie) {
  titleFontSize.value = "2rem";
}
</script>

<template>
  <div class="articleInfo">
    <div class="articleInfo-body">
      <div class="articleInfo-body-title">
        <h1>{{ article.title }}</h1>
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
                    <a :href="`/category/${article.categoryUrl}`">
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
                <div class="Mydiv">{{ article.readingDuration }} min</div>
                <span>|</span>
              </div>
            </li>
            <li>
              <div class="header-span">
                <ElIconStopwatch class="icon" />
                <div class="Mydiv">
                  {{
                    isMoblie
                      ? article.updateTime.slice(0, 10)
                      : article.updateTime.replace("T", " ")
                  }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="articleInfo-body-summary">
        <h3>{{ article.summary }}</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.articleInfo {
  height: calc(50vh - 60px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .articleInfo-body {
    .articleInfo-body-title {
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
      h1 {
        font-size: v-bind(titleFontSize);
        color: rgba(50, 50, 93, 0.6);
      }
    }

    .articleInfo-body-summary {
      width: 100%;
      height: 10vh;
      display: flex;
      align-items: center;
      justify-content: center;
      h3 {
        width: 60vw;
        text-align: center;
        font-size: 1.1rem;
        color: rgba(50, 50, 93, 0.6);
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
      }
    }

    // 这个是从 article 里cv的不用管class的命名
    .articleCard-box-right-items {
      width: 100vw;
      height: 1.5vh;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 5px;
      min-height: 22px;
      color: rgba(50, 50, 93, 0.5);
      a {
        color: rgba(50, 50, 93, 0.5);
      }
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
  }
}
</style>
