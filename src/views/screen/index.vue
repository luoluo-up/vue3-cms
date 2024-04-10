<template>
    <div>
        <div class="container">
            <div class="screen" ref="screen">
                <!-- 屏幕头部 -->
                <div class="screen_top">
                    <div class="left">
                        <div class="btn" @click="router.push('/home')">首页</div>
                    </div>
                    <div class="center">
                        智慧旅游可视化大数据平台
                    </div>
                    <div class="right">
                        <div class="btn">统计报告</div>
                        <p>当前时间:{{ time }}</p>
                    </div>
                </div>
                <!-- 屏幕主题内容 -->
                <div class="screen_content">
                    <div class="screen_left">
                        <div class="top">
                            <Screen_left_top></Screen_left_top>
                        </div>
                        <div class="middle">
                            <Screen_left_center></Screen_left_center>
                        </div>
                        <div class="bottom">
                            <Screen_left_bottom></Screen_left_bottom>
                        </div>
                    </div>
                    <div class="screen_center">
                        <div class="top">
                            <Screen_center_top></Screen_center_top>
                        </div>
                        <div class="bottom">
                            <Screen_center_bottom></Screen_center_bottom>
                        </div>
                    </div>
                    <div class="screen_right">
                        <div class="top">
                            <Screen_right_top></Screen_right_top>
                        </div>
                        <div class="center">
                            <Screen_right_center></Screen_right_center>
                        </div>
                        <div class="bottom">
                            <Screen_right_bottom></Screen_right_bottom>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 左侧组件
import Screen_left_top from '@/components/screen/screen_left/screen_left_top.vue'
import Screen_left_center from '@/components/screen/screen_left/screen_left_center.vue'
import Screen_left_bottom from '@/components/screen/screen_left/screen_left_bottom.vue'
// 中间组件
import Screen_center_top from '@/components/screen/screen_center/screen_center_top.vue'
import Screen_center_bottom from '@/components/screen/screen_center/screen_center_bottom.vue'
// 右侧组件
import Screen_right_top from '@/components/screen/screen_right/screen_right_top.vue'
import Screen_right_center from '@/components/screen/screen_right/screen_right_center.vue'
import Screen_right_bottom from '@/components/screen/screen_right/screen_right_bottom.vue'

import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';


let time = ref('')
const router = useRouter()
const screen = ref()
// 获取比例
function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w
    const wh = window.innerHeight / h
    screen.value.style.transform = ` scale(${ww < wh ? ww : wh}) translate(-50%, -50%)`
}
// 监听窗口变化事件
window.addEventListener('resize', resizeFun)
// 窗口变化触发事件
function resizeFun() {
    getScale()
}
// 组件挂载
onMounted(() => {
    getScale()
    time.value = getTime()
    setInterval(() => {
        time.value = getTime()
    }, 1000);
})
// 组件销毁
onBeforeUnmount(function () {
    window.removeEventListener('resize', resizeFun);
})
// 时间定时器
function getTime() {
    const date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    month = (month > 9 ? month : '0' + month) as number
    let day = date.getDate()
    day = (day > 9 ? day : '0' + day) as number
    let hours = date.getHours()
    hours = (hours > 9 ? hours : '0' + hours) as number
    let minutes = date.getMinutes()
    minutes = (minutes > 9 ? minutes : '0' + minutes) as number
    let seconds = date.getSeconds()
    seconds = (seconds > 9 ? seconds : '0' + seconds) as number
    return year + '年' + month + '月' + day + '日' + ' ' + hours + ':' + minutes + ':' + seconds
}
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/screen_bg.png') no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        left: 50%;
        top: 50%;
        width: 1920px;
        height: 1080px;
        transform-origin: left top;

        .screen_top {
            width: 100%;
            display: flex;
            height: 40px;
            color: #29fcff;
            z-index: 99;

            .left {
                flex: 1;
                background: url('@/assets/screen_top_left_bg.png') no-repeat;
                background-size: 100% 100%;
                display: flex;
                justify-content: flex-end;

                .btn {
                    width: 150px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background: url('@/assets/screen_top_left_btnBg.png') no-repeat;
                    background-size: 100% 100%;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }

            .center {
                flex: 2;
                height: 70px;
                background: url('@/assets/screen_top_center_bg.png') no-repeat;
                background-size: 100% 100%;
                text-align: center;
                line-height: 40px;
            }

            .right {
                flex: 1;
                flex: 1;
                background: url('@/assets/screen_top_left_bg.png') no-repeat;
                background-size: 100% 100%;
                display: flex;
                text-align: center;

                .btn {
                    width: 150px;
                    height: 40px;
                    line-height: 40px;
                    background: url('@/assets/screen_top_right_bg.png') no-repeat;
                    background-size: 100% 100%;

                    &:hover {
                        cursor: pointer;
                    }
                }

                p {
                    flex: 1;
                    line-height: 40px;
                }
            }
        }

        .screen_content {
            height: 1040px;
            display: flex;

            .screen_left {
                flex: 1;
                display: flex;
                flex-direction: column;

                .top {
                    flex: 1.2;
                    background: url('@/assets/screen_content_left_top_bg_.png') no-repeat;
                    background-size: 100% 100%;
                    display: flex;
                    flex-direction: column;
                }

                .middle {
                    flex: 1;
                    background: url('@/assets/screen_content_left_top_bg_.png') no-repeat;
                    background-size: 100% 100%;
                    display: flex;
                    flex-direction: column;
                    // margin: 10px 0;
                }

                .bottom {
                    flex: 1;
                    background: url('@/assets/screen_content_left_top_bg_.png') no-repeat;
                    background-size: 100% 100%;
                    display: flex;
                    flex-direction: column;
                }
            }

            .screen_center {
                flex: 2;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding: 0 20px;

                .top {
                    flex: 3;
                }

                .bottom {
                    flex: 1;
                    background: url('@/assets/screen_content_left_top_bg_.png') no-repeat;
                    background-size: 100% 100%;
                    display: flex;
                    flex-direction: column;
                }
            }

            .screen_right {
                flex: 1;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;

                .top {
                    flex: 1;
                    background: url('@/assets/screen_content_left_top_bg_.png') no-repeat;
                    background-size: 100% 100%;
                    display: flex;
                    flex-direction: column;
                }

                .center {
                    flex: 1;
                    margin: 10px 0;
                    background: url('@/assets/screen_content_left_top_bg_.png') no-repeat;
                    background-size: 100% 100%;
                    display: flex;
                    flex-direction: column;
                }

                .bottom {
                    flex: 1;
                    background: url('@/assets/screen_content_left_top_bg_.png') no-repeat;
                    background-size: 100% 100%;
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }

    .screen_content {
        height: 100%;
        width: 100%;
    }
}
</style>