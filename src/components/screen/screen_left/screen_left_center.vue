<template>
    <div class="box">
        <p>男女比例</p>
        <p>
            <img src="@/assets/screen_content_left_top_icon1_.png" alt="">
        </p>
        <div class="icon_box">
            <div class="img_box">
                <img src="@/assets/screen_content_left_center_icon3_.png" alt="">
            </div>
            <div class="img_box">
                <img src="@/assets/screen_content_left_center_icon4_.png" alt="">
            </div>
        </div>
        <div class="myEchars_box">
            <div class="text_title">
                <p>
                    <span>男士</span>
                    <span>58%</span>
                </p>
                <p>
                    <span>女士</span>
                    <span>42%</span>
                </p>
            </div>
            <div class="progress_box">
                <div class="line"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
    color: #fff;
    line-height: 18px;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    box-sizing: border-box;

    .icon_box {
        display: flex;
        justify-content: center;
        margin-top: 30px;

        .img_box {
            margin: 0 20px;
            width: 111px;
            height: 115px;
            background: url('@/assets/screen_content_left_center_icon1_.png') no-repeat;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 45px;
                height: 45px;
            }
        }

        .img_box:last-child {
            background: url('@/assets/screen_content_left_center_icon2_.png') no-repeat;
            background-size: cover;
        }
    }

    .myEchars_box {
        width: 100%;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        padding: 20px 0;
        box-sizing: border-box;

        .text_title {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        .progress_box {
            width: 100%;
            height: 30px;
            border-radius: 20px;
            background-color: #ffc0cb;

            .line {
                width: 58%;
                height: 100%;
                background-color: #87ceeb;
                border-radius: 20px;
            }
        }
    }
}
</style>