const getUserInfo = () => {
  return useMyFetch("/api/user/auth/getUserInfo", {
    method: "get",
  });
};
export { getUserInfo };
