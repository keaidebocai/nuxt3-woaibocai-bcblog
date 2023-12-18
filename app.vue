<script setup lang="ts">
useHead({
    titleTemplate: (title) => {
        return title ? `${title} - 菠菜的小窝` : '菠菜的小窝'
    }
})
</script>

<template>
    <NuxtLayout>
        <nuxt-page />
    </NuxtLayout>
</template>

<style lang="scss" scoped>

</style>