<script setup lang="ts">
const startTime = new Date("2023-06-08T13:00:00"); // 你站点启动的时间
const uptime = ref<string>("");
const nowYear = new Date().getFullYear();
const calculateUptime = () => {
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - startTime.getTime();
  const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
  const days = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  uptime.value = `${years}年 ${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
};
// 组件通信
const props = defineProps(["isMobile", "myClass"]);
// const myClass = ref("MyButtom");
const imgMargin = ref("3px");
if (props.isMobile) {
  imgMargin.value = "0px";
}
setInterval(calculateUptime, 1000); // 每秒钟更新一次
</script>
<template>
  <el-row>
    <el-col :spna="12">
      <div :class="props.myClass">
        <ul>
          <li>
            <span class="shake"
              >Copyright © 2023-{{ nowYear }} By Likebocai. All Rights
              Reserved&nbsp;୧(๑•̀⌄•́๑)૭</span
            >
          </li>
          <li>
            <span>
              <a href="https://beian.miit.gov.cn/" target="_blank"
                >陕ICP备2022006198号-2</a
              >
            </span>
          </li>
          <li>
            <span>
              <a href="https://beian.miit.gov.cn/" target="_blank"
                >陕ICP备2022006198号-2</a
              >
            </span>
          </li>
          <li v-show="!props.isMobile">
            <span>
              Powered By&nbsp;
              <a href="https://www.likebocai.com" target="_blank">
                Likebocai
              </a>
              &ensp;|&ensp; Design By&ensp;
              <img src="https://cdn.woaibocai.top/bcblog/public/favicon.ico" />
              <a href="https://www.likebocai.com" target="_blank">
                菠菜的小窝
              </a>
              &ensp;|&ensp; Code By&nbsp;
              <a href="https://www.likebocai.com" target="_blank">
                Likebocai
              </a>
            </span>
          </li>
          <li v-show="props.isMobile" style="height: 4vh; margin-top: 1.5vh">
            <span>
              <ul>
                <li>
                  Powered By&nbsp;
                  <a href="https://www.likebocai.com" target="_blank">
                    Likebocai
                  </a>
                </li>
                <li>
                  Design By&ensp;
                  <img
                    src="https://cdn.woaibocai.top/bcblog/public/favicon.ico"
                  />
                  <a href="https://www.likebocai.com" target="_blank">
                    菠菜的小窝
                  </a>
                </li>
                <li>
                  Code By&nbsp;
                  <a href="https://www.likebocai.com" target="_blank">
                    Likebocai
                  </a>
                </li>
              </ul>
            </span>
          </li>
          <li>
            <span class="upupText"> 本站已苟延残喘 {{ uptime }} </span>
          </li>
          <li>
            <span style="font-size: 1.5vh; color: rgba(255, 255, 255, 0.6)">
              当前本站版本: V2.0.0.231224_Likebocai
            </span>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.MyButtom {
  min-width: 873px;
  max-width: 1200px;

  width: 100%;
  height: 22vh;
  margin-top: 5vh;
  margin-bottom: 10vh;
  border-radius: 20px;
  background-color: rgba(149, 212, 117, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  .upupText {
    background-image: linear-gradient(red, blue);
    -webkit-background-clip: text;
    color: transparent;
  }
  @-webkit-keyframes shake {
    0% {
    }

    25% {
      transform: rotate(3deg);
    }

    50% {
      -webkit-transform: translate(0px, 15px);
    }
    75% {
      transform: rotate(-3deg);
    }

    100% {
    }
  }

  @keyframes shake {
    0% {
    }

    25% {
      transform: rotate(3deg);
    }

    50% {
      -webkit-transform: translate(0px, 15px);
    }
    75% {
      transform: rotate(-3deg);
    }

    100% {
    }
  }
  .shake {
    -webkit-animation: shake 1s infinite;
    animation: shake 1s infinite;
  }
  .shake:hover {
    -webkit-animation: shake 0.5s infinite;
    animation: shake 0.5s infinite;
  }
  span {
    height: 2.5vh;
    font-size: 1.8vh;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    a {
      color: rgba(0, 0, 0, 0.4);
      font-weight: bolder;
      text-align: center;
    }
    img {
      height: 1.5vh;
      margin-bottom: v-bind(imgMargin);
      border-radius: 25%;
    }
  }
}
@media screen and (max-width: 1281px) {
  .MyButtom {
    min-width: 600px;
    max-width: 600px;
  }
}
@media screen and (max-width: 1441px) {
  .MyButtom {
    max-width: 873px;
  }
}
.MyButtomMobile {
  width: 100%;
  height: 22vh;
  margin-top: 5vh;
  margin-bottom: 10vh;
  border-radius: 20px;
  background-color: rgba(149, 212, 117, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  .upupText {
    background-image: linear-gradient(red, blue);
    -webkit-background-clip: text;
    color: transparent;
  }
  @-webkit-keyframes shake {
    0% {
    }

    25% {
      transform: rotate(3deg);
    }

    50% {
      -webkit-transform: translate(0px, 15px);
    }
    75% {
      transform: rotate(-3deg);
    }

    100% {
    }
  }

  @keyframes shake {
    0% {
    }

    25% {
      transform: rotate(3deg);
    }

    50% {
      -webkit-transform: translate(0px, 15px);
    }
    75% {
      transform: rotate(-3deg);
    }

    100% {
    }
  }
  .shake {
    -webkit-animation: shake 1s infinite;
    animation: shake 1s infinite;
  }
  .shake:hover {
    -webkit-animation: shake 0.5s infinite;
    animation: shake 0.5s infinite;
  }
  span {
    height: 2.5vh;
    font-size: 1.8vh;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    a {
      color: rgba(0, 0, 0, 0.4);
      font-weight: bolder;
      text-align: center;
    }
    img {
      height: 1.5vh;
      margin-bottom: v-bind(imgMargin);
      border-radius: 25%;
    }
  }
}
.MyButtom:hover {
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.3);
  transform: scale(1.03);
}
</style>
