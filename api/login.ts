import { useFetch } from "nuxt/app";
import { useMyFetch } from "~/composables/useMyFetch";
type formData = {
  userName: string;
  password: string;
};
const Login = (data: formData) => {
  return $fetch("http://localhost:16280/blog/user/login", {
    method: "post",
    body: data,
  });
};

export { Login };
