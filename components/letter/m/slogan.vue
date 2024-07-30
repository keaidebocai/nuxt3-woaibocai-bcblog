<script lang="ts" setup>

</script>

<template>
    <!-- 标语盒子 -->
    <div class="selection-slogan-box">
        <div class="selection-slogan">
            <div>
                <h1 style="font-size: 2rem;margin-bottom: 15px;color: #fef;">这里藏着时间的魔法</h1>
                <h3 style="font-size: 1rem;color: #fff;">一封封等待时光解锁的信件，记录着每个心愿的轨迹</h3>
                <div
                    style="width: 100%;height: 50px;display: flex;justify-content: center;align-items: center;margin-top: 20px;">
                    <a href="/m/letter/writeLetter" style="text-decoration: none;color: #febcae;">
                        <div
                            class="selection-slogan-button" >
                            <h1 style="margin-right: 10px;font-size: 20px;">去写一封</h1>
                            <IconWriteLetters />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
  .selection-slogan-box {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;

    .selection-slogan {
      width: 100%;
      height: 100%;
      border-radius: 15px;
      background-image: url(https://cdn.likebocai.com/static/img/slogan.jpeg);
      background-size: 100% 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .selection-slogan-button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 200px;
        border-radius: 25px;
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0px 0px 2px black;
        transition: transform 0.5s ease-in;
      }
      .selection-slogan-button:hover {
        transform: scale(1.1);
      }
    }
  }
</style>