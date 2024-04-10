<template>
    <div class="box">
        <p>未来七天游客数据趋势图</p>
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


// 基于准备好的dom，初始化echarts实例
const myChartRef = ref()

onMounted(function () {
    let myChart = echarts.init(myChartRef.value)
    // 绘制图表
    myChart.setOption({
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
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            }
        },
        series: [
            {
                data: [0, 1000, 200, 2000, 300, 1800, 700],
                type: 'line',
                areaStyle: {},
                smooth: true,
            }
        ],
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

    .myEchars_box {
        width: 100%;
        flex: 1;
    }
}
</style>