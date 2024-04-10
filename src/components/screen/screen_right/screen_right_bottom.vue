<template>
    <div class="box">
        <p>数据统计</p>
        <p>
            <img src="@/assets/screen_content_left_top_icon1_.png" alt="">
        </p>
        <!-- eachrts 图标 -->
        <div class="myEchars_box" ref="myChartRef"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';
import 'echarts-liquidfill'




// 基于准备好的dom，初始化echarts实例
const myChartRef = ref()

onMounted(function () {
    let myChart = echarts.init(myChartRef.value)

    // 绘制图表
    myChart.setOption({
        title: {
            text: '游客消费统计',
            textStyle: {
                color: '#fff'
            }
        },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '消费', max: 50000 },
                { name: '好感', max: 50000 },
                { name: '出行', max: 50000 },
                { name: '游玩', max: 50000 },
                { name: '吃饭', max: 50000 },
                { name: '电玩', max: 50000 }
            ]
        },
        series: [
            {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                    {
                        value: [42000, 30000, 20000, 35000, 50000, 38000],
                        name: '购物'
                    },
                    {
                        value: [30000, 14000, 28000, 26000, 42000, 21000],
                        name: '游戏'
                    }
                ]
            }
        ],
        grid: {
            left: 440,
            top: 40,
            bottom: 40
        },
    })
})
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

    .list {
        margin-top: 10px;
        display: flex;
        padding: 0 10px;
        justify-content: center;

        li {
            flex: 1;
            background: url('@/assets/screen_content_left_top_icon2_.png') no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
            text-align: center;
            padding: 5px 0;
        }
    }

    .myEchars_box {
        width: 100%;
        flex: 1;
    }
}
</style>