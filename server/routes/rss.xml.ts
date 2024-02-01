import RSS from "rss";

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: "菠菜的小窝",
    site_url: "https://www.likebocai.com",
    feed_url: "https://www.likebocai.com/rss.xml",
    language: "zh-cn",
  });

  // 从后端接口获取
  const MY_URL = useRuntimeConfig().public.BASE_URL;
  type BlogData = {
    title: string;
    url: string;
    date: string;
    description: string;
    tags: string[];
  };
  const blogdata: BlogData[] = await $fetch(MY_URL + "/blog/other/RSS", {
    method: "get",
  });
  for (const blog of blogdata) {
    feed.item({
      title: blog.title ?? "-",
      url: `https://www.likebocai.com/article/${blog.url}`,
      date: blog.date,
      description: blog.description,
      author: "likebocai",
      categories: blog.tags,
    });
  }

  const feedString = feed.xml({ indent: true });
  event.node.res;
  event.node.res.setHeader("content-type", "text/xml");
  event.node.res.end(feedString);
  return feed;
});
