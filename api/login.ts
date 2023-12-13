import { useFetch } from "nuxt/app";

type formData = {
  userName: string;
  password: string;
};
const Login = (data: formData) => {
  return useFetch("http://localhost:16280/blog/user/login", {
    method: "post",
    body: data,
  });
};
export { Login };
