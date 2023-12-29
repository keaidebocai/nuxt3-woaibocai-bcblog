<script setup lang="ts">
definePageMeta({
  layout: "nothing",
});

//图标引入
import { Message, User, Lock } from "@element-plus/icons-vue";
import { useTokenStore } from "~/store/useToken";
import { Login, Register } from "~/api/login";
import type { FormRules, FormInstance } from "element-plus";
//定义表单校验规则 elementPlus 和 TS 泛型的增益效果
const rules = reactive<FormRules>({
  userName: [
    { required: true, message: "请输入电话号码", trigger: "blur" },
    { min: 5, message: "账户必须大于5位", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 18, message: "长度必须在6-18位", trigger: "blur" },
  ],
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    // ^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com|gmail\.com)$ 必须是腾讯或谷歌
    // ^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com)$ 必须是腾讯
    {
      pattern: "^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com|gmail\.com)$",
      message: "请正确输入腾讯/谷歌邮箱",
      trigger: "blur",
    },
  ],
});

//表单的响应式数据
const formData = {
  userName: "",
  password: "",
};
const fromRegisterData = {
  userName: "",
  password: "",
  email: "",
};

//是否定义加载中
const isLoading = ref(false);
const isMyLoading = ref(false);
const form = ref(formData);
const fromRegister = ref(fromRegisterData);
const router = useRouter();
const useToken = useTokenStore();
const formRef = ref<FormInstance>();
const formRefByRegister = ref<FormInstance>();

const getUserInfo = async () => {
  const { data } = await useGetUserInfo({
    method: "get",
  });
  useToken.saveUserInfo(data);
};

//登陆事件
const onSubmit = async () => {
  isMyLoading.value = true;
  //表单校验
  await formRefByRegister.value?.validate().catch((err) => {
    ElMessage.error("请你看看你输入的信息是否有误...");
    isMyLoading.value = false;
    throw err;
  });
  //正式发送登录请求
  const data = await Login(form.value)
    .then((res) => {
      isMyLoading.value = true;
      if (res.code === 200) {
        useToken.saveToken(res.data);
        getUserInfo();
        ElMessage.success("登陆成功!");
        ElMessage.success("遇事不绝？CTRL + R !");
        return res.data;
      } else {
        ElMessage.error(res.message);
        isMyLoading.value = false;
        throw new Error("登录信息有误!");
      }
    })
    .catch((err) => {
      ElMessage.error("我不粘锅的，你的网络出问题了!");
      throw err;
    });
  //保存tokrn信息
  isMyLoading.value = false;
  //跳转到主页面
  await navigateTo("/", { external: true });
  // router.push("/")
  // router.go(-1)
};

//注册
const onSubmitByRegister = async () => {
  isLoading.value = true;
  //表单校验
  await formRef.value?.validate().catch((err) => {
    ElMessage.error("请你康康你输入的信息是否有误...");
    isLoading.value = false;
    throw err;
    //return new Promise(() => {})
  });
  const { data } = await Register(fromRegister.value).catch((err) => {
    ElMessage.error("我不粘锅的，你的网络出问题了!");
    throw err;
  });
};
// 用ts控制本地登录和注册组件
const signInBtn = ref<HTMLElement | null>(null);
const signUpBtn = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const addEventListeners = () => {
  if (container.value !== null) {
    if (signInBtn.value !== null) {
      signInBtn.value.addEventListener("click", () => {
        if (container.value !== null) {
          container.value.classList.remove("panel-active");
        }
      });
    }
    if (signUpBtn.value !== null) {
      signUpBtn.value.addEventListener("click", () => {
        if (container.value !== null) {
          container.value.classList.add("panel-active");
        }
      });
    }
  }
};
// 页面初始化
onMounted(() => {
  signInBtn.value = document.querySelector("#signIn");
  signUpBtn.value = document.querySelector("#signUp");
  container.value = document.querySelector(".container");
  addEventListeners();
});
</script>
<template>
  <div class="myApp">
    <div class="container">
      <div class="container-form container-signup" id="signup-container">
        <form action="#" class="form" id="form1" style="font-size: 18px">
          <h1 class="form-title" style="font-size: 20px">注册账号</h1>
          <el-form
            :model="fromRegister"
            ref="formRef"
            :rules="rules"
            label-width="120px"
            label-position="top"
            size="large"
            @keydown.enter="onSubmitByRegister"
            :loading="isLoading"
          >
            <el-form-item label="用户名:" prop="userName">
              <el-input
                v-model="fromRegister.userName"
                :prefix-icon="User"
                placeholder="输入你的用户名/手机号"
              />
            </el-form-item>
            <br />
            <el-form-item label="邮箱:" prop="email">
              <el-input
                v-model="fromRegister.email"
                :prefix-icon="Message"
                placeholder="输入你的邮箱"
              />
            </el-form-item>
            <br />
            <el-form-item label="密&emsp;码:" prop="password">
              <el-input
                v-model="fromRegister.password"
                show-password
                :prefix-icon="Lock"
                placeholder="请输入你的密码"
              />
            </el-form-item>
          </el-form>
          <button class="btn" @click="onSubmitByRegister" :disabled="isLoading">
            点击注册
          </button>
        </form>
      </div>

      <div class="container-form container-signin hidden" id="signin-container">
        <form action="#" class="form" id="form2">
          <h1 class="form-title" style="font-size: 20px">欢迎登录</h1>
          <el-form
            :model="form"
            ref="formRefByRegister"
            :rules="rules"
            label-width="120px"
            label-position="top"
            size="large"
            @keydown.enter="onSubmit"
            :loading="isMyLoading"
          >
            <el-form-item label="用户名:" prop="userName">
              <el-input
                v-model="form.userName"
                :prefix-icon="User"
                placeholder="输入你的用户名/手机号"
              />
            </el-form-item>
            <br />
            <el-form-item label="密&emsp;码:" prop="password">
              <el-input
                v-model="form.password"
                show-password
                :prefix-icon="Lock"
                placeholder="请输入你的密码"
              />
            </el-form-item>
          </el-form>
          <a href="#" class="link">忘记密码?</a>
          <el-button class="btn" @click="onSubmit" :disabled="isMyLoading"
            >登录</el-button
          >
        </form>
      </div>

      <div class="container-overlay">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <button class="btn" id="signIn">已有账号，直接登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <button class="btn" id="signUp">没有账号，点击注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  // ~/assets/asd/preview.gif
  height: 100vh;
  background: #e7e7e7
    url(https://img.crowya.com/wp-content/uploads/2023/05/beauty.jpg) center
    no-repeat fixed;
  background-size: cover;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background-color: #e7e7e7;
  border-radius: 0.7rem;
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: 420px;
  max-width: 750px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.container-form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.container-signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.container-signin {
  left: 0;
  width: 50%;
  z-index: 2;
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
  background-color: #e7e7e7;
}

.form-title {
  font-weight: 300;
  margin: 0 0 1.25rem;
}

.link {
  color: #333;
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;
}

.input {
  width: 100%;
  background-color: #fff;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  border: none;
  outline: none;
}

.btn {
  background-color: #f25d8e;
  box-shadow: 0 4px 4px rgba(255, 112, 159, 0.3);
  border-radius: 5px;
  color: #e7e7e7;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.form > .btn {
  margin-top: 1.5rem;
}

.btn:active {
  transform: scale(0.95);
}

.container-overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.overlay {
  width: 200%;
  height: 100%;
  position: relative;
  left: -100%;
  background: url(https://img.crowya.com/wp-content/uploads/2023/05/beauty.jpg)
    no-repeat center fixed;
  background-size: cover;
  transition: transform 0.6s ease-in-out;
  transform: translatex(0);
}

.overlay-panel {
  height: 100%;
  width: 50%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: translatex(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.panel-active .overlay-left {
  transform: translateX(0);
}

.panel-active .container-overlay {
  transform: translateX(-100%);
}

.panel-active .overlay {
  transform: translateX(50%);
}

.panel-active .container-signin {
  transform: translateX(100%);
}

.panel-active .container-signup {
  opacity: 1;
  z-index: 5;
  transform: translateX(100%);
}
.myApp {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.el-form-item__label) {
  font-size: 16px;
}
:deep(.el-form-item__error) {
  color: var(--el-color-danger);
  font-size: 16px;
}
</style>
