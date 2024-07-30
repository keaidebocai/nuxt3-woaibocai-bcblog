<script setup lang="ts">
definePageMeta({
    layout: "mobile",
});
useHead({
    title: "about",
});
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { GetAbout } from "~/api/blog/other";
const catalogList = ref([]);
const onGetCatalog = (list) => {
    catalogList.value = list;
};
const onHtmlChanged = () => {
    // Check if `document` is available
    if (process.browser) {
        const { hash } = location;

        if (/^#/.test(hash)) {
            const headingId = decodeURIComponent(hash.replace("#", ""));

            if (headingId) {
                const targetHeadDom = document.getElementById(headingId);
                if (targetHeadDom) {
                    const scrollLength =
                        (targetHeadDom as HTMLHeadElement).offsetTop + 414 - 10;

                    window.scrollTo({
                        top: scrollLength,
                        behavior: "smooth",
                    });
                }
            }
        }
    }
};
const friendsCommentPlaceholder =
    "本站评论支持MarkDown语法欢迎表演!\n右上角的图片图标可上传图片\n支持png、jdg、git格式且大小不超过1MB\n符合条件会直接贴在输入框，反之不会。";
const aboutData = ref({
    text: "",
    editorId: "about",
});
// 接口取值
type ResponedType<T> = {
    code: number;
    message: string;
    data: T;
};
const getAbout = async () => {
    const res: ResponedType<string> = await GetAbout();
    aboutData.value.text = res.data;
};
getAbout();
</script>
<template>
    <el-row>
        <el-col :span="22">
            <AppMainMyAlert />
            <MdPreview previewTheme="mk-cute" :modelValue="aboutData.text" :editorId="aboutData.editorId"
                @onGetCatalog="onGetCatalog" @onHtmlChanged="onHtmlChanged" class="aboutMd" />
            <LazyAppMainComment :article-id="'likebocaiabout114514'" :comment-type="friendsCommentPlaceholder" />
            <AppButtom :is-mobile="true" :my-class="'MyButtomMobile'" />
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.el-row {
    display: flex;
    align-items: center;
    justify-content: center;
}

.md-editor-previewOnly {
    border: none;
    height: auto;
    border-radius: 20px;
}
</style>