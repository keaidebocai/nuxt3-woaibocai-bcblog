<script setup lang="ts">
definePageMeta({
    layout: 'nothing'
})
// import { GetUserInfo } from '~/api/test'
const num = ref({})
const click = async() => {
    // const { data } =  await GetUserInfo()

    // const userInfo = unref(data).data
    const { data } = await userInfoFetch({
        method: "get"
    })
    num.value = data
}
onMounted(()=>{
    click()
})
</script>

<template>
    <div>
        点按钮获取数据
        <p style="color: red;">{{ num }}</p>
        <el-button type="primary" @click="click">点我</el-button>
    </div>
</template>

<style lang="scss" scoped>

</style>
