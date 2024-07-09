export default defineSitemapEventHandler(async () => {
  const [article] = await Promise.all([
    //
    $fetch("https://www.likebocai.com/api/blog/other/sitemap").then(
      (article) => article
    ),
  ]);
  return [...article].map((p) => {
    return { loc: p.loc, lastmod: p.lastmod };
  });
});
