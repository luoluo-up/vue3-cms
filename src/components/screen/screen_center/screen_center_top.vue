<template>
    <div class="box" ref="myChartRef">

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from './china.json'



const myChartRef = ref()
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
    let myChart = echarts.init(myChartRef.value)
    myChart.setOption({
        geo: {
            map: 'china',
            roam: true,
            top: '30%',
            label: {
                show: true,
                color: '#fff'
            },
            scaleLimit: {
                min: 1.5
            },
            itemStyle: {
                borderColor: '#000',
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
            },
            emphasis: {
                itemStyle: {
                    color: 'red'
                },
                label: {
                    color: '#fff'
                }
            }
        },
        series: [
            {
                type: 'lines',
                data: [
                    {
                        coords: [
                            [
                                116.405285,
                                39.904989
                            ],  // 起点
                            [
                                119.306239,
                                26.075302
                            ]   // 终点
                        ],
                        // 统一的样式设置
                        lineStyle: {
                            width: 5,
                            color: '#f0ed0c',
                            cap: 'round'
                        },
                    },
                    {
                        coords: [
                            [
                                106.504962,
                                29.533155
                            ],  // 起点
                            [
                                111.670801,
                                40.818311
                            ] // 终点
                        ],
                        // 统一的样式设置
                        lineStyle: {
                            width: 5,
                            color: '#ee9a0f',
                            cap: 'round'
                        }
                    }
                ],
                effect: {
                    show: true,
                    symbolSize: 18,
                    symbol: 'arrow',
                    color: '#fff'
                }
            }
        ]
    })
})
</script>
<style scoped>
.box {
    width: 100%;
    height: 100%;
}
</style>