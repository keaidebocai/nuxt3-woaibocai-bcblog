const MY_URL = "/api/blog/article/";
// 所有分页
const GetIndexArticle = (current: number, size: number) => {
  return useMyOtherFetch(MY_URL + `indexArticlePage/${current}/${size}`, {
    method: "get",
    query: { current, size },
  });
};

// 根据 url 获取文章
const GetArticleByUrl = (url: string) => {
  return useMyOtherFetch(MY_URL + `getArticleByUrl/${url}`, {
    method: "get",
  });
};

// 根据tagUrl分页
const GetArticlePageBytagUrl = (
  tagUrl: string,
  current: number,
  size: number
) => {
  return $fetch(MY_URL + `articlePageBytagUrl/${tagUrl}/${current}/${size}`, {
    method: "get",
    query: { tagUrl, current, size },
  });
};

export { GetIndexArticle, GetArticleByUrl, GetArticlePageBytagUrl };
