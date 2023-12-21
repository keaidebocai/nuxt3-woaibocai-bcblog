<script lang="ts" setup>
definePageMeta({
  layout: "nothing",
});
const heandleclick = () => {
  ElMessage.success("成功!");
};
const phone = ref(true);
useHead({
  title: "首页",
});
const MyStrings = ref(["我的剑也未尝不利!&emsp;&ensp; --袁绍","秦奋六世之余烈,东出灭六国而统一天下!&emsp;&ensp;--《过秦论》","受命于天,既寿永昌。&emsp;&ensp;--《尚书·洪范》"])
const items = [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }];
// 打字机效果
import { Typed } from "@duskmoon/vue3-typed-js";
import type { TypedOptions } from "@duskmoon/vue3-typed-js";
const options: TypedOptions = {
  strings: ["Wecome To BoCai's Kennel", "欢迎来到菠菜的小窝!"],
  loop: false,//true 是否循环
  showCursor: false,//是否显示光标
  typeSpeed: 70, //打字速度
  backSpeed: 50, //删字速度
  backDelay: 1000 //打完一句停留多久
  
};
const options1: TypedOptions = {
  strings: MyStrings.value,
  loop: true,//true 是否循环
  showCursor: false,//是否显示光标
  typeSpeed: 150, //打字速度
  backSpeed: 70, //删字速度
  backDelay: 2500 //打完一句停留多久
};
</script>

<template>
  <div class="affix-container">
    <el-affix target=".affix-container">
      <AppHeader />
    </el-affix>
    <div class="MyWelcome">
        <div style="font-weight: bolder; font-size: 5rem; color: rgba(255,255,255)">
            <!-- <p>暂时预留模块</p> -->
            <Typed :options="options">
                <p class="typing"></p>
            </Typed>
        </div>
        <br />
        <ElIconArrowDownBold
            style="width: 2rem; position: absolute; bottom: 2rem; color: #fff"
        />
    </div>
  </div>
  <el-backtop :right="40" :bottom="40" :visibility-height="1000" />
  <!-- <div style="display: flex;">
            <div style="width: 25%;height: 110vh; background-color: #fff;">
                fsdfsd
            </div>
            <div style="width: 50%;height: 110vh; background-color: green;">
                asdasd
            </div>
            <div style="width: 25%;height: 110vh; background-color: #fff;">
                fsdfsd
            </div>
        </div> -->
  <!-- 
            <AppMainLeft
        -->
  <el-row style="display: flex; justify-content: center" :gutter="30">
    <el-col :span="12">
      <div class="articleCard">
        <div>
          <el-alert
            title="每日一言"
            description="秦奋六世之余烈,东出灭六国而统一天下！"
            effect="light"
            center
          >
          <div style="height: 2rem;">
            <Typed :options="options1">
                <p class="typing"></p>
            </Typed>
          </div>
        </el-alert>
        </div>
        <div v-for="item in items" class="articleCard-box">
          <!-- <div class="articleCard-box-left"></div> -->
          <!-- https://img.zhisheji.com/bbs/forum/201401/05/153945tbr7pg5torfzptso.jpg -->
          <!-- https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg -->
          <el-image
            class="articleCard-box-left"
            fit="fill"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
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
              <p class="articleCard-box-right-top-title">
                关于nuxt3路由的解读与记录
              </p>
              <p>{{ item.name }}</p>
            </div>
            <!-- 时间、浏览量、发布人、分类、字数、阅读时间 -->
            <div class="articleCard-box-right-items">
              <div class="top">
                <ul>
                  <li>
                    <div class="header-span">
                      <ElIconStar class="icon"/>
                      <div class="Mydiv">置顶</div>
                      <span>|</span>
                    </div>
                  </li>
                  <li>
                    <div class="header-span">
                      <ElIconUser class="icon"/>
                      <div class="Mydiv">likebocai</div>
                      <span>|</span>
                    </div>
                  </li>
                  <li>
                    <div class="header-span"> 
                      <ElIconView class="icon"/>
                      <div class="Mydiv">230</div>
                      <span>|</span>
                    </div>
                  </li>
                  <li>
                    <div class="header-span"> 
                      <ElIconCollectionTag class="icon"/>
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
                      <ElIconDocument class="icon"/>
                      <div class="Mydiv">3000 字</div>
                      <span>|</span>
                    </div>
                  </li>
                  <li>
                    <div class="header-span"> 
                      <ElIconTimer class="icon"/>
                      <div class="Mydiv">8 min</div>
                      <span>|</span>
                    </div>
                  </li>
                  <li>
                    <div class="header-span"> 
                      <ElIconStopwatch class="icon"/>
                      <div class="Mydiv">2023-10-10</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 文章简述 -->
            <div class="articleCard-box-right-descriptions">
              <p>
                1.什么是索引索引（在 MySQL 中也叫“键key”）是存储引擎快速找到记录的一种数据结构，通俗来说类似书本的目录，这个比方虽然被用的最多但是也是最恰如其当的，在查询书本中的某个知识点不借助目录的情况下，往往都找的够呛，那么索引相较于数据库的重要性也可见一斑。 2.索引的有哪些1.什么是索引索引（在 MySQL 中也叫“键key”）是存储引擎快速找到记录的一种数据结构，通俗来说类似书本的目录，这个比方虽然被用的最多但是也是最恰如其当的，在查询书本中的某个知识点不借助目录的情况下，往往都找的够呛，那么索引相较于数据库的重要性也可见一斑。 2.索引的有哪些1.什么是索引索引（在 MySQL 中也叫“键key”）是存储引擎快速找到记录的一种数据结构，通俗来说类似书本的目录，这个比方虽然被用的最多但是也是最恰如其当的，在查询书本中的某个知识点不借助目录的情况下，往往都找的够呛，那么索引相较于数据库的重要性也可见一斑。 2.索引的有哪些1.什么是索引索引（在 MySQL 中也叫“键key”）是存储引擎快速找到记录的一种数据结构，通俗来说类似书本的目录，这个比方虽然被用的最多但是也是最恰如其当的，在查询书本中的某个知识点不借助目录的情况下，往往都找的够呛，那么索引相较于数据库的重要性也可见一斑。 2.索引的有哪些1.什么是索引索引（在 MySQL 中也叫“键key”）是存储引擎快速找到记录的一种数据结构，通俗来说类似书本的目录，这个比方虽然被用的最多但是也是最恰如其当的，在查询书本中的某个知识点不借助目录的情况下，往往都找的够呛，那么索引相较于数据库的重要性也可见一斑。 2.索引的有哪些1.什么是索引索引（在 MySQL 中也叫“键key”）是存储引擎快速找到记录的一种数据结构，通俗来说类似书本的目录，这个比方虽然被用的最多但是也是最恰如其当的，在查询书本中的某个知识点不借助目录的情况下，往往都找的够呛，那么索引相较于数据库的重要性也可见一斑。 2.索引的有哪些
              </p>
            </div>

            <!-- 标签 -->
            <div class="articleCard-box-right-tags">
              <div class="articleCard-box-right-tags-icon">
                <ul>
                  <li>
                    <IconTags class="MyIconTags"/>
                  </li>
                </ul>
              </div>

              <div class="articleCard-box-right-tags-tag">
                <ul>
                  <li>
                    <el-badge :value="12">
                      <el-tag style="font-size: 2vh;">Tag 1</el-tag>
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
      </div>
    </el-col>
    <el-col :span="5">
      <div
        style="border-radius: 20px; background-color: #fff; height: 110vh"
      ></div>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.affix-container {
  height: 100vh;
  .MyWelcome {
    height: 92vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.articleCard {
  // background-color: green;
  .articleCard-box {
    width: 100%;
    height: 25vh;
    display: flex;
    padding: 10px 0;
    .articleCard-box-left {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      height: 25vh;
      width: 40%;
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
      width: 44.4vh;
      height: 25vh;
      border-radius: 20px;
      z-index: 99;
      transform: scale(1.05);
    }
    .articleCard-box-right {
      background-color: rgba(255,255,255, 0.6);
      border-bottom-right-radius: 20px;
      border-top-right-radius: 20px;
      height: 25vh;
      width: 60%;
      .articleCard-box-right-top {
        border-top-right-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 4vh;
        .articleCard-box-right-top-title {
          font-size: 1.8rem;
          font-weight: bolder;
        }
      }
      .articleCard-box-right-items {
        height: 2vh;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
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
                padding-left:5px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              span {
                height: 1.3rem;
                font-size: 1.3rem;
                padding-left:10px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .icon {
                padding-left:10px;
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
        height: 11vh;
        padding: 1vh;
        p {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 7;
          font-size: 1.1rem;
        }
      }
      .articleCard-box-right-tags {
        height: 4vh;
        border-bottom-right-radius:20px ;
        .articleCard-box-right-tags-icon {
          position:absolute;
          float: left;
          li {
            display: inline-block;
            .MyIconTags {
              height: 2.5vh;
              position: absolute;
              margin-left: 9px;
            }
          }
        }
        .articleCard-box-right-tags-tag {
          display: flex;
          align-items: center;
          justify-items: center;
          margin-left: 4vh;
          height: 4vh;
          border-bottom-right-radius:20px ;
          ul {
            display: flex;
            align-items: center;
            justify-items: center;
            li {
              display: inline-block;
              margin-right: 20px;
              .el-badge {
                z-index: 5;
                .el-tag {
                  font-size: 1.8vh;
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
    margin: 10px 0;
    border-radius: 20px;
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.3);
    transform: scale(1.03);
    .articleCard-box-right {
      position: absolute;
      right: 0;
    }
  }
}

* {
  // 提示卡片
  --el-alert-title-font-size: 2rem;
  --el-alert-description-font-size: 1.5rem;
  --el-alert-padding: 20px 16px;
  //
  --el-badge-font-size: 1vh;
}
:deep(.el-alert__description) {
  margin: 15px 0 0 0;
}
:deep(.el-alert__title) {
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.el-alert) {
  background-color: rgba(255,255,255, 0.6);
  margin-bottom: 15px;
  border-radius: 10px;
}
:deep(.el-alert:hover) {
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.3);
}
</style>
