<template>
  <div class='echarts-demo'>
    <echart-common :options='options'></echart-common>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      options: {
        tooltip: {},
        grid: {
          left: '5%',
          right: '5%',
          bottom: '5%',
          top: '5%'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }]
      }
    })
    return {
      ...toRefs(state)
    }
  },
})
</script>

<style scoped lang='scss'>
.echarts-demo {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>