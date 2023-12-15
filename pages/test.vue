<script setup lang="ts">
definePageMeta({
    layout: 'nothing'
})
const num = ref({})
const click = async() => {
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
