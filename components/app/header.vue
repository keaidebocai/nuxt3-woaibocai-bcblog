<script setup lang="ts">
onMounted(() => {
  fectData();
  allCategoryList();
  allMenuList();
  // setInterval(fectData,500)
});
import { Logout } from "~/api/login";
import { GetAllCategory } from "~/api/blog/category";
import { GetAllMenu } from "~/api/blog/menu";
import { useTokenStore } from "~/store/useToken";
const menuData = [
  {
    id: "",
    menuName: "",
    url: "",
  },
];
const userInfoData = {
  avatar: "https://qiniu.woaibocai.top/static/img/tou.png",
  nickName: "",
};
const categoryData = [
  {
    id: "",
    categoryName: "",
  },
];
const categorys = ref(categoryData);
const menus = ref(menuData);
const isLogin = ref(true);
const userInfo = ref(userInfoData);
const useToken = useTokenStore();
const router = useRouter();
const LoginClick = () => {
  router.push("/login");
};
const handleSelect = (key: string, keyPath: string[]) => {};
// 登出
const logout = async () => {
  const { data } = await Logout(useToken.getToken).catch((err) => {
    ElMessage.error("退出失败!请清除浏览器缓存！");
    throw err;
  });
  useToken.removeToken();
  useToken.removeUserInfo();
  isLogin.value = true;
};
// 分类列表
const allCategoryList = async () => {
  const { data } = await GetAllCategory().catch((err) => {
    ElMessage.error("我不粘锅的,肯定是你的网络出问题了!");
    throw err;
  });
  categorys.value = data;
};
// 菜单列表
const allMenuList = async () => {
  const { data } = await GetAllMenu().catch((err) => {
    ElMessage.error("我不粘锅的,肯定是你的网络出问题了!");
    throw err;
  });
  menus.value = data;
};
// 初始化数据
const fectData = () => {
  if (localStorage.getItem("likebocai:userInfo") != null) {
    isLogin.value = false;
    userInfo.value.avatar = useToken.getUserInfo.avatar;
    userInfo.value.nickName = useToken.getUserInfo.nickName;
    // userInfo.value = useToken.getUserInfo
  } else {
    isLogin.value = true;
  }
};
// onMounted(() => {
//   fectData();
//   allCategoryList();
//   allMenuList();
//   // setInterval(fectData,500)
// });
</script>
<!-- #545c64 #fff #ffd04b -->
<template>
  <div
    style="
      padding-bottom: 3vh;
      display: flex;
      justify-content: center;
      align-content: center;
    "
  >
    <div>
      <client-only>
        <el-menu
          router
          unique-opened
          mode="horizontal"
          background-color="transparent"
          @select="handleSelect"
          style="max-width: 1426.25px; min-width: 1052.625px; width: 87.5vw"
        >
          <!-- <el-menu-item index="/" class="blog-title-logo"></el-menu-item> -->
          <el-menu-item style="display: flex" index="/">
            <img
              class="blog-title-logo"
              src="https://qiniu.woaibocai.top/static/img/tou.png"
            />
            <h1 class="blog-title">菠菜的小窝</h1>
          </el-menu-item>
          <el-sub-menu
            style="background-color: transparent !important"
            index="/nmsl"
          >
            <template #title
              ><h1 style="color: #fff; font-size: 20px; display: flex">
                <ElIconList style="width: 20px" />&nbsp;分类
              </h1></template
            >
            <el-menu-item
              v-for="category in categorys"
              :index="`/category/` + category.id"
            >
              <p style="font-weight: bolder; font-size: 20px">
                {{ category.categoryName }}
              </p>
            </el-menu-item>
            <!-- <el-menu-item index="2-3">item three</el-menu-item> -->
          </el-sub-menu>
          <el-menu-item v-for="menu in menus" :index="menu.url">
            <p style="font-weight: bolder; font-size: 20px; color: #fff">
              {{ menu.menuName }}
            </p>
          </el-menu-item>
        </el-menu>
      </client-only>
    </div>
    <div class="myLogin">
      <p
        style="font-size: 20px; color: #fff"
        link
        v-show="isLogin"
        @click="LoginClick"
      >
        登录
      </p>
      <el-dropdown v-show="!isLogin">
        <span>
          <el-avatar :size="32" :src="userInfo.avatar" />
          <p style="font-weight: bolder; font-size: 20px">
            Hi! {{ userInfo.nickName }}
          </p>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>编辑</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!-- 登录注册弹框 -->
  <!-- <client-only>
    <el-dialog style="max-width: 50vh;" v-model="dialogLoginVisible" title="登录" center>
      <el-tabs v-model="activeName" :stretch="true" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-from
            label-position="top"
            size="large"
            class="loginForm"
            >
            <el-form-item label="用户名:" prop="userName">
              <el-input v-model="Myform.userName" :prefix-icon="User" placeholder="请输入用户名"/>
            </el-form-item>
            <br/>
            <el-form-item label="密码:" prop="password">
              <el-input v-model="Myform.password" :prefix-icon="Lock" type="password" show-password placeholder="请输入你的密码" /> 
            </el-form-item>
            <br/>
            <el-form-item class="LoginButton">
              <el-button style="width: 20rem;" size="large" type="primary" :loading="isLoading" @click="LoginMyBlog">登录</el-button>
            </el-form-item>
          </el-from>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register"><nuxt-link to="/login" @click="dialogLoginVisible = false;">去注册</nuxt-link></el-tab-pane>
      </el-tabs>
    </el-dialog>
  </client-only> -->
</template>
<style lang="scss" scoped>
.myLogin {
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-left: 30px;
  max-width: 203.75px;
  min-width: 150.374px;
  width: 12.5vw;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 0;
  // 菠菜的小窝选中状态下面横线的颜色
  color: #fff !important;
  background-color: transparent !important;
}
.blog-title {
  color: #fff;
  font-size: 30px;
  padding-left: 20px;
}
.blog-title-logo {
  width: 5vh;
  height: 5vh;
  border-radius: 20px;
}
.el-menu--horizontal ul {
  margin-bottom: 0;
}
* {
  cursor: url(https://cdn.woaibocai.top/bcblog/assets/cursor/help.cur), pointer;
}
:deep(.el-menu--horizontal.el-menu) {
  border-bottom: solid 10px 0 !important;
}
// 菜单栏下面的border
.el-menu--horizontal.el-menu {
  border-bottom: 0;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  outline: 0;
  color: #fff;
  background-color: transparent;
}
// .el-menu-item:hover {
//   background-color: red;
// }
.el-menu--horizontal .el-menu .el-menu-item:hover {
  background-color: transparent !important;
  color: green;
}
.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginForm {
  width: auto;
  .el-form-item {
    width: 20rem;
  }
}
.demo-tabs {
  .el-tab-pane {
    width: 30rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-input {
      height: 2.5rem;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }
  }
}
.LoginButton {
  display: flex;
  justify-content: center;
  align-items: center;
}
* {
  // 菜单栏的宽度
  --el-menu-horizontal-height: 5vh;
  --el-menu-bg-color: transparent;
  --el-menu-hover-bg-color: transparent;
}
</style>
