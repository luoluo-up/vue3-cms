<template>
    <div class="error_box">
        <img src="@/assets/404.jpg" alt="">
        <div class="return_box" @click="back">
            <p>找不到地址啦!</p>
            <p>先返回首页吧!</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';


function back() {
    router.push('/')
}
</script>

<style scoped lang="scss">
.error_box {
    width: 100%;
    height: 100vh;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .return_box {
        position: absolute;
        right: 10%;
        top: 20%;
        transform: translate(-50%, -50%);
        font-size: 30px;
        background-color: #f56c6c;
        padding: 10px 30px;
        border-radius: 10px;
        color: #fff;
        line-height: 40px;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>