import { useFetch } from "nuxt/app";
// import { useMyFetch } from "~/composables/useMyFetch";
const URL = "https://www.likebocai.com/api/user";
type formData = {
  userName: string;
  password: string;
};
type ResponedType<T> = {
  code: number;
  message: string;
  data: T;
};
const Login = (data: formData) => {
  return $fetch<ResponedType<string>>(URL + "/login", {
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
  return useFetch(URL + "/logout", {
    method: "post",
    body: data,
  });
};
//注册 register
type RegisterData = {
  userName: string;
  password: string;
  nickName: string;
  email: string;
  code: string;
};
const Register = (data: RegisterData) => {
  return useMyOtherFetch(URL + "/register", {
    method: "post",
    body: data,
  });
};
const RegisterCode = (email: string) => {
  return useMyOtherFetch(URL + `/registerEmail/${email}`, {
    method: "get",
  });
};
type ForgotData = {
  userName: string;
  password: string;
  email: string;
  code: string;
};
const Forgot = (data: ForgotData) => {
  return useMyOtherFetch(URL + "/forgot", {
    method: "post",
    body: data,
  });
};
// forgotEmail/{email}
const ForgotEmailCode = (email: string, userName: string) => {
  return useMyOtherFetch(URL + `/forgotEmail/${email}/${userName}`, {
    method: "get",
  });
};
export { Login, Logout, Register, RegisterCode, Forgot, ForgotEmailCode };
