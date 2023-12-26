<script setup lang="ts">
definePageMeta({
    layout: 'nothing',
})
useHead({
    title: '关于本站',
    meta: [
        {
          name: "description",
          content: "这是测试页面",
        },
        { name: "keywords", content: "菠菜的小窝,Java,关于本站" },
      ],
})
const num = ref()
// const click = async() => {
//     const { data } = await useGetUserInfo({
//         method: 'get'
//     })
//     num.value = data
//     console.log(data)
// }
import { GetAllMenu } from '~/api/blog/menu'
onServerPrefetch(async () => {
      // 组件作为初始请求的一部分被渲染
      // 在服务器上预抓取数据，因为它比在客户端上更快。
      // $fetch("http://192.168.31.4:16280/api/user/getUserInfo")
      const data  = await $fetch("http://192.168.31.4:16280/api/blog/menu",{ method: 'GET' })
      let mountains = data
        num.value = mountains;
    }
)
// onMounted(()=>{
//     click()
// })
</script>

<template>
    <div>
        点按钮获取数据
        <div style="width: 80px;height: 80px;background-color: #fff; color: red; font-size: 20px;">
            {{ num }}
        </div>
        <NuxtLink to="about">NuxtLi</NuxtLink>
        <!-- @click="click" -->
        <el-button type="primary" >点我</el-button>
    </div>
</template>

<style lang="scss" scoped>

</style>
