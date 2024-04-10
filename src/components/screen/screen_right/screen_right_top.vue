<template>
    <div class="box">
        <p>热门景区排行</p>
        <p>
            <img src="@/assets/screen_content_left_top_icon1_.png" alt="">
        </p>
        <p style="text-align: right;">景区排行</p>
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
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                type: 'bar',
                data: [
                    120,
                    {
                        value: 200,
                        itemStyle: {
                            color: '#a90000'
                        }
                    },
                    150,
                    280,
                    170,
                    310,
                    {
                        value: 530,
                        itemStyle: {
                            color: 'red'
                        }
                    },
                ],
                color: '#87ceeb',
                label: {
                    show: true,
                    position: 'top',
                    color: '#fff'
                },
                showBackground: true,
                backgroundStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#000' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                },
                itemStyle: {
                    borderRadius: [10, 10, 0, 0],
                }
            },
            {
                type: 'bar',
                data: [
                    120,
                    {
                        value: 200,
                        itemStyle: {
                            color: '#a90000'
                        }
                    },
                    150,
                    280,
                    170,
                    310,
                    {
                        value: 530,
                        itemStyle: {
                            color: 'red'
                        }
                    },
                ],
                color: '#87ceeb',
                label: {
                    show: true,
                    position: 'top',
                    color: '#fff'
                },
                showBackground: true,
                backgroundStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#000' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                },
                itemStyle: {
                    borderRadius: [10, 10, 0, 0],
                }
            },
            {
                type: 'line',
                data: [100, 200, 300, 600, 400, 360, 160]
            }
        ],
        grid: {
            right: 20,
            top: 30,
            bottom: 30
        }
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