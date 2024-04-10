<template>
    <div class="box">
        <p>实时游客统计</p>
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
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '30%',
            right: 'right',
            textStyle: {
                color: '#fff'
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['70%', '20%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                center: ['200', '170'], // 图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff'
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '抖音' },
                    { value: 735, name: '斗鱼' },
                    { value: 580, name: '快手' },
                    { value: 484, name: 'bilibili' },
                    { value: 300, name: '虎牙' }
                ]
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