<template>
    <div class="box">
        <p>实时游客统计</p>
        <p>
            <img src="@/assets/screen_content_left_top_icon1_.png" alt="">
        </p>
        <p style="text-align: right;">可预约总量4134324人</p>
        <ul class="list">
            <li>
                <span>2</span>
            </li>
            <li>
                <span>2</span>
            </li>
            <li>
                <span>2</span>
            </li>
            <li>
                <span>2</span>
            </li>
            <li>
                <span>2</span>
            </li>
            <li>
                <span>2</span>
            </li>
            <li>
                <span>人</span>
            </li>
        </ul>
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
        // 图表主标题
        title: {
            text: '水球图', // 主标题文本，支持使用 \n 换行
            top: 20, // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
            left: 'left', // 值: 'left', 'center', 'right' 同上
            textStyle: { // 文本样式
                fontSize: 24,
                fontWeight: 600,
                color: '#fff'
            }
        },
        // 提示框组件
        tooltip: {
            trigger: 'item', // 触发类型, 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
            textStyle: {
                color: '#000' // 文字颜色
            },
            // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
            // 水球图: {a}（系列名称），{b}（无），{c}（数值）
            // 使用函数模板   传入的数据值 -> value: number|Array,
            formatter: function (value: any) {
                return value.seriesName + ': ' + value.data * 100 + '%'
            }
        },
        series: [{
            type: 'liquidFill',
            name: '全国就业率', // 系列名称，用于tooltip的显示，legend 的图例筛选
            radius: 250, // 水球图的半径
            center: ['250', '150'], // 水球图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
            // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形  
            // diamond 菱形  pin 水滴状 arrow 箭头状  还可以是svg的path
            shape: 'circle',
            phase: 0, // 波的相位弧度 不设置  默认自动
            direction: 'right', // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
            outline: {
                show: true,
                borderDistance: 0, // 边框线与图表的距离 数字
                itemStyle: {
                    opacity: 1, // 边框的透明度   默认为 1
                    borderWidth: 1, // 边框的宽度
                    shadowBlur: 1, // 边框的阴影范围 一旦设置了内外都有阴影
                    shadowColor: '#fff', // 边框的阴影颜色,
                    borderColor: '#41dcd8' // 边框颜色
                }
            },
            // 图形样式
            itemStyle: {
                color: '#4077eb', // 水球显示的背景颜色
                opacity: 0.5, // 波浪的透明度
                shadowBlur: 10 // 波浪的阴影范围
            },
            backgroundStyle: {
                color: '#407bf3', // 水球未到的背景颜色
                opacity: 0.5
            },
            // 图形的高亮样式
            emphasis: {
                itemStyle: {
                    opacity: 0.9 // 鼠标经过波浪颜色的透明度
                }
            },
            // 图形上的文本标签
            label: {
                fontSize: 55,
                fontWeight: 400,
                color: '#fff'
            },
            data: [0.6, 0.4, 0.2] // 系列中的数据内容数组
        }]
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