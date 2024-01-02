const MY_URL = "/api/blog/header/";
// 所有分类
const GetCategoryAndMenu = () => {
  return useMyOtherFetch(MY_URL + "getCategoryAndMenu", {
    method: "get",
  });
};
export { GetCategoryAndMenu };
