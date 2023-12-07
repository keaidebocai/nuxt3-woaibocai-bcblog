<script setup lang="ts">
definePageMeta({
    layout: 'nothing'
})
import { GetUserInfo } from '~/api/test'
const click = async() => {
    const { res } = await GetUserInfo()
    console.log(res)
}
</script>

<template>
    <div>
        <el-button type="primary" @click="click">点我</el-button>
    </div>
</template>

<style lang="scss" scoped>

</style>
