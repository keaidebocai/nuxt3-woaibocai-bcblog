<script setup lang="ts">
useHead({
  title: "test",
});
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
          <li>
            <div class="myHeader-nav-right-menu-img">
              <img src="~/assets/icon/search.png" width="32px" />
            </div>
            <div class="myHeader-nav-right-menu-title">
              <h2>搜索</h2>
            </div>
          </li>
          <li>
            <a href="/" target="_blank" title="首页">
              <div class="myHeader-nav-right-menu-img">
                <img src="~/assets/icon/home.png" width="34px" />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>首页</h2>
              </div>
            </a>
          </li>
          <li>
            <a href="/category" target="_blank" title="文章分类">
              <div class="myHeader-nav-right-menu-img">
                <img src="~/assets/icon/category.png" width="32px" />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>文章分类</h2>
              </div>
            </a>
          </li>
          <li>
            <a href="/friends" target="_blank" title="友情链接">
              <div class="myHeader-nav-right-menu-img">
                <img src="~/assets/icon/friends.png" width="32px" />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>友情链接</h2>
              </div>
            </a>
          </li>
          <li>
            <a
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
          <li>
            <a href="/about" target="_blank" title="关于">
              <div class="myHeader-nav-right-menu-img">
                <img src="~/assets/icon/about.png" width="32px" />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>关于</h2>
              </div>
            </a>
          </li>
          <li style="margin-right: 30px">
            <a href="/login" target="_blank" title="登录">
              <div class="myHeader-nav-right-menu-img">
                <img src="~/assets/icon/login.png" width="32px" />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>登录</h2>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped></style>
