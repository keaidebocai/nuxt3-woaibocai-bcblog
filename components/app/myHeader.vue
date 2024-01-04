<script setup lang="ts">
const showLogin = ref(false);
</script>

<template>
  <div class="myHeader">
    <nav class="myHeader-nav">
      <div class="myHeader-nav-letf">
        <h1 class="myHeader-nav-letf-logo">
          <a href="http://www.likebocai.com" target="_blank" title="菠菜的小窝">
            <img
              src="https://qiniu.woaibocai.top/static/img/tou.png"
              alt="菠菜的小窝,BoCai's Kennel网站log"
              title="菠菜的小窝"
              width="60px"
              height="60px"
            />
            菠菜的小窝
          </a>
        </h1>
        <h1 class="myHeader-nav-letf-title">
          <a href="http://www.likebocai.com" target="_blank" title="菠菜的小窝">
            菠菜的小窝
          </a>
        </h1>
      </div>
      <div class="myHeader-nav-right">
        <ul class="myHeader-nav-right-menu">
          <li class="myHeader-nav-right-menu-ul-li">
            <div class="myHeader-nav-right-menu-img">
              <img src="~/assets/icon/search.png" width="32px" />
            </div>
            <div class="myHeader-nav-right-menu-title">
              <h2>搜索</h2>
            </div>
          </li>
          <li class="myHeader-nav-right-menu-ul-li">
            <a
              class="myHeader-nav-right-menu-ul-li-a"
              href="/"
              target="_blank"
              title="首页"
            >
              <div class="myHeader-nav-right-menu-img">
                <img src="~/assets/icon/home.png" width="34px" />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>首页</h2>
              </div>
            </a>
          </li>
          <li class="myHeader-nav-right-menu-ul-li">
            <a class="myHeader-nav-right-menu-ul-li-a" title="文章分类">
              <div class="myHeader-nav-right-menu-img">
                <img src="~/assets/icon/category.png" width="32px" />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>分类</h2>
              </div>

              <ul class="myHeader-nav-right-menu-sub-ul">
                <li class="myHeader-nav-right-menu-sub-li">
                  <div>
                    <img src="~/assets/icon/home.png" width="34px" />
                    <h2>首页</h2>
                  </div>
                </li>
                <li class="myHeader-nav-right-menu-sub-li">
                  <div>
                    <img src="~/assets/icon/category.png" width="34px" />
                    <h2>分类</h2>
                  </div>
                </li>
                <li class="myHeader-nav-right-menu-sub-li">
                  <div>
                    <img src="~/assets/icon/friends.png" width="34px" />
                    <h2>友情链接</h2>
                  </div>
                </li>
                <li class="myHeader-nav-right-menu-sub-li">
                  <div>
                    <img src="~/assets/icon/travelling.png" width="34px" />
                    <h2>开往</h2>
                  </div>
                </li>
              </ul>
            </a>
          </li>
          <li class="myHeader-nav-right-menu-ul-li">
            <a
              class="myHeader-nav-right-menu-ul-li-a"
              href="/friends"
              target="_blank"
              title="友情链接"
            >
              <div class="myHeader-nav-right-menu-img">
                <img src="~/assets/icon/friends.png" width="32px" />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>友情链接</h2>
              </div>
            </a>
          </li>
          <li class="myHeader-nav-right-menu-ul-li">
            <a
              class="myHeader-nav-right-menu-ul-li-a"
              href="https://www.travellings.cn/go.html"
              target="_blank"
              title="随机去一个好看的博客"
            >
              <div class="myHeader-nav-right-menu-img">
                <img
                  src="~/assets/icon/travelling.png"
                  title="随机去一个好看的博客"
                  width="32px"
                />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>开往</h2>
              </div>
            </a>
          </li>
          <li class="myHeader-nav-right-menu-ul-li">
            <a
              class="myHeader-nav-right-menu-ul-li-a"
              href="/about"
              target="_blank"
              title="关于"
            >
              <div class="myHeader-nav-right-menu-img">
                <img src="~/assets/icon/about.png" width="32px" />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>关于</h2>
              </div>
            </a>
          </li>
          <li
            v-show="showLogin"
            class="myHeader-nav-right-menu-ul-li"
            style="margin-right: 30px"
          >
            <a
              class="myHeader-nav-right-menu-ul-li-a"
              href="/login"
              target="_blank"
              title="登录"
            >
              <div class="myHeader-nav-right-menu-img">
                <img src="~/assets/icon/login.png" width="32px" />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>登录</h2>
              </div>
            </a>
          </li>
        </ul>
        <div v-show="!showLogin" class="myHeader-nav-right-loginInfo">
          <div class="imgStyle">
            <img
              src="https://cdn.woaibocai.top/bcblog/public/src/avatar-1.jpg"
              width="32px"
            />
          </div>
          <div class="myh2">
            <h2>Hi! 菠菜的小窝</h2>
            <ul>
              <li>个人中心</li>
              <li>退出登录</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped></style>
