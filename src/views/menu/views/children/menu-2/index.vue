<template>
  <div class='echarts-demo'>
    <echart-common :options='state.options'></echart-common>
  </div>
</template>

<script  setup>
import { defineComponent,reactive,toRefs } from 'vue'
const state = reactive({
  options: {
    tooltip: {
      // trigger: 'axis',
      // axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      //   type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      // }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: [10,52,200,334,390,330,220]
      }
    ]
  }
})
</script>

<style scoped lang='scss'>
.echarts-demo {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>