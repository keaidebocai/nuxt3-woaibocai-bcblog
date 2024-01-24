const MY_URL = "/api/blog/link/";
// 所有分类
type ResponedType<T> = {
  code: number;
  message: string;
  data: T;
};
type LinkVo = {
  linkName: string;
  logo: string;
  description: string;
  address: string;
};
const GetAllLink = () => {
  return useMyOtherFetch<ResponedType<LinkVo[]>>(MY_URL + "getAllLink", {
    method: "get",
  });
};
export { GetAllLink };
