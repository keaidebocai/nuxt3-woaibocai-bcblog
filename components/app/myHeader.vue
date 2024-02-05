<script setup lang="ts">
import { useTokenStore } from "~/store/useToken";
import {
  Login,
  Logout,
  RegisterCode,
  Register,
  Forgot,
  ForgotEmailCode,
} from "~/api/login";
import { GetUserInfo, UpdateUserInfo } from "~/api/user";
import { User, Lock, Message, Key, Orange } from "@element-plus/icons-vue";
import type { UploadInstance, UploadProps } from "element-plus";
const uploadavatar = ref<UploadInstance>();
const showLogin = ref(false);
const userInfoData = {
  avatar: "https://cdn.likebocai.com/bcblog/public/src/tou.png",
  nickName: "",
  sex: "",
  userId: "",
};
const userInfo = reactive(userInfoData);
const useToken = useTokenStore();
const MyUrl = useRuntimeConfig().public.HTTP_URL;
// 标签页的东西
const activeName = ref("0");
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
const getUserInfo = async () => {
  const res: ResponedType<string> = await GetUserInfo().then(
    (res: ResponedType<string>) => {
      if (res.code == 200) {
        useToken.saveUserInfo(res.data);
        showLogin.value = false;
        userInfo.avatar = useToken.getUserInfo.avatar;
        userInfo.nickName = useToken.getUserInfo.nickName;
        userInfo.sex = useToken.getUserInfo.sex;
        userInfo.userId = useToken.getUserInfo.userId;
        console.log(userInfo);
        ElMessage.success("获取信息成功！");
      }
      return res;
    }
  );
};
const fectData = () => {
  if (localStorage.getItem("likebocai:userInfo") != null) {
    showLogin.value = false;
    userInfo.avatar = useToken.getUserInfo.avatar;
    userInfo.nickName = useToken.getUserInfo.nickName;
    userInfo.sex = useToken.getUserInfo.sex;
    userInfo.userId = useToken.getUserInfo.userId;
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
// 登录弹窗
import type { FormInstance, FormRules } from "element-plus";
const dialogVisible = ref(false);
// 定义加载中
const isLoading = ref(false);
// 登录表单验证
interface LoginRuleForm {
  userName: string;
  password: string;
}
const ruleFormRef = ref<FormInstance>();
const loginRuleForm = reactive<LoginRuleForm>({
  userName: "",
  password: "",
});
// 规则
const loginRules = reactive<FormRules<LoginRuleForm>>({
  userName: [
    { required: true, message: "不能为空", trigger: "blur" },
    { min: 5, max: 18, message: "长度在5-18位", trigger: "blur" },
  ],
  password: [
    { required: true, message: "不能为空", trigger: "blur" },
    { min: 5, max: 18, message: "长度在5-18位", trigger: "blur" },
  ],
});
// 响应
type ResponedType<T> = {
  code: number;
  message: string;
  data: T;
};
const login = async (formEl: FormInstance | undefined) => {
  isLoading.value = false;
  // 是否通过了表单验证
  const isValid = ref(false);
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      isValid.value = true;
    } else {
      ElMessage.error("看看啥东西没写对");
      console.log("error submit!", fields);
      isLoading.value = false;
    }
  });
  if (isValid.value) {
    await Login(loginRuleForm).then((res: ResponedType<string>) => {
      isLoading.value = true;
      if (res.code == 200) {
        useToken.saveToken(res.data);
        ElMessage.success("登陆成功!");
        // getuserInfo 改变头像
        getUserInfo();
        dialogVisible.value = false;
        location.reload();
        return res;
      } else {
        ElMessage.error(res.message);
        isLoading.value = false;
        return res;
      }
    });
  }
  isLoading.value = false;
};
// 注册表单验证
interface RegisterRuleForm {
  userName: string;
  nickName: string;
  password: string;
  checkPass: string;
  email: string;
  code: string;
}
const registerRuleForm = reactive<RegisterRuleForm>({
  userName: "",
  nickName: "",
  password: "",
  checkPass: "",
  email: "",
  code: "",
});
// 规则
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (registerRuleForm.checkPass !== "") {
      if (!registerRuleFormRef.value) return;
      registerRuleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== registerRuleForm.password) {
    callback(new Error("两次输入不匹配"));
  } else {
    callback();
  }
};
const registerRules = reactive<FormRules<RegisterRuleForm>>({
  userName: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur",
    },
    {
      min: 5,
      max: 18,
      message: "长度在5-18位",
      trigger: "blur",
    },
  ],
  nickName: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur",
    },
    {
      min: 5,
      max: 18,
      message: "长度在5-18位",
      trigger: "blur",
    },
  ],
  password: [
    { validator: validatePass, trigger: "blur" },
    {
      required: true,
      message: "不能为空",
      trigger: "blur",
    },
    { min: 5, max: 18, message: "长度在5-18位", trigger: "blur" },
  ],
  checkPass: [
    { validator: validatePass2, trigger: "blur" },
    {
      required: true,
      message: "不能为空",
      trigger: "blur",
    },
    { min: 5, max: 18, message: "长度在5-18位", trigger: "blur" },
  ],
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    // ^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com|gmail\.com)$ 必须是腾讯或谷歌
    // ^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com)$ 必须是腾讯
    {
      pattern:
        "^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com|gmail\.com|163\.com|aliyun\.com)$",
      message: "请正确输入邮箱",
      trigger: "blur",
    },
  ],
  code: [
    {
      required: true,
      len: 6,
      message: "验证码必须为6位数字",
      trigger: "blur",
    },
  ],
});
const registerRuleFormRef = ref<FormInstance>();
const register = async (formEl: FormInstance | undefined) => {
  isLoading.value = false;
  // 是否通过了表单验证
  const isValid = ref(false);
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      isValid.value = true;
    } else {
      ElMessage.error("看看啥东西没写对");
      console.log("error submit!", fields);
      isLoading.value = false;
    }
  });
  if (isValid.value) {
    await Register(registerRuleForm).then((res: ResponedType<string>) => {
      isLoading.value = true;
      if (res.code == 200) {
        ElMessage.success("注册成功!");
        activeName.value = "0";
        console.log(registerRuleForm);
        registerRuleForm.userName = "";
        registerRuleForm.nickName = "";
        registerRuleForm.password = "";
        registerRuleForm.checkPass = "";
        registerRuleForm.email = "";
        registerRuleForm.code = "";
        isGetRegisterCode.value = false;
        return res;
      }
      ElMessage.error(res.message);
      isLoading.value = false;
      return res;
    });
  }
  isLoading.value = false;
};
// 注册验证码
const isGetRegisterCode = ref(false);
const GetRegisterCode = async () => {
  await RegisterCode(registerRuleForm.email)
    .then((res: ResponedType<string>) => {
      if (res.code == 200) {
        ElMessage.success(res.message);
        isGetRegisterCode.value = true;
        return res;
      }
      ElMessage.error(res.message);
      return res;
    })
    .catch((err) => {
      ElMessage.error("网络异常~");
    });
};
// 忘记密码 forgot
// 注册表单验证
const isGetForgotCode = ref(false);
interface ForgotRuleForm {
  userName: string;
  password: string;
  checkPass: string;
  email: string;
  code: string;
}
const ForgotRuleForm = reactive<ForgotRuleForm>({
  userName: "",
  password: "",
  checkPass: "",
  email: "",
  code: "",
});
// 规则
const ForgotRuleFormRef = ref<FormInstance>();
const ForgotvalidatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (ForgotRuleForm.checkPass !== "") {
      if (!ForgotRuleFormRef.value) return;
      ForgotRuleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const ForgotvalidatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ForgotRuleForm.password) {
    callback(new Error("两次输入不匹配"));
  } else {
    callback();
  }
};
const ForgotRules = reactive<FormRules<ForgotRuleForm>>({
  userName: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur",
    },
    {
      min: 5,
      max: 18,
      message: "长度在5-18位",
      trigger: "blur",
    },
  ],
  password: [
    { validator: ForgotvalidatePass, trigger: "blur" },
    {
      required: true,
      message: "不能为空",
      trigger: "blur",
    },
    { min: 5, max: 18, message: "长度在5-18位", trigger: "blur" },
  ],
  checkPass: [
    { validator: ForgotvalidatePass2, trigger: "blur" },
    {
      required: true,
      message: "不能为空",
      trigger: "blur",
    },
    { min: 5, max: 18, message: "长度在5-18位", trigger: "blur" },
  ],
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    // ^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com|gmail\.com)$ 必须是腾讯或谷歌
    // ^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com)$ 必须是腾讯
    {
      pattern:
        "^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com|gmail\.com|163\.com|aliyun\.com)$",
      message: "请正确输入邮箱",
      trigger: "blur",
    },
  ],
  code: [
    {
      required: true,
      len: 6,
      message: "验证码必须为6位数字",
      trigger: "blur",
    },
  ],
});
const GetForgotCode = async () => {
  await ForgotEmailCode(ForgotRuleForm.email, ForgotRuleForm.userName)
    .then((res: ResponedType<string>) => {
      if (res.code == 200) {
        ElMessage.success(res.message);
        isGetForgotCode.value = true;
        return res;
      }
      ElMessage.error(res.message);
      return res;
    })
    .catch((err) => {
      ElMessage.error("网络异常~");
    });
};
// forgot
const forgot = async (formEl: FormInstance | undefined) => {
  isLoading.value = false;
  // 是否通过了表单验证
  const isValid = ref(false);
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      isValid.value = true;
    } else {
      ElMessage.error("看看啥东西没写对");
      console.log("error submit!", fields);
      isLoading.value = false;
    }
  });
  if (isValid.value) {
    await Forgot(ForgotRuleForm).then((res: ResponedType<string>) => {
      isLoading.value = true;
      if (res.code == 200) {
        ElMessage.success("修改成功!");
        activeName.value = "0";
        console.log(registerRuleForm);
        ForgotRuleForm.userName = "";
        ForgotRuleForm.password = "";
        ForgotRuleForm.checkPass = "";
        ForgotRuleForm.email = "";
        ForgotRuleForm.code = "";
        isGetForgotCode.value = false;
        return res;
      }
      ElMessage.error(res.message);
      isLoading.value = false;
      return res;
    });
  }
  isLoading.value = false;
};

// 个人中心
const updateUserINfo = reactive({
  avatar: userInfo.avatar,
  nickName: userInfo.nickName,
  sex: userInfo.sex,
  userId: userInfo.userId,
});
const userDialogVisible = ref(false);
// 头像上传的
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  // console.log(URL.createObjectURL(uploadFile.raw!));
  // userInfo.avatar = URL.createObjectURL(uploadFile.raw!);
  if (response) {
    if (response.code == 200) {
      userInfo.avatar = response.data;
    } else {
      ElMessage.error("网络出错!");
    }
  }
  console.log(userInfo.avatar);
  console.log(response);
};
const beforeAvatarUpload = (rawFile) => {
  if (!rawFile.type.includes("image")) {
    ElMessage.error("请上传文件格式为图片!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 1) {
    ElMessage.error("抱歉图片大小不能超过1M");
    return false;
  }
  return true;
};
const updateUserinfo = async () => {
  await UpdateUserInfo(userInfo).then((res: ResponedType<string>) => {
    if (res.code == 200) {
      userInfo.nickName = updateUserINfo.nickName;
      userInfo.avatar = updateUserINfo.avatar;
      userInfo.sex = updateUserINfo.sex;
      ElMessage.success("成功!");
      userDialogVisible.value = false;
      return;
    }
    ElMessage.error(res.message);
  });
};
const userDialogVisibleButton = () => {
  updateUserINfo.nickName = userInfo.nickName;
  updateUserINfo.avatar = userInfo.avatar;
  updateUserINfo.sex = userInfo.sex;
  userDialogVisible.value = true;
};
</script>

<template>
  <div class="myHeader">
    <nav class="myHeader-nav">
      <div class="myHeader-nav-letf">
        <h1 class="myHeader-nav-letf-logo">
          <a href="https://www.likebocai.com" title="菠菜的小窝">
            <img
              src="https://cdn.likebocai.com/bcblog/public/src/tou.png"
              alt="菠菜的小窝,BoCai's Kennel网站log"
              title="菠菜的小窝"
              width="60px"
              height="60px"
            />
            菠菜的小窝
          </a>
        </h1>
        <h1 class="myHeader-nav-letf-title">
          <a href="https://www.likebocai.com" title="菠菜的小窝">
            菠菜的小窝
          </a>
        </h1>
      </div>
      <div class="myHeader-nav-right">
        <ul class="myHeader-nav-right-menu">
          <li class="myHeader-nav-right-menu-ul-li">
            <div class="myHeader-nav-right-menu-img">
              <img
                src="https://cdn.likebocai.com/bcblog/assets/icon/search.png"
                width="32px"
              />
            </div>
            <div class="myHeader-nav-right-menu-title">
              <h2>搜索</h2>
            </div>
          </li>
          <li class="myHeader-nav-right-menu-ul-li">
            <a class="myHeader-nav-right-menu-ul-li-a" href="/" title="首页">
              <div class="myHeader-nav-right-menu-img">
                <img
                  src="https://cdn.likebocai.com/bcblog/assets/icon/home.png"
                  width="34px"
                />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>首页</h2>
              </div>
            </a>
          </li>
          <li class="myHeader-nav-right-menu-ul-li">
            <a class="myHeader-nav-right-menu-ul-li-a" title="文章分类">
              <div class="myHeader-nav-right-menu-img">
                <img
                  src="https://cdn.likebocai.com/bcblog/assets/icon/category.png"
                  width="32px"
                />
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
                <img
                  src="https://cdn.likebocai.com/bcblog/assets/icon/friends.png"
                  width="32px"
                />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>友情链接</h2>
              </div>
            </a>
          </li>
          <li class="myHeader-nav-right-menu-ul-li">
            <a
              class="myHeader-nav-right-menu-ul-li-a"
              href="/rss.xml"
              target="_blank"
              title="菠菜的小窝-RSS"
            >
              <div class="myHeader-nav-right-menu-img">
                <img
                  src="https://cdn.likebocai.com/bcblog/assets/icon/RSS.png"
                  title="菠菜的小窝-RSS"
                  width="30px"
                />
              </div>
              <div class="myHeader-nav-right-menu-title">
                <h2>RSS</h2>
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
              href="#"
              title="登录"
              @click="dialogVisible = true"
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
              <li @click="userDialogVisibleButton">个人中心</li>
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
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane :lazy="true" label="注册" name="1">
            <div class="mycenter">
              <el-form
                label-position="right"
                label-width="100px"
                ref="registerRuleFormRef"
                :model="registerRuleForm"
                :rules="registerRules"
                :loading="isLoading"
                @keydown.enter="register(registerRuleFormRef)"
                style="max-width: 400px"
              >
                <el-form-item label="用户名:" prop="userName">
                  <el-input
                    v-model="registerRuleForm.userName"
                    :prefix-icon="User"
                    clearable
                    :maxlength="18"
                    placeholder="用户名: 用作登录"
                  />
                </el-form-item>
                <el-form-item label="昵称:" prop="nickName">
                  <el-input
                    v-model="registerRuleForm.nickName"
                    :prefix-icon="Orange"
                    clearable
                    :maxlength="18"
                    placeholder="用户名: 别人知道你叫什么"
                  />
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                  <el-input
                    v-model="registerRuleForm.password"
                    :prefix-icon="Lock"
                    show-password
                    :maxlength="18"
                    placeholder="请输入密码"
                  />
                </el-form-item>
                <el-form-item label="确认密码:" prop="checkPass">
                  <el-input
                    v-model="registerRuleForm.checkPass"
                    :prefix-icon="Lock"
                    show-password
                    :maxlength="18"
                    placeholder="请再次输入密码"
                  />
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                  <el-input
                    v-model="registerRuleForm.email"
                    :prefix-icon="Message"
                    placeholder="请输入邮箱"
                  >
                    <template #append>
                      <el-button
                        :disabled="isGetRegisterCode"
                        @click="GetRegisterCode"
                        >{{ !isGetRegisterCode ? "获取" : "已发送" }}</el-button
                      >
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="验证码:" prop="code">
                  <el-input
                    v-model="registerRuleForm.code"
                    :prefix-icon="Key"
                    clearable
                    :maxlength="6"
                    placeholder="验证码，5分钟有效！"
                  />
                </el-form-item>
                <div style="height: 42px" class="mycenter">
                  <el-button
                    type="primary"
                    class="loginButton"
                    @click="register(registerRuleFormRef)"
                    :disabled="isLoading"
                    >加入小窝</el-button
                  >
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="登录" name="0">
            <div class="mycenter">
              <el-form
                label-position="right"
                label-width="80px"
                ref="ruleFormRef"
                :model="loginRuleForm"
                :rules="loginRules"
                :loading="isLoading"
                @keydown.enter="login(ruleFormRef)"
                style="max-width: 300px"
              >
                <el-form-item label="用户名:" prop="userName">
                  <el-input
                    v-model="loginRuleForm.userName"
                    :prefix-icon="User"
                    clearable
                    :maxlength="18"
                    placeholder="用户名/邮箱"
                  />
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                  <el-input
                    v-model="loginRuleForm.password"
                    :prefix-icon="Lock"
                    show-password
                    :maxlength="18"
                    placeholder="请输入密码"
                  />
                </el-form-item>
                <div style="height: 42px" class="mycenter">
                  <el-button
                    type="primary"
                    class="loginButton"
                    @click="login(ruleFormRef)"
                    :disabled="isLoading"
                    >登录</el-button
                  >
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane :lazy="true" label="忘记密码" name="2">
            <div class="mycenter">
              <el-form
                label-position="right"
                label-width="100px"
                ref="ForgotRuleFormRef"
                :model="ForgotRuleForm"
                :rules="ForgotRules"
                :loading="isLoading"
                @keydown.enter="forgot(ForgotRuleFormRef)"
                style="max-width: 400px"
              >
                <el-form-item label="用户名:" prop="userName">
                  <el-input
                    v-model="ForgotRuleForm.userName"
                    :prefix-icon="User"
                    clearable
                    :maxlength="18"
                    placeholder="用户名: 用作登录"
                  />
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                  <el-input
                    v-model="ForgotRuleForm.password"
                    :prefix-icon="Lock"
                    show-password
                    :maxlength="18"
                    placeholder="请输入密码"
                  />
                </el-form-item>
                <el-form-item label="确认密码:" prop="checkPass">
                  <el-input
                    v-model="ForgotRuleForm.checkPass"
                    :prefix-icon="Lock"
                    show-password
                    :maxlength="18"
                    placeholder="请再次输入密码"
                  />
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                  <el-input
                    v-model="ForgotRuleForm.email"
                    :prefix-icon="Message"
                    placeholder="请输入邮箱"
                  >
                    <template #append>
                      <el-button
                        :disabled="isGetForgotCode"
                        @click="GetForgotCode"
                        >{{ !isGetForgotCode ? "获取" : "已发送" }}</el-button
                      >
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="验证码:" prop="code">
                  <el-input
                    v-model="ForgotRuleForm.code"
                    :prefix-icon="Key"
                    clearable
                    :maxlength="6"
                    placeholder="验证码，5分钟有效！"
                  />
                </el-form-item>
                <div style="height: 42px" class="mycenter">
                  <el-button
                    type="primary"
                    class="loginButton"
                    @click="forgot(ForgotRuleFormRef)"
                    :disabled="isLoading"
                    >加入小窝</el-button
                  >
                </div>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template> -->
    </el-dialog>
  </ClientOnly>
  <ClientOnly>
    <el-dialog
      v-model="userDialogVisible"
      title="个人中心"
      width="600"
      draggable
    >
      <div class="commonCenter">
        <el-upload
          ref="uploadavatar"
          class="upload-demo"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="{
            Authorization: `Bearer ${useToken.getToken.token}`,
            114514: useToken.getUserInfo.userId,
          }"
          action="https://www.likebocai.com/api/user/auth/userLoadAvatar"
        >
          <template #trigger>
            <el-avatar :size="120" :src="updateUserINfo.avatar" @error="true">
              <img
                src="https://cdn.likebocai.com/bcblog/public/src/avatar-2.jpg"
              />
            </el-avatar>
          </template>
          <template #tip>
            <div class="commonCenter userinfo-avater">
              <h2>(点击头像以更换)</h2>
            </div>
          </template>
        </el-upload>
      </div>
      <!-- <div class="commonCenter userinfo-avater">
        <h2>(点击头像以更换)</h2>
      </div> -->
      <div class="mycenter">
        <el-form
          label-position="right"
          label-width="80px"
          :model="loginRuleForm"
          :loading="isLoading"
          style="max-width: 300px"
        >
          <el-form-item label="昵称:">
            <el-input
              v-model="updateUserINfo.nickName"
              :prefix-icon="Orange"
              clearable
              :maxlength="18"
              :placeholder="userInfo.nickName"
            />
          </el-form-item>
          <el-form-item label="可选性别:" prop="password">
            <el-radio-group v-model="updateUserINfo.sex">
              <el-radio :label="'0'">男</el-radio>
              <el-radio :label="'1'">女</el-radio>
              <el-radio :label="'2'">沃尔玛购物袋</el-radio>
              <el-radio :label="'3'">阿帕奇武装直升机</el-radio>
              <el-radio :label="'4'">这里没有我的性别</el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="height: 42px" class="mycenter">
            <el-popconfirm
              width="220"
              confirm-button-text="那当然!"
              cancel-button-text="No!"
              title="确定要修改个人信息吗?"
              @confirm="updateUserinfo"
            >
              <template #reference>
                <el-button
                  type="primary"
                  class="loginButton"
                  :disabled="isLoading"
                >
                  确认修改
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </el-form>
      </div>
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
  --el-input-border-radius: 10px;
}
.el-form-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-dialog {
  --el-dialog-border-radius: 10px;
}
.el-form-item__error {
  margin-left: 15px;
}
.el-form {
  margin-right: 80px;
}
</style>
<style lang="scss" scoped>
.mycenter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 5px;
}
.commonCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginButton {
  height: 40px;
  width: 150px;
  border-radius: 10px;
  margin-left: 80px;
}
.userinfo-avater {
  height: 30px;
  color: rgba($color: #000000, $alpha: 0.5);
  h2 {
    font-size: 14px;
  }
}
</style>
