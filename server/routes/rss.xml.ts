import RSS from "rss";

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: "菠菜的小窝",
    site_url: "https://www.likebocai.com",
    feed_url: "https://www.likebocai.com/rss.xml",
    language: "zh-cn",
  });

  // 从后端接口获取
});
