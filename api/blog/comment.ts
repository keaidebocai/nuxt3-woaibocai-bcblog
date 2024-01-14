const MY_URL = "/api/blog/comment/";
// 分页
type OnCommentType = {
  code: number;
  message: string;
  data: {
    total: number;
    comment: [
      {
        id: string;
        sendId: string;
        sendUserAvater: string;
        sandUserNickName: string;
        createTime: string;
        content: string;
        likeCount: number;
        address: string;
        oneCommentVoList: [
          {
            id: string;
            sendId: string;
            sendUserAvater: string;
            sendUserNickName: string;
            replyId: string;
            replyUserAvater: string;
            replyUserNickName: string;
            createTime: string;
            content: string;
            parentId: string;
            likeCount: number;
            address: string;
            replyCommentId: string;
          }
        ];
      }
    ];
  };
};
const GetPageCommentByArticle = (
  articleId: string,
  current: number,
  size: number
) => {
  return useMyOtherFetch<OnCommentType>(
    MY_URL + `${articleId}/${current}/${size}`,
    {
      method: "get",
      query: { articleId, current, size },
    }
  );
};
export { GetPageCommentByArticle };
