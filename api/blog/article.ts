const MY_URL = "/api/blog/article/";
// 所有分类
const GetIndexArticle = (current: number, size: number) => {
  return useMyOtherFetch(MY_URL + `indexArticlePage/${current}/${size}`, {
    method: "get",
    query: { current, size },
  });
};
export { GetIndexArticle };
