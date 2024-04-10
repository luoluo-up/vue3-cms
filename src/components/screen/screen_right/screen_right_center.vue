<template>
    <div class="box">
        <p>年度游客对比量</p>
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
            text: '散点图',
            left: '40%',
            top: 10,
            textStyle: {
                color: '#fff',
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            type: 'value',
            show: false
        },
        series: [
            {
                symbolSize: 20,
                data: [
                    [10.0, 8.04],
                    [8.07, 6.95],
                    [13.0, 7.58],
                    [9.05, 8.81],
                    [11.0, 8.33],
                    [14.0, 7.66],
                    [13.4, 6.81],
                    [10.0, 6.33],
                    [14.0, 8.96],
                    [12.5, 6.82],
                    [9.15, 7.2],
                    [11.5, 7.2],
                    [3.03, 4.23],
                    [12.2, 7.83],
                    [2.02, 4.47],
                    [1.05, 3.33],
                    [4.05, 4.96],
                    [6.03, 7.24],
                    [12.0, 6.26],
                    [12.0, 8.84],
                    [7.08, 5.82],
                    [5.02, 5.68]
                ],
                type: 'scatter',
                symbol: 'arrow',
                // color: {
                //     type: 'linear',
                //     x: 0,
                //     y: 0,
                //     x2: 0,
                //     y2: 1,
                //     colorStops: [{
                //         offset: 0, color: 'red' // 0% 处的颜色
                //     }, {
                //         offset: 1, color: 'blue' // 100% 处的颜色
                //     }],
                //     global: false // 缺省为 false
                // },
                label: {
                    show: true,
                    color: '#fff',
                    position: 'top'
                },
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'red' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            }
        ],
        grid: {
            left: 40,
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