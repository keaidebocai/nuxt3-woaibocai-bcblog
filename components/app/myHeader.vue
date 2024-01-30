<script setup lang="ts">
import { useTokenStore } from "~/store/useToken";
import { Logout } from "~/api/login";
import { User, Lock } from "@element-plus/icons-vue";
const showLogin = ref(false);
const userInfoData = {
  avatar: "https://qiniu.woaibocai.top/static/img/tou.png",
  nickName: "",
};
const userInfo = ref(userInfoData);
const useToken = useTokenStore();
const MyUrl = useRuntimeConfig().public.BASE_URL;
const route = useRoute();
// 登出
const logout = async () => {
  await Logout(useToken.getToken);
  ElMessage.success("退出成功!");
  useToken.removeToken();
  useToken.removeUserInfo();
  showLogin.value = true;
  // navigateTo(`${route.fullPath}`, { external: true });
};
// 初始化数据
const fectData = () => {
  if (localStorage.getItem("likebocai:userInfo") != null) {
    showLogin.value = false;
    userInfo.value.avatar = useToken.getUserInfo.avatar;
    userInfo.value.nickName = useToken.getUserInfo.nickName;
    // userInfo.value = useToken.getUserInfo
  } else {
    showLogin.value = true;
  }
};
const { data } = await useAsyncData("muHeader", () =>
  $fetch(MyUrl + "/blog/header/getAllCategoryNameAndUrl")
);
const categoryData = ref([
  {
    categoryName: "",
    categoryUrl: "",
    categoryIconUrl: "",
    count: 0,
  },
]);
if (typeof window !== "undefined") {
  fectData();
  categoryData.value = data.value.data;
}
const dialogVisible = ref(false);
const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});
</script>

<template>
  <div class="myHeader">
    <nav class="myHeader-nav">
      <div class="myHeader-nav-letf">
        <h1 class="myHeader-nav-letf-logo">
          <a href="http://www.likebocai.com" title="菠菜的小窝">
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
          <a href="http://www.likebocai.com" title="菠菜的小窝"> 菠菜的小窝 </a>
        </h1>
      </div>
      <div class="myHeader-nav-right">
        <ul class="myHeader-nav-right-menu">
          <li class="myHeader-nav-right-menu-ul-li">
            <div class="myHeader-nav-right-menu-img">
              <img src="~/assets/icon/search.png" width="32px" />
            </div>
            <div class="myHeader-nav-right-menu-title">
              <h2 @click="dialogVisible = true">搜索</h2>
            </div>
          </li>
          <li class="myHeader-nav-right-menu-ul-li">
            <a class="myHeader-nav-right-menu-ul-li-a" href="/" title="首页">
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
                <li
                  v-for="category in categoryData"
                  class="myHeader-nav-right-menu-sub-li"
                >
                  <div @click="navigateTo(`/category/${category.categoryUrl}`)">
                    <img :src="category.categoryIconUrl" width="34px" />
                    <h2>
                      <a :href="`/category/${category.categoryUrl}`">{{
                        category.categoryName
                      }}</a>
                      <p
                        style="
                          color: rgba(0, 0, 0, 0.6);
                          background-color: rgba(255, 255, 255, 0.5);
                          font-size: 1rem;
                          border-radius: 50%;
                          position: absolute;
                          right: 5px;
                        "
                      >
                        {{ category.count }}
                      </p>
                    </h2>
                  </div>
                </li>
                <!-- <li class="myHeader-nav-right-menu-sub-li">
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
                </li> -->
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
            <h2>Hi! {{ userInfo.nickName }}</h2>
            <ul>
              <li>个人中心</li>
              <li @click="logout">退出登录</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <ClientOnly>
    <el-dialog v-model="dialogVisible" title="登陆注册" width="600" draggable>
      <div>
        <el-tabs type="border-card">
          <el-tab-pane label="登录">
            <div class="mycenter">
              <el-form
                label-position="right"
                label-width="65px"
                :model="formLabelAlign"
                style="max-width: 300px"
              >
                <el-form-item label="用户名:">
                  <el-input
                    v-model="formLabelAlign.name"
                    :prefix-icon="User"
                    clearable
                    :maxlength="18"
                    placeholder="用户名/邮箱"
                  />
                </el-form-item>
                <el-form-item label="密码:">
                  <el-input
                    v-model="formLabelAlign.region"
                    :prefix-icon="Lock"
                    show-password
                    :maxlength="18"
                    placeholder="请输入密码"
                  />
                </el-form-item>
                <div style="height: 42px" class="mycenter">
                  <el-button
                    type="primary"
                    style="
                      height: 40px;
                      width: 150px;
                      border-radius: 20px;
                      margin-left: 60px;
                    "
                    >登录</el-button
                  >
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane :lazy="true" label="注册">注册</el-tab-pane>
          <el-tab-pane :lazy="true" label="忘记密码">忘记密码</el-tab-pane>
        </el-tabs>
      </div>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </ClientOnly>
</template>
<style>
.el-dialog__title {
  font-size: 25px;
}
.el-tabs__item {
  font-size: 18px;
}
.el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}
.el-form-item__label {
  font-size: 16px;
  height: 32px;
  width: 40px;
}
.el-input__inner {
  width: 100%;
  font-size: 16px;
  height: 40px;
}
.el-input {
  --el-input-border-radius: 20px;
}
.el-form-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style lang="scss" scoped>
.mycenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
