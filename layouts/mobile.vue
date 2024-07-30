<script setup lang="ts">
// 菜单图标显示的控制
const showIcon = ref(false);
const showSearch = ref(false);
const searchData = ref("");
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
import { User, Lock, Message, Key, Orange, CircleClose } from "@element-plus/icons-vue";
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
onMounted(() => {
  fectData()
})
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
        "^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com|163\.com|aliyun\.com)$",
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
        "^[a-zA-Z0-9._%+-]+@(qq\.com|foxmail\.com|163\.com|aliyun\.com)$",
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
  updateUserINfo.userId = userInfo.userId
  updateUserINfo.sex = String(updateUserINfo.sex)
  await UpdateUserInfo(updateUserINfo).then((res: ResponedType<string>) => {
    if (res.code == 200) {
      userInfo.nickName = updateUserINfo.nickName;
      userInfo.avatar = updateUserINfo.avatar;
      userInfo.sex = updateUserINfo.sex;
      ElMessage.success("个人信息成功!");
      userDialogVisible.value = false;
      logout()
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
  <div>
    <div class="affix-container">
      <el-affix target=".affix-container">
        <div class="mobile-menu">
          <div class="mobile-menu-left" @click="showIcon = !showIcon">
            <ElIconFold v-show="!showIcon" style="width: 6vw" />
            <ElIconExpand v-show="showIcon" style="width: 6vw" />
          </div>
          <div class="mobile-menu-title">
            <h1><a href="/">菠菜的小窝</a></h1>
          </div>
          <!-- <div class="mobile-menu-right" @click="showSearch = !showSearch">
            <ElIconSearch style="width: 6vw" />
          </div> -->
          <!-- dialogVisible -->
          <div class="mobile-menu-right">
            <h5 v-show="showLogin" style="width: 60px;font-size: 1.4rem;" @click="dialogVisible = !dialogVisible">
              登录
            </h5>
            <!-- <div v-show="!showLogin" class="myHeader-nav-right-loginInfo">
              <div class="imgStyle">
                <img src="https://cdn.likebocai.com/bcblog/public/src/avatar-1.jpg" width="32px" />
              </div>
              <div style="display: none;">
                <h2>Hi! {{ userInfo.nickName }}</h2>
                <ul>
                  <li @click="userDialogVisibleButton">个人中心</li>
                  <li @click="logout">退出登录</li>
                </ul>
              </div>
            </div> -->

            <el-dropdown trigger="click" v-show="!showLogin">
              <el-avatar :size="45" style="margin-right: 10px;" :src="updateUserINfo.avatar" @error="true">
                <img src="https://cdn.likebocai.com/bcblog/public/src/avatar-2.jpg" />
              </el-avatar>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :icon="User" @click="userDialogVisibleButton">
                    个人中心
                  </el-dropdown-item>
                  <el-dropdown-item :icon="CircleClose" @click="logout">
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-affix>
      <ClientOnly>
        <el-drawer size="80%" direction="ltr" v-model="showIcon" :lock-scroll="false" :with-header="false">
          <AppMainRightBlogInfo />
        </el-drawer>
        <el-drawer class="searchDrawer" size="20%" direction="ttb" v-model="showSearch" :lock-scroll="false"
          :with-header="false">
          <div class="searchDrawer-inputDiv">
            <el-input v-model="searchData" placeholder="搜索点什么..." type="text" size="large" :prefix-icon="ElIconSearch"
              :suffix-icon="ElIconRight" />
          </div>
        </el-drawer>
      </ClientOnly>
      <slot />
    </div>
  </div>
  <el-backtop :right="40" :bottom="40" :visibility-height="500" />
  <ClientOnly>
    <el-dialog v-model="dialogVisible" title="登陆注册" width="340" draggable>
      <div>
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane :lazy="true" label="注册" name="1">
            <div class="mycenter">
              <el-form label-position="right" label-width="120px" ref="registerRuleFormRef" :model="registerRuleForm"
                :rules="registerRules" :loading="isLoading" @keydown.enter="register(registerRuleFormRef)"
                style="max-width: 300px">
                <el-form-item label="用户名:" prop="userName">
                  <el-input v-model="registerRuleForm.userName" :prefix-icon="User" clearable :maxlength="18"
                    placeholder="用户名: 用作登录" />
                </el-form-item>
                <el-form-item label="昵称:" prop="nickName">
                  <el-input v-model="registerRuleForm.nickName" :prefix-icon="Orange" clearable :maxlength="18"
                    placeholder="用户名: 别人知道你叫什么" />
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                  <el-input v-model="registerRuleForm.password" :prefix-icon="Lock" show-password :maxlength="18"
                    placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="确认密码:" prop="checkPass">
                  <el-input v-model="registerRuleForm.checkPass" :prefix-icon="Lock" show-password :maxlength="18"
                    placeholder="请再次输入密码" />
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                  <el-input v-model="registerRuleForm.email" :prefix-icon="Message" placeholder="请输入邮箱">
                    <template #append>
                      <el-button
                        :disabled="isGetRegisterCode || registerRuleForm.email == '' || !registerRuleForm.email.match('@')"
                        @click="GetRegisterCode">{{ !isGetRegisterCode ? "获取" :
                          "已发送" }}</el-button>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="验证码:" prop="code">
                  <el-input v-model="registerRuleForm.code" :prefix-icon="Key" clearable :maxlength="6"
                    placeholder="验证码，5分钟有效！" />
                </el-form-item>
                <div style="height: 42px" class="mycenter">
                  <el-button type="primary" class="loginButton" @click="register(registerRuleFormRef)"
                    :disabled="isLoading">加入小窝</el-button>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="登录" name="0">
            <div class="mycenter">
              <el-form label-position="right" label-width="120px" ref="ruleFormRef" :model="loginRuleForm"
                :rules="loginRules" :loading="isLoading" @keydown.enter="login(ruleFormRef)" style="max-width: 300px">
                <el-form-item label="用户名:" prop="userName">
                  <el-input v-model="loginRuleForm.userName" :prefix-icon="User" clearable :maxlength="18"
                    placeholder="用户名/邮箱" />
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                  <el-input v-model="loginRuleForm.password" :prefix-icon="Lock" show-password :maxlength="18"
                    placeholder="请输入密码" />
                </el-form-item>
                <div style="height: 42px" class="mycenter">
                  <el-button type="primary" class="loginButton" @click="login(ruleFormRef)"
                    :disabled="isLoading">登录</el-button>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane :lazy="true" label="忘记密码" name="2">
            <div class="mycenter">
              <el-form label-position="right" label-width="120px" ref="ForgotRuleFormRef" :model="ForgotRuleForm"
                :rules="ForgotRules" :loading="isLoading" @keydown.enter="forgot(ForgotRuleFormRef)"
                style="max-width: 400px">
                <el-form-item label="用户名:" prop="userName">
                  <el-input v-model="ForgotRuleForm.userName" :prefix-icon="User" clearable :maxlength="18"
                    placeholder="用户名: 用作登录" />
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                  <el-input v-model="ForgotRuleForm.password" :prefix-icon="Lock" show-password :maxlength="18"
                    placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="确认密码:" prop="checkPass">
                  <el-input v-model="ForgotRuleForm.checkPass" :prefix-icon="Lock" show-password :maxlength="18"
                    placeholder="请再次输入密码" />
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                  <el-input v-model="ForgotRuleForm.email" :prefix-icon="Message" placeholder="请输入邮箱">
                    <template #append>
                      <el-button :disabled="isGetForgotCode || ForgotRuleForm.userName == ''" @click="GetForgotCode">{{
                        !isGetForgotCode ? "获取" : "已发送"
                      }}</el-button>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="验证码:" prop="code">
                  <el-input v-model="ForgotRuleForm.code" :prefix-icon="Key" clearable :maxlength="6"
                    placeholder="验证码，5分钟有效！" />
                </el-form-item>
                <div style="height: 42px" class="mycenter">
                  <el-button type="primary" class="loginButton" @click="forgot(ForgotRuleFormRef)"
                    :disabled="isLoading">回到小窝</el-button>
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
    <el-dialog v-model="userDialogVisible" title="个人中心" width="340" draggable>
      <div class="commonCenter">
        <el-upload ref="uploadavatar" class="upload-demo" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload" :headers="{
            Authorization: `Bearer ${useToken.getToken.token}`,
            114514: useToken.getUserInfo.userId,
          }" action="https://www.likebocai.com/api/user/auth/userLoadAvatar">
          <template #trigger>
            <el-avatar :size="120" :src="updateUserINfo.avatar" @error="true">
              <img src="https://cdn.likebocai.com/bcblog/public/src/avatar-2.jpg" />
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
        <el-form label-position="right" label-width="120px" :model="loginRuleForm" :loading="isLoading"
          style="max-width: 300px">
          <el-form-item label="昵称:">
            <el-input v-model="updateUserINfo.nickName" :prefix-icon="Orange" clearable :maxlength="18"
              :placeholder="userInfo.nickName" />
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
            <el-popconfirm width="220" confirm-button-text="那当然!" cancel-button-text="No!" title="确定要修改个人信息吗?修改成功会退出登录！！！"
              @confirm="updateUserinfo">
              <template #reference>
                <el-button type="primary" class="loginButton" :disabled="isLoading">
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
body {
  /* background-image: url(https://picx.zhimg.com/80/v2-c472b1d9064f724efe138ebcdc317a18_720w.webp?source=1def8aca); */
  background-image: url(https://cdn.likebocai.com/letter/statis/index-letter-img02.jpg);
}

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
  font-size: 0.8rem;
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
  width: 300px;
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

.affix-container {
  height: 100vh;
}

.mobile-menu {
  display: flex;
  background-color: rgba(255, 255, 255, 0.3);
  color: rgba($color: #000000, $alpha: 0.6);
  margin-bottom: 10px;

  .mobile-menu-left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15vw;
    height: 8vh;
  }

  .mobile-menu-title {
    height: 8vh;
    width: 70vw;
    font-size: 3vh;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      a {
        font-size: 3vh;
        color: rgba($color: #000000, $alpha: 0.6);
        text-decoration: none;
      }
    }
  }

  .mobile-menu-right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 8vh;
    width: 15vw;
  }
}

:deep(.el-input--large) {
  font-size: 1rem;
}

:deep(.el-drawer__body) {
  flex: 1;
  padding: 10px;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.searchDrawer {
  display: flex;
  align-items: center;
  justify-content: center;

  .searchDrawer-inputDiv {
    height: 10vh;
    width: 80vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

* {
  --el-bg-color: rgba(255, 255, 255, 0.6);
  --el-input-height: 3rem;
  --el-input-border-radius: 1.5rem;

  .appRightMyInfo {
    background-color: transparent;
  }
}
</style>
