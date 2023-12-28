<script setup lang="ts">
// 导包
import { GetBlogInfo } from "~/api/blog/info";
// 头像
const animationPlayState = ref("runing");
const animationPlayStateByRuningOrPaused = (state: string) => {
  animationPlayState.value = state;
};
const mouseoverAnimation = () => {
  // paused
  const state = "runing";
  animationPlayStateByRuningOrPaused(state);
};
const mouseenterAnimation = () => {
  const myFuntion = () => {
    // 这里打算再加逻辑改变css样式，暂时弃用
    const state = "paused";
    animationPlayStateByRuningOrPaused(state);
  };
  setTimeout(myFuntion, 1000);
};
const avatarSrc = ref(
  "https://cdn.woaibocai.top/bcblog/public/src/avatar-1.jpg"
);
// 点击头像，从而改变头像
const changAvatarSrc = () => {
  const avatar = avatarSrc.value;
  // 此处声明变量只能使用 var 而不是const
  var avatarNum = parseInt(avatar.slice(51, -4));
  if (avatarNum >= 3) {
    avatarSrc.value = avatar.replace(avatarNum.toString(), "1");
  } else {
    avatarSrc.value = avatar.replace(
      avatarNum.toString(),
      (avatarNum += 1).toString()
    );
  }
};

// 网站数据
type myData = {
  articleCount: number;
  tagCount: number;
  categoryCount: number;
  articleViewCount: number;
};
const blogInfo = ref<myData>();
const getBlogInfo = async () => {
  const { data } = await GetBlogInfo().catch((err) => {
    ElMessage.error("我不粘锅的，你的网络出问题了!");
    throw err;
  });
  blogInfo.value = data;
};
// 网站数据初始化
onMounted(() => {
  getBlogInfo();
});
</script>

<template>
  <div class="appRightMyInfo">
    <div class="title">
      <span>站点概览</span>
    </div>
    <div class="avatar">
      <el-avatar
        @mouseover="mouseoverAnimation()"
        @mouseenter="mouseenterAnimation()"
        @click="changAvatarSrc()"
        :size="100"
        :src="avatarSrc"
      />
    </div>
    <span class="name"> 菠菜的小窝 </span>
    <div class="description">
      <p>上帝不让狗狗讲话是为了让人们知道，<br />爱与忠诚是要靠行动表达的。</p>
    </div>
    <div class="statistics">
      <ul>
        <li>
          <div class="data">
            {{ blogInfo?.articleCount ? blogInfo?.articleCount : "∞" }}
          </div>
          <div class="info">文章</div>
        </li>
        <li style="border-left: 1px solid rgba(50, 50, 93, 0.3)">
          <div class="data">
            {{ blogInfo?.categoryCount ? blogInfo?.categoryCount : "∞" }}
          </div>
          <div class="info">分类</div>
        </li>
        <li style="border-left: 1px solid rgba(50, 50, 93, 0.3)">
          <div class="data">
            {{ blogInfo?.tagCount ? blogInfo?.tagCount : "∞" }}
          </div>
          <div class="info">标签</div>
        </li>
        <li style="border-left: 1px solid rgba(50, 50, 93, 0.3)">
          <div class="data">
            {{ blogInfo?.articleViewCount ? blogInfo?.articleViewCount : "∞" }}
          </div>
          <div class="info" style="min-width: 80px">总浏览</div>
        </li>
      </ul>
    </div>

    <div class="myOtherInfo">
      <ul>
        <li>
          <el-tooltip
            placement="top"
            content="<a style='font-size: 1rem;color: black;' href='https://www.likebocai.com' target='_blank'>https://www.likebocai.com</a>"
            raw-content
            effect="light"
          >
            <IconHome />
          </el-tooltip>
        </li>
        <li>
          <el-tooltip
            placement="top"
            content="<a style='font-size: 1rem;color: black;' href='https://github.com/keaidebocai' target='_blank'>https://github.com/keaidebocai</a>"
            raw-content
            effect="light"
          >
            <IconGithub />
          </el-tooltip>
        </li>
        <li>
          <el-tooltip
            placement="top"
            content="<span style='font-size: 1rem;color: black;'>365191806@qq.com</span>"
            raw-content
            effect="light"
          >
            <IconEmail />
          </el-tooltip>
        </li>
      </ul>
    </div>

    <div class="little-link">
      <!-- https://www.travellings.cn/assets/logo.svg -->
      <ul>
        <li>
          <el-link
            :underline="false"
            href="https://www.travellings.cn/go.html"
            target="_blank"
          >
            <div class="li-icon">
              <img
                src="https://www.travellings.cn/assets/travelling.png"
                alt="开往-友链接力"
                width="32"
              />
            </div>
            <div class="li-span">travelling</div>
          </el-link>
        </li>
        <li>
          <el-link
            :underline="false"
            href="https://www.likebocai.com/bcgpt"
            target="_blank"
          >
            <div class="li-icon">
              <img
                src="https://cdn.woaibocai.top/bcblog/public/svg/bcgpt.svg"
                alt="菠菜的小窝"
                width="32"
              />
            </div>
            <div class="li-span">
              BCGPT
              <p v-show="false">(停)</p>
            </div>
          </el-link>
        </li>
      </ul>
    </div>
    <div class="little-link">
      <ul>
        <li>
          <el-link
            :underline="false"
            href="https://www.travellings.cn/go.html"
            target="_blank"
          >
            <div class="li-icon">
              <img
                src="https://www.travellings.cn/assets/travelling.png"
                alt="开往-友链接力"
                width="32"
              />
            </div>
            <div class="li-span">travelling</div>
          </el-link>
        </li>
        <li>
          <el-link
            :underline="false"
            href="https://www.travellings.cn/go.html"
            target="_blank"
          >
            <div class="li-icon">
              <img
                src="https://www.travellings.cn/assets/travelling.png"
                alt="开往-友链接力"
                width="32"
              />
            </div>
            <div class="li-span">开往</div>
          </el-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.appRightMyInfo {
  min-width: 250px;
  max-width: 400px;
  // height: 500px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  padding: 2vh 0;
  .title {
    height: 3vh;
    padding-top: 10px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    // 149,212,117 rgba(128,128,128,0.6)  #e8c9b5 #32325d
    color: #32325d;
  }
  .avatar {
    width: 100%;
    padding-top: 1vh;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    @keyframes el-avatar-rotate {
      // 0% { transform: rotate(90deg); }
      // 25% { transform: rotate(180deg); }
      // 50% { transform: rotate(270deg); }
      // 100% { transform: rotate(360deg); }
      from {
        transform: rotate();
      }
      to {
        transform: rotate(360deg);
      }
    }
    .el-avatar {
      width: 40%;
      height: 100%;
    }
    .el-avatar:hover {
      -webkit-animation: el-avatar-rotate 1s infinite;
      animation: el-avatar-rotate 1s infinite;
      animation-play-state: v-bind(animationPlayState);
    }
  }
  .name {
    height: 2.5vh;
    padding-top: 10px;
    padding-bottom: 0.5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    color: #32325d;
  }
  .description {
    height: 4.5vh;
    padding: 15px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: #32325d;
    p {
      text-align: center;
    }
  }
  .statistics {
    height: 6vh;
    margin: 10px 2vw 0 2vw;
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        height: 6vh;
        padding: 0 4px;
        display: inline-block;
        .data {
          height: 2vh;
          min-width: 48px;
          font-size: 1.8rem;
          margin-bottom: 5px;
          color: #32325d;
          font-weight: bolder;
          display: flex;
          align-items: last baseline;
          justify-content: center;
        }
        .info {
          height: 2vh;
          font-size: 1.5rem;
          margin-top: 0.8rem;
          color: #32325d;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .myOtherInfo {
    height: 40px;
    margin: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    ul {
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        width: 33px;
        height: 33px;
        margin: 0 5px;
      }
    }
  }
  .little-link {
    height: 33px;
    width: 100%;
    margin: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    ul {
      height: 33px;
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        height: 33px;
        margin: 0 5px;
        width: 120px;
        .el-link {
          .li-icon {
            height: 33px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .li-span {
            height: 33px;
            font-size: 18px;
            margin-left: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}
</style>
