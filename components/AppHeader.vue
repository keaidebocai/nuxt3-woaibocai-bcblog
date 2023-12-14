<script setup lang="ts">
import { ref } from 'vue'
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const items = [
  {
    asd: '1',
    qwe: '1-1'
  },
  {
    asd: '2',
    qwe: '2-1'
  }
]
const isLogin = ref(true)
const dialogLoginVisible = ref(false)
const LoginClick = () => {
  // Myform.value = {
  //   userName: '',
  //   password: ''
  // }
  // dialogLoginVisible.value = true
  router.push("/login")
}

import type { TabsPaneContext } from 'element-plus'
import { Message, User, Lock } from '@element-plus/icons-vue'
const activeName = ref('login')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
//登录弹框
import type { FormRules, FormInstance } from 'element-plus'
const isLoading = ref(false)
//定义表单校验规则 elementPlus 和 TS 泛型的增益效果
const MyRules = reactive<FormRules>({
  userName: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { min: 5, message: '账户必须大于5位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 18, message: '长度必须在6-18位', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    // ^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com|gmail\.com)$ 必须是腾讯或谷歌
    // ^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com)$ 必须是腾讯
    { pattern: '^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com|gmail\.com)$', message: '请正确输入腾讯/谷歌邮箱', trigger: 'blur'}
  ]
})
const MyFormRef = ref<FormInstance>()
//表单的响应式数据
const formData = {
  userName: '',
  password: ''
}
const userInfoData = {
  avatar: "https://qiniu.woaibocai.top/static/img/tou.png",
  nickName: ""
}
const userInfo = ref(userInfoData)
const Myform = ref(formData)
import { useTokenStore } from '~/store/useToken'
const useToken = useTokenStore()
const router = useRouter()
import { Login, Logout } from '~/api/login'
const LoginMyBlog = async() => {
  // isLoading.value = true
  // 表单校验
//   await MyFormRef.value?.validate().catch((err) => {
//   ElMessage.error('请你康康你输入的信息是否有误...')
//   isLoading.value = false
//   throw err
//   //return new Promise(() => {})
// })
  //正式发送登录请求
  const { data } = await Login(Myform.value)
  .then((res) => {
    isLoading.value = true
    console.log(res.code)
    if (res.code === 200) {
        useToken.saveToken(res.data)
        getUserInfo()
        ElMessage.success('登陆成功!')
        isLoading.value = false
        return res.data
    } else {
        ElMessage.error(res.message)
        isLoading.value = false
        throw new Error('登录信息有误!')
    }
  })
  console.log(data)
  isLoading.value = false

  //跳转到主页面
  dialogLoginVisible.value = false
  // location.reload()
  // router.push("/")
  router.go(0)
}
const getUserInfo = async() => {
  const { data } = await useGetUserInfo({
    method: 'get'
  })
  useToken.saveUserInfo(data)
  userInfo.value = data
  isLogin.value = false
}
const fectData = () => {
  if(localStorage.getItem("likebocai:userInfo") != null) {
    console.log(useToken.getUserInfo)
    isLogin.value = false
    userInfo.value = useToken.getUserInfo
  } else {
    isLogin.value = true
  }
}
const logout = async() => {
  await Logout(useToken.getToken)
  useToken.removeToken()
  useToken.removeUserInfo()
  isLogin.value = true
}
onMounted(()=>{
  fectData()
})
</script>
<!-- #545c64 #fff #ffd04b -->
<template>
  <el-row>
    <el-col :span="21">
      <client-only>
      <el-menu
          router
          unique-opened
          mode="horizontal"
          background-color="transparent"
          @select="handleSelect"
        >
        <!-- <el-menu-item index="/" class="blog-title-logo"></el-menu-item> -->
        <el-menu-item style="display: flex;" index="/">
          <img class="blog-title-logo" src="https://qiniu.woaibocai.top/static/img/tou.png"/>
          <h1 class="blog-title">菠菜的小窝</h1>
        </el-menu-item>
        <el-sub-menu style="background-color: transparent !important;" index="/nmsl">
          <template #title><h1 style="color: #fff; font-size: 20px;">分类</h1></template>
            <el-menu-item v-for="item in items" :index="item.asd">
              <p style="font-weight: bolder; font-size: 20px;">
                {{ item.qwe }}
              </p>
            </el-menu-item>
            <!-- <el-menu-item index="2-3">item three</el-menu-item> -->
        </el-sub-menu>
        <el-menu-item v-for="item in items" :index="item.asd">
          <p style="font-weight: bolder; font-size: 20px; color: #fff;">
            {{ item.qwe }}
          </p>
        </el-menu-item>
      </el-menu>
    </client-only>
    </el-col>
    <el-col :span="3">
      <div class="myLogin">
        <p style="font-size: 20px;color: #fff;" link v-show="isLogin" @click="LoginClick">登录</p>
        <el-dropdown v-show="!isLogin">
          <span>
            <el-avatar :size="32" :src="userInfo.avatar" />
            <p>hello! {{ userInfo.nickName }}</p>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>编辑</el-dropdown-item>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
  <!-- 登录注册弹框 -->
  <client-only>
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
  </client-only>
</template>
<style lang="scss" scoped>
.myLogin {
  height: 8vh;
  display: flex;
  align-items: center; 
  justify-content: center;
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
}
.blog-title-logo {
  width: 8vh;
  height: 8vh;
  padding-right: 20px;

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
.loginForm{
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
  --el-menu-horizontal-height: 8vh; 
  --el-menu-bg-color: transparent;
  --el-menu-hover-bg-color: transparent;
}
</style>