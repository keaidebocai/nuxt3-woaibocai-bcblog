const MY_URL = "/api/blog/info/";
// 所有分类
const GetBlogInfo = () => {
  return useMyOtherFetch(MY_URL + "blogInfo", {
    method: "get",
  });
};
export { GetBlogInfo };
