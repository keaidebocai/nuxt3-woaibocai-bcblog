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
        tokenJson.value ||
          window.localStorage.getItem("likebocai:userInfo") ||
          "{}"
      );
    } catch (err) {
      ElMessage.error("Json字符串格式化错误,转化对象失败!");
      window.localStorage.setItem("likebocai:userInfo", "");
      throw err;
    }
  });
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
  // 导出
  return {
    getToken,
    getUserInfo,
    saveToken,
    saveUserInfo,
    removeToken,
    removeUserInfo,
  };
});
