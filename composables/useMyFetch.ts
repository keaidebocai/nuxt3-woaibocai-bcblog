import { useTokenStore } from "~/store/useToken";
const URl = "http://127.0.0.1:16280";
export const useMyFetch = (url, opt) => {
  const store = useTokenStore();
  const router = useRouter();
  let headers = {
    ...opt.headers,
  };
  if (store.getToken.token) {
    Object.assign(headers, {
      Authorization: "Bearer " + store.getToken.token,
    });
  }
  // ssr服务器向api服务器传递客户端真实ip
  if (process.server) {
    Object.assign(
      headers,
      useRequestHeaders(["x-forwarded-for", "x-real-ip", "user-agent"])
    );
  }

  opt.headers = headers;
  return useFetch(url, {
    ...opt,
    baseURL: URl, // 你的接口地址
    async onResponse({ request, response, options }) {
      return response;
    },
    async onResponseError({ request, response, options }) {
      const retoken = ref({
        refresh_token: store.getToken.refresh_token,
      });
      if (response.status == 401) {
        useFetch(URl + "/api/user/authorizations", {
          method: "post",
          // 已知问题是后台无法接受数据 解决

          // body: `refresh_token=${store.getToken.refresh_token}`,
          body: retoken,
          onResponse({ response }) {
            console.log(response._data.code);
            if (response._data.code === 208) {
              //   router.push("/login");
              ElMessageBox.confirm("您的身份已经过期...", "菠菜最后的轻语~", {
                confirmButtonText: "去登录",
                cancelButtonText: "返回首页",
                type: "warning",
              })
                .then(() => {
                  ElMessage({
                    type: "success",
                    message: "请刷新页面 / Ctrl + R",
                  });
                  router.push("login");
                  return;
                })
                .catch(() => {
                  ElMessage({
                    type: "success",
                    message: "回到小窝喽",
                  });
                  router.push("/");
                });
              console.log("你需要重新登录");
            }
            if (response._data.code === 200) {
              store.saveToken(response._data.data);
              console.log(response._data.data);
              return response;
            }
          },
        });
      }
      console.log("[fetch response error]");
    },

    async onRequest({ request, options }) {
      console.log("[fetch request]");
    },
    async onRequestError({ request, options, error }) {
      console.log("[fetch request error]", error);
    },
  });
};

export const useMyOtherFetch = (url, opt) => {
  const store = useTokenStore();
  const router = useRouter();
  let headers = {
    ...opt.headers,
  };
  if (store.getToken.token) {
    Object.assign(headers, {
      Authorization: "Bearer " + store.getToken.token,
    });
  }
  // ssr服务器向api服务器传递客户端真实ip
  if (process.server) {
    Object.assign(
      headers,
      useRequestHeaders(["x-forwarded-for", "x-real-ip", "user-agent"])
    );
  }

  opt.headers = headers;
  return $fetch(url, {
    ...opt,
    baseURL: URl, // 你的接口地址
    async onResponse({ request, response, options }) {
      // console.log(response._data);
      // return response;
      const retoken = ref({
        refresh_token: store.getToken.refresh_token,
      });
      if (response._data.code == 401) {
        useFetch(URl + "/api/user/authorizations", {
          method: "post",
          // 已知问题是后台无法接受数据 解决

          // body: `refresh_token=${store.getToken.refresh_token}`,
          body: retoken,
          onResponse({ response }) {
            if (response._data.code === 208) {
              //   router.push("/login");
              ElMessageBox.confirm("您的身份已经过期...", "菠菜最后的轻语~", {
                confirmButtonText: "去登录",
                cancelButtonText: "返回首页",
                type: "warning",
              })
                .then(() => {
                  ElMessage({
                    type: "success",
                    message: "快快加入我们！",
                  });
                  router.push("login");
                  return;
                })
                .catch(() => {
                  ElMessage({
                    type: "success",
                    message: "回到小窝喽",
                  });
                  router.push("/");
                });
              console.log("你需要重新登录");
            }
            if (response._data.code === 200) {
              store.saveToken(response._data.data);
              return response;
            }
          },
        });
      }
    },
    async onResponseError({ request, response, options }) {
      const retoken = ref({
        refresh_token: store.getToken.refresh_token,
      });
      console.log("--------------" + response);
      if (response.status == 401) {
        useFetch(URl + "/api/user/authorizations", {
          method: "post",
          // 已知问题是后台无法接受数据 解决

          // body: `refresh_token=${store.getToken.refresh_token}`,
          body: retoken,
          onResponse({ response }) {
            if (response._data.code === 208) {
              //   router.push("/login");
              ElMessageBox.confirm("您的身份已经过期...", "菠菜最后的轻语~", {
                confirmButtonText: "去登录",
                cancelButtonText: "返回首页",
                type: "warning",
              })
                .then(() => {
                  ElMessage({
                    type: "success",
                    message: "快快加入我们！",
                  });
                  router.push("login");
                  return;
                })
                .catch(() => {
                  ElMessage({
                    type: "success",
                    message: "回到小窝喽",
                  });
                  router.push("/");
                });
              console.log("你需要重新登录");
            }
            if (response._data.code === 200) {
              store.saveToken(response._data.data);
              return response;
            }
          },
        });
      }
      console.log("[fetch response error]");
    },

    async onRequest({ request, options }) {
      console.log("[fetch request]");
    },
    async onRequestError({ request, options, error }) {
      console.log("[fetch request error]", error);
    },
  });
};

// 不要乱删这里的东西
export const userInfoFetch = (opt) => {
  return useMyFetch("/api/user/auth/getUserInfo", opt);
};
export const useGetUserInfo = (opt) => {
  return useMyOtherFetch("/api/user/auth/getUserInfo", opt);
};
export const userNameFetch = (opt) => {
  return useMyFetch("/user/name", opt);
};
//  更多接口....
