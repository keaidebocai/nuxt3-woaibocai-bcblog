import { useFetch } from "nuxt/app";
// import { useMyFetch } from "~/composables/useMyFetch";
const URL = "/api/user/";
type formData = {
  userName: string;
  password: string;
};

const Login = (data: formData) => {
  return $fetch("http://localhost:16280/api/user/login", {
    method: "post",
    body: data,
  });
};
//登出
type Token = {
  token: string;
  refresh_token: string;
};
const Logout = (data: Token) => {
  return useFetch(URL + "logout", {
    method: "post",
    body: data,
  });
};
//注册 register
type RegisterData = {
  userName: string;
  password: string;
  email: string;
};
const Register = (data: RegisterData) => {
  console.log(data);
  return useMyOtherFetch(URL + "register", {
    method: "post",
    body: data,
  });
};

export { Login, Logout, Register };
