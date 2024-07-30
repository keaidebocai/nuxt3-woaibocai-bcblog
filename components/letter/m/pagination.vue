<!-- liebocai 分页 -->
 <!-- 嘿嘿，写的真好…… -->
<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const paginationStyle = (i: any) => {
    if (Number(i) == Number(route.params.id) || route.params.id == undefined && Number(i) == 1) return "background-color: transparent;color: #409EFF;";
    if(i == '...') return "background-color: transparent;color: #409EFF;box-shadow: 0px 0px 3px transparent;"
    return ""
}
const props = defineProps(['paginationUrl', 'total', 'current'])

const prevFun = () => {
    return props.paginationUrl + "/" + String(Number(route.params.id) - 1 == 1 ? "" : Number(route.params.id) - 1)
}

// 只保留前 5 个 和后 5 个
// 1,2,3,4,5....14,15,16,17,18
// 4,5,6,7,8....14,15,16,17,18
const paginationNumberList = () => {
    let total = Math.ceil(props.total / props.current)
        // 定义数组
        let arr: Array<string> = [];
    let arrRight:Array<string> = [];
    for (let num = 1;num <= total; num++) {
        arr.push(String(num))
    }
    if(total <= 8) {
        return arr;
    }

    // 把前五个塞进去
    // 取前五个
    let arrLeft:Array<string> = []
    if(route.params.id == undefined || Number(route.params.id) < 4) {
        arrLeft = arr.slice(0,4);
        return arrLeft.concat(["..."],arr.slice(-1))
    } else if(Number(route.params.id) >= 4 && Number(route.params.id) <= total - 4) {
        arrLeft = arr.slice(Number(route.params.id) - 2 ,1 + Number(route.params.id));
        arrLeft.push("...")
    } else if(Number(route.params.id) > total - 4) {
        return arrLeft.concat(["1","..."],arr.slice(-4))
    }
    
    // 后五个
    arrRight = arr.slice(-1);
    arr = [];
    return arr.concat(["1","..."],arrLeft,arrRight);
}
</script>

<template>
    <div class="likebocai-pagination-box">
        <div class="likebocai-pagination">
            <!-- 上一页 -->
            <a v-if="route.params.id" :href="prevFun()" :disable="Number(route.params.id) != 1"
                class="likebocai-pagination-prev">
                <LikebocaiIconPrev :size="40" />
            </a>
            <div class="likebocai-pagination-prev" style="cursor: not-allowed;opacity: 0.6;" v-else>
                <LikebocaiIconPrev :size="40" />
            </div>

            <!-- 中间页数 -->
            <a v-for="(i ,index) in paginationNumberList()" :style="paginationStyle(i)"
                :href="`${props.paginationUrl}/${i != '1' ? (i == '...' ? (index > 1 ? Math.ceil(props.total / props.current) : '') : i) : ''}`" class="likebocai-pagination-pagesNumber">
                <p style="font-size: 18px;font-weight: bolder;"
                    :style="{ fontSize: i == route.params.id || route.params.id == undefined && i == '1' ? '24px' : '18px' }">
                    {{ i != '...' ? i : (index > 1 ? '>>' : '<<')  }}</p>
            </a>
            <!-- 下一页 -->
            <a v-if="Number(route.params.id) != Math.ceil(props.total / props.current)"
                :href="`${props.paginationUrl}/${Number(route.params.id) + 1 || 2}`" class="likebocai-pagination-next">
                <LikebocaiIconNext :size="40" />
            </a>
            <div v-else style="cursor: not-allowed;opacity: 0.6;"
                :href="`${props.paginationUrl}/${Number(route.params.id) + 1 || 2}`" class="likebocai-pagination-next">
                <LikebocaiIconNext :size="40" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.likebocai-pagination-box {
    height: 50px;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .likebocai-pagination {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        // 上一页
        .likebocai-pagination-prev {
            cursor: pointer;
            margin-right: 10px;
            text-decoration: none;
        }

        // 页数
        .likebocai-pagination-pagesNumber {
            width: 38px;
            height: 38px;
            border-radius: 19px;
            background-color: rgba($color: #FFA56A, $alpha: 0.8);
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 5px;
            text-decoration: none;
            color: black;
            box-shadow: 0px 0px 3px #409EFF;
        }

        .likebocai-pagination-pagesNumber:hover {
            background-color: transparent;
            color: #409EFF;
        }

        // 下一页
        .likebocai-pagination-next {
            cursor: pointer;
            margin-left: 10px;
            text-decoration: none;
        }
    }
}
</style>