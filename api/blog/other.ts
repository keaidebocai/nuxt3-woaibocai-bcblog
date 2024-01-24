const MY_URL = "/api/blog/other/";
// about
type ResponedType<T> = {
  code: number;
  message: string;
  data: T;
};
const GetAbout = () => {
  return useMyOtherFetch<ResponedType<string>>(MY_URL + "about", {
    method: "get",
  });
};
const GetLink = () => {
  return useMyOtherFetch<ResponedType<string>>(MY_URL + "link", {
    method: "get",
  });
};
export { GetAbout, GetLink };
