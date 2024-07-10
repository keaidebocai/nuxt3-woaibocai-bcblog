import { defineStore } from "pinia";
// ts类型提示
interface Token {
  token: string;
  refresh_token: string;
}
interface UserInfo {
  nickName: string;
  avatar: string;
  sex: string;
  userId: string;
}
export const useTokenStore = defineStore("useToken", () => {
  // //ref 相当于state
  const tokenJson = ref("");
  const userInfoJson = ref("");
  const emailTextJson = ref("");
  const isShow = ref(false)
  const getToken = computed<Token>(() => {
    try {
      return JSON.parse(
        tokenJson.value || window.localStorage.getItem("TokenInfo") || "{}"
      );
    } catch (err) {
      ElMessage.error("Json字符串格式化错误,转化对象失败!");
      window.localStorage.setItem("TokenInfo", "");
      throw err;
    }
  });
  const getUserInfo = computed<UserInfo>(() => {
    try {
      return JSON.parse(
        userInfoJson.value ||
          window.localStorage.getItem("likebocai:userInfo") ||
          "{}"
      );
    } catch (err) {
      ElMessage.error("Json字符串格式化错误,转化对象失败!");
      window.localStorage.setItem("likebocai:userInfo", "");
      throw err;
    }
  });
  // getEmailText
  const getEmailText = computed<string>(() => {
    try {
      return emailTextJson.value || window.localStorage.getItem("likebocai:email:text") || ""
    } catch (err) {
      ElMessage.error("读取本地文件出现错误，请清除浏览器缓存！");
      window.localStorage.setItem("likebocai:email:text", "");
      throw err;
    }
  })

  // getIsShow
  const getIsShow = computed<string>(() => {
    try {
      return window.localStorage.getItem("likebocai:isShow")  || 'true'
    } catch (err) {
      ElMessage.error("读取本地文件出现错误，请清除浏览器缓存！");
      window.localStorage.setItem("likebocai:isShow", "true");
      throw err;
    }
  })

  //funtion 相当于actions
  function saveToken(data: string) {
    tokenJson.value = data;
    window.localStorage.setItem("TokenInfo", data);
  }
  function saveUserInfo(data: string) {
    userInfoJson.value = data;
    window.localStorage.setItem("likebocai:userInfo", data);
  }
  function removeToken() {
    // window.localStorage.setItem("TokenInfo", "");
    window.localStorage.removeItem("TokenInfo");
  }
  function removeUserInfo() {
    // window.localStorage.setItem("likebocai:userInfo", "");
    window.localStorage.removeItem("likebocai:userInfo");
  }

  // 保存文章到本地
  function saveEmailText(data: string) {
    emailTextJson.value = data
    window.localStorage.setItem("likebocai:email:text",data);
  }
  // 删除本地邮件
  function removeEmailText() {
    window.localStorage.removeItem("likebocai:email:text")
  }

  // close通知字段
  function closeIsShow(){
    isShow.value = false
    window.localStorage.setItem("likebocai:isShow",'false');
  }

  // 导出
  return {
    getToken,
    getUserInfo,
    getEmailText,
    getIsShow,
    saveToken,
    saveUserInfo,
    saveEmailText,
    closeIsShow,
    removeToken,
    removeUserInfo,
    removeEmailText
  };
});
