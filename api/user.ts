const GetUserInfo = () => {
  return useMyOtherFetch("/api/user/auth/getUserInfo", {
    method: "get",
  });
};
export { GetUserInfo };
