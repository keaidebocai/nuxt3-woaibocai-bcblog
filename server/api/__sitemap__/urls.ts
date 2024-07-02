export default defineSitemapEventHandler(async () => {
  const [article] = await Promise.all([
    //
    $fetch("http://localhost:16280/api/blog/other/sitemap").then(
      (article) => article
    ),
  ]);
  return [...article].map((p) => {
    return { loc: p.loc, lastmod: p.lastmod };
  });
});
