<script setup lang="ts">
definePageMeta({
    layout: 'nothing'
})
// import { GetUserInfo } from '~/api/test'
import { getUserInfo } from '~/api/test'
const num = ref({})
const click = async() => {
    // const { data } =  await GetUserInfo()

    // const userInfo = unref(data).data
    // const { data } = await userInfoFetch({
    //     method: "get"
    // })


    // await getUserInfo().then((res)=> {
    //     const data = unref(res.data)
    //     console.log(data.code)

    //     num.value = data.data
    // })
    // console.log(data)


    // num.value = data

    const { data } = await useGetUserInfo({
        method: 'get'
    })
    num.value = data
    console.log(data)
}
onMounted(()=>{
    click()
})
</script>

<template>
    <div>
        点按钮获取数据
        <div style="width: 80px;height: 80px;background-color: #fff; color: red; font-size: 20px;">
            {{ num }}
        </div>
        <el-button type="primary" @click="click">点我</el-button>
    </div>
</template>

<style lang="scss" scoped>

</style>
