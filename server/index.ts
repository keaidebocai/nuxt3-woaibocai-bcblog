import { UseFetchOptions, useFetch, useRequestHeaders } from "nuxt/app";

type Methods = "GET" | "POST" | "DELETE" | "PUT";

const BASE_URL = "http://localhost:16289";
import { useRouter } from "vue-router";
// const router = useRouter()

import { useTokenStore } from "~/store/useToken";

const headers = useRequestHeaders(["authorization"]);
export interface MyResultData<T> {
  code: number;
  message: string;
  data: T;
}

class HttpRequest {
  // 先封装 不加token的公共方法
  requestPublic<T>(
    isToken: boolean,
    url: string,
    method: Methods,
    data: any,
    options?: UseFetchOptions<T>
  ) {
    return new Promise((resolve, reject) => {
      const newOptions: UseFetchOptions<T> = {
        baseURL: "http://localhost:16289",
        method: method,
        lazy: true,
        headers: {},
        onResponse({ response }) {
          console.log(response._data);
          if (response.status === 200) {
            return response;
          }
          const useToken = useTokenStore();
          // 刷新token
          if (response._data.code === 401 || response.status === 401) {
            useFetch(
              "http://localhost:16289/admin/api/manager/authorizations",
              {
                method: "post",
                body: useToken.getToken.refresh_token,
                onResponse({ response }) {
                  if (response._data.code === 208) {
                    // router.push('/login')
                    console.log("你需要重新登录");
                  }
                  if (response._data.code === 200) {
                    useToken.saveToken(response._data.data);
                    console.log(response._data.data);
                    return response;
                  }
                },
              }
            );
          }
        },
        // 剩下的就复制默认的
        ...options,
      };

      if (method === "GET" || method === "DELETE") {
        newOptions.params = data;
      }

      if (method === "POST" || method === "PUT") {
        newOptions.body = data;
      }

      if (isToken === true) {
        newOptions.headers = headers;
      }

      useFetch(url, newOptions)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  get<T>(
    isToken: boolean,
    url: string,
    params?: any,
    options?: UseFetchOptions<T>
  ) {
    return this.requestPublic(isToken, url, "GET", params, options);
  }

  post<T>(
    isToken: boolean,
    url: string,
    params?: any,
    options?: UseFetchOptions<T>
  ) {
    return this.requestPublic(isToken, url, "POST", params, options);
  }

  put<T>(
    isToken: boolean,
    url: string,
    params?: any,
    options?: UseFetchOptions<T>
  ) {
    return this.requestPublic(isToken, url, "PUT", params, options);
  }

  delete<T>(
    isToken: boolean,
    url: string,
    params?: any,
    options?: UseFetchOptions<T>
  ) {
    return this.requestPublic(isToken, url, "DELETE", params, options);
  }
}
const httpRequest = new HttpRequest();
export default httpRequest;
