<script setup lang="ts">
const props = defineProps(['size'])
</script>

<template>
    <div>
        <svg t="1720848196778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="16520" :width="props.size ? props.size : '32'" :height="props.size ? props.size : '32'">
            <path
                d="M721.3 959.3H301.7C170.5 959.1 64.1 852.8 64 721.5V302c0.1-131.3 106.5-237.6 237.7-237.8h419.6C852.5 64.4 958.9 170.7 959 302v419.6c-0.1 131.2-106.5 237.5-237.7 237.7zM301.7 92.2"
                fill="#CCA55D" p-id="16521"></path>
            <path
                d="M722.2 189.9H301.8L193.5 423 512 834.1l318.5-412.6-108.3-231.6zM596.9 437.4L512 757.3l-84.7-319.6 169.6-0.3z m-164.5-28.2L512 246.6l79.6 162.6H432.4z m95.8-188h169.6l-84.9 171.7-84.7-171.7zM411.1 392.9l-84.9-171.7h169.1l-84.2 171.7z m-21.2 15.4H229.1l79.6-168.6 81.2 168.6z m11.2 29.4l84.4 317.7-246.6-317.7h162.2z m221.8 0H784L538.5 756.4l84.4-318.7z m11.5-29.4L716.6 240l79.6 168.3H634.4z m0 0"
                fill="#FFFFFF" p-id="16522"></path>
        </svg>
    </div>
</template>

<style lang="scss" scoped></style>
