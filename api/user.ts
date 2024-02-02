const GetUserInfo = () => {
  return useMyOtherFetch("/api/user/auth/getUserInfo", {
    method: "get",
  });
};
// updateUserInfo
type UserInfo = {
  avatar: string;
  nickName: string;
  sex: string;
  userId: string;
};
const UpdateUserInfo = (data: UserInfo) => {
  return useMyOtherFetch("/api/user/auth/updateUserInfo", {
    method: "post",
    body: data,
  });
};
export { GetUserInfo, UpdateUserInfo };
