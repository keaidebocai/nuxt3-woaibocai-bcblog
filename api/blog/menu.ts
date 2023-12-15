const MY_URL = "/api/blog/menu";
// 所有分类
const GetAllMenu = () => {
  return useMyOtherFetch(MY_URL, {
    method: "get",
  });
};
export { GetAllMenu };
