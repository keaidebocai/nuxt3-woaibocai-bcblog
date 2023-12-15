const MY_URL = "/api/blog/category";
// 所有分类
const GetAllCategory = () => {
  return useMyOtherFetch(MY_URL, {
    method: "get",
  });
};
export { GetAllCategory };
