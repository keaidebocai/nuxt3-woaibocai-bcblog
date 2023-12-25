export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) {
    // 在服务器端处理路由
    const nuxtApp = useNuxtApp();
  } else {
    // 在客户端处理路由

    // 是否是移动端设备
    const isMobile =
      /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(
        navigator.userAgent
      );

    // 是否是手机端路由
    const isRouterMobile = /^\/m\//.test(to.fullPath);

    // 移动端并且 不是/m开头路由
    if (isMobile && !isRouterMobile) {
      return navigateTo(`/m${to.fullPath}`, { external: true });
    }

    // 不是移动端 是/m开头路由
    if (!isMobile && isRouterMobile) {
      return navigateTo(`${to.fullPath.replace("/m", "")}`, { external: true });
    }
  }
});

// export default defineNuxtRouteMiddleware((to, from) => {
//   if (process.server) {
//     // 在服务器端处理路由
//     const nuxtApp = useNuxtApp();
//   } else {
//     // 在客户端处理路由
//     // 是否是移动端设备
//     const isMobile =
//       /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(
//         navigator.userAgent
//       );
//     // 是否是手机端路由
//     const isRouterMobile = /m/i.test(to.fullPath);
//     if (!isMobile && isRouterMobile) {
//       // 手机端路由跳转pc端
//       let path = to.fullPath.replace("/m", "");
//       return navigateTo(path, {
//         // replace: true,
//         // redirectCode: 302,
//         external: true,
//       });
//     } else if (isMobile && !isRouterMobile) {
//       // pc端路由跳转手机端
//       let path = "/m" + to.fullPath.slice(0, to.fullPath.length - 1);
//       return navigateTo(path, {
//         // replace: true,
//         // redirectCode: 301,
//         external: true,
//       });
//     }
//   }
// });
