<script setup lang="ts">
const items = [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }];
// 组件通信 
const props = defineProps(['isMobile'])
const articleClass = ref('articleCard-box')
if (props.isMobile) {
    articleClass.value = 'articleCard-box-m';
}
const tag = () => {
  navigateTo('/tag')
}
</script>

<template>
  <div v-for="item in items" :class="articleClass">
    <!-- https://img2.wallspic.com/previews/8/3/5/6/7/176538/176538-tu_biao-shu_ma_yi_shu-yi_shu-bing_chuan_de_mao-xie_po-x750.jpg -->
    <!-- https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg -->
    <el-image
      class="articleCard-box-left"
      fit="fill"
      src="https://img2.wallspic.com/previews/8/3/5/6/7/176538/176538-tu_biao-shu_ma_yi_shu-yi_shu-bing_chuan_de_mao-xie_po-x750.jpg"
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
        <p class="articleCard-box-right-top-title">关于nuxt3路由的解读与记录</p>
      </div>
      <!-- 时间、浏览量、发布人、分类、字数、阅读时间 -->
      <div class="articleCard-box-right-items">
        <div class="top">
          <ul>
            <li>
              <div class="header-span">
                <ElIconStar class="icon" />
                <div class="Mydiv">置顶</div>
                <span>|</span>
              </div>
            </li>
            <li>
              <div class="header-span">
                <ElIconUser class="icon" />
                <div class="Mydiv">likebocai</div>
                <span>|</span>
              </div>
            </li>
            <li>
              <div class="header-span">
                <ElIconView class="icon" />
                <div class="Mydiv">230</div>
                <span>|</span>
              </div>
            </li>
            <li>
              <div class="header-span">
                <ElIconCollectionTag class="icon" />
                <div class="Mydiv">前端</div>
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
                <div class="Mydiv">3000 字</div>
                <span>|</span>
              </div>
            </li>
            <li>
              <div class="header-span">
                <ElIconTimer class="icon" />
                <div class="Mydiv">8 min</div>
                <span>|</span>
              </div>
            </li>
            <li>
              <div class="header-span">
                <ElIconStopwatch class="icon" />
                <div class="Mydiv">2023-10-10</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 文章简述 -->
      <div class="articleCard-box-right-descriptions">
        <p>
          1.什么是索引索引（在 MySQL
          中也叫“键key”）是存储引擎快速找到记录的一种数据结构，通俗来说类似书本的目录，这个比方虽然被用的最多但是也是最恰如其当的，在查询书本中的某个知识点不借助目录的情况下，往往都找的够呛，那么索引相较于数据库的重要性也可见一斑。
          2.索引的有哪些1.什么是索引索引（在 MySQL
          中也叫“键key”）是存储引擎快速找到记录的一种数据结构，通俗来说类似书本的目录，这个比方虽然被用的最多但是也是最恰如其当的，在查询书本中的某个知识点不借助目录的情况下，往往都找的够呛，那么索引相较于数据库的重要性也可见一斑。
          2.索引的有哪些1.什么是索引索引（在 MySQL
          中也叫“键key”）是存储引擎快速找到记录的一种数据结构，通俗来说类似书本的目录，这个比方虽然被用的最多但是也是最恰如其当的，在查询书本中的某个知识点不借助目录的情况下，往往都找的够呛，那么索引相较于数据库的重要性也可见一斑。
          2.索引的有哪些1.什么是索引索引（在 MySQL
          中也叫“键key”）是存储引擎快速找到记录的一种数据结构，通俗来说类似书本的目录，这个比方虽然被用的最多但是也是最恰如其当的，在查询书本中的某个知识点不借助目录的情况下，往往都找的够呛，那么索引相较于数据库的重要性也可见一斑。
          2.索引的有哪些1.什么是索引索引（在 MySQL
          中也叫“键key”）是存储引擎快速找到记录的一种数据结构，通俗来说类似书本的目录，这个比方虽然被用的最多但是也是最恰如其当的，在查询书本中的某个知识点不借助目录的情况下，往往都找的够呛，那么索引相较于数据库的重要性也可见一斑。
          2.索引的有哪些1.什么是索引索引（在 MySQL
          中也叫“键key”）是存储引擎快速找到记录的一种数据结构，通俗来说类似书本的目录，这个比方虽然被用的最多但是也是最恰如其当的，在查询书本中的某个知识点不借助目录的情况下，往往都找的够呛，那么索引相较于数据库的重要性也可见一斑。
          2.索引的有哪些
        </p>
      </div>

      <!-- 标签 -->
      <div class="articleCard-box-right-tags">
        <div v-show="!props.isMobile" class="articleCard-box-right-tags-icon">
              <IconTags class="MyIconTags" />
        </div>

        <div class="articleCard-box-right-tags-tag">
          <ul>
            <li>
              <el-badge :value="12">
                <el-tag @click="tag">Tag 1</el-tag>
              </el-badge>
            </li>
            <li>
              <el-badge :value="12">
                <el-tag>Tag 1</el-tag>
              </el-badge>
            </li>
            <li>
              <el-badge :value="12">
                <el-tag>Tag 1</el-tag>
              </el-badge>
            </li>
            <li>
              <el-badge :value="12">
                <el-tag>Tag 1</el-tag>
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
  .articleCard-box-right {
    position: absolute;
    right: 0;
  }
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
</style>
