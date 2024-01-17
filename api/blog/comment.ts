import { useTokenStore } from "~/store/useToken";

const MY_URL = "/api/blog/comment/";
// 分页
type TwoCommentType = {
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
  isShow: boolean;
  replyCommentId: string;
};
type OneCommentType = {
  id: string;
  sendId: string;
  sendUserAvater: string;
  sandUserNickName: string;
  createTime: string;
  content: string;
  likeCount: number;
  address: string;
  isShow: boolean;
  oneCommentVoList: [data: TwoCommentType];
};
type CommentType = {
  code: number;
  message: string;
  data: {
    total: number;
    comment: [data: OneCommentType];
  };
};
type ResponedType<T> = {
  code: number;
  message: string;
  data: T;
};
const GetPageCommentByArticle = (
  articleId: string,
  current: number,
  size: number
) => {
  return useMyOtherFetch<CommentType>(
    MY_URL + `${articleId}/${current}/${size}`,
    {
      method: "get",
      query: { articleId, current, size },
    }
  );
};
type ReplyOneCommentType = {
  replyCommentId: string;
  sendCommentUserId: string;
  replyCommentUserId: string;
  content: string;
  address: string;
  articleId: string;
  parentId: string;
};
const ReplyOneComment = (data: ReplyOneCommentType) => {
  const store = useTokenStore();
  //
  return useMyOtherFetch<ResponedType<TwoCommentType>>(
    MY_URL + "auth/replyOneComment",
    {
      method: "post",
      body: data,
      Headers: {
        "114514": store.getUserInfo.userId,
      },
    }
  );
};
// 发送一级评论
type SendOneCommentType = {
  articleId: string;
  content: string;
  userId: string;
  address: string;
};
const SendOneComment = (data: SendOneCommentType) => {
  return useMyOtherFetch<ResponedType<OneCommentType>>(
    MY_URL + "auth/sendOneComment",
    {
      method: "post",
      body: data,
    }
  );
};
export { GetPageCommentByArticle, ReplyOneComment, SendOneComment };
