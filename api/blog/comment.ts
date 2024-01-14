const MY_URL = "/api/blog/comment/";
// 所有分页
const GetPageCommentByArticle = (
  articleId: number,
  current: number,
  size: number
) => {
  return useMyOtherFetch(MY_URL + `${articleId}/${current}/${size}`, {
    method: "get",
    query: { articleId, current, size },
  });
};
