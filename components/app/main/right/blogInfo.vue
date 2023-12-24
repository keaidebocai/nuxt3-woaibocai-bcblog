<script setup lang="ts">
// 头像
const animationPlayState = ref('runing');
const animationPlayStateByRuningOrPaused = (state: string) => {
    animationPlayState.value = state;
}
const mouseoverAnimation = () => {
    // paused
    const state = 'runing';
    animationPlayStateByRuningOrPaused(state);
}
const mouseenterAnimation = () => {
    const myFuntion = () => {
        // 这里打算再加逻辑改变css样式，暂时弃用
        const state = 'paused';
        animationPlayStateByRuningOrPaused(state)
    }
    setTimeout(myFuntion,1000);
}
const avatarSrc = ref('https://cdn.woaibocai.top/bcblog/public/src/avatar-1.jpg')
// 点击头像，从而改变头像
const changAvatarSrc = () => {
    const avatar = avatarSrc.value;
    // 此处声明变量只能使用 var 而不是const
    var avatarNum = parseInt(avatar.slice(51,-4));
    if (avatarNum >= 3) {
        avatarSrc.value = avatar.replace(avatarNum.toString(),'1');
    } else {
        avatarSrc.value = avatar.replace(avatarNum.toString(), (avatarNum += 1).toString());
    }
}

</script>

<template>
    <div class="appRightMyInfo">
        <div class="title">
            <span>站点概览</span>
        </div>
        <div class="avatar">
            <el-avatar 
            @mouseover="mouseoverAnimation()" 
            @mouseenter="mouseenterAnimation()"
            @click="changAvatarSrc()"
            :size="100" 
            :src="avatarSrc" />
        </div>
        <span class="name">
            菠菜的小窝
        </span>
        <div class="description">
            <p>
                上帝不让狗狗讲话是为了让人们知道，<br>爱与忠诚是要靠行动表达的。
            </p>
        </div>
        <div class="statistics">
            <ul>
                <li>

                </li>
            </ul>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.appRightMyInfo {
    height:50vh;
    background-color: rgba(255,255,255,0.6);
    border-radius: 20px;
    .title {
        height: 5vh;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2vh;
        // 149,212,117 rgba(128,128,128,0.6)  #e8c9b5 #32325d
        color:  #32325d;
    }
    .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        @keyframes el-avatar-rotate {
            // 0% { transform: rotate(90deg); }
            // 25% { transform: rotate(180deg); }
            // 50% { transform: rotate(270deg); }
            // 100% { transform: rotate(360deg); }
            from { transform: rotate(); }
            to { transform: rotate(360deg); }
        }
        .el-avatar:hover {
            -webkit-animation: el-avatar-rotate 1s infinite;
            animation: el-avatar-rotate 1s infinite;
            animation-play-state: v-bind(animationPlayState);
        }
    }
    .name {
        height: 2.5vh;
        margin-top: 1vh;
        margin-bottom: 0.5vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.3vh;
        font-weight: bold;
        color:  #32325d;
    }
    .description {
        height: 3vh;
        margin: 0 4vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6vh;
        color:  #32325d;
        p {
            text-align: center;
        }
    }
    .statistics  {
        height: 8vh;
        margin: 1vh 2vh 0 2vh;
        background-color: aqua;
    }
}
</style>
