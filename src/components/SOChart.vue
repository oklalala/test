<template>
  <div class="chart">
    <ve-line 
      width='90%'
      :data="soChartData" 
      :settings="soChart" 
      :mark-line="soMark"
      :legend-visible="false"></ve-line>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import 'echarts/lib/component/markLine'
import moment from 'moment'

export default {
  name: 'SOChart',
  components: { VeLine },
  props: {
    soChartData: Object
  },
  data() {
    return {
      soMark: {
        data: [
          {
            name: '管理值',
            xAxis: 5,
            label: { normal: { formatter: '管理值' } }
          },
          {
            name: '管理值',
            xAxis: -5,
            label: { normal: { formatter: '管理值' } }
          },
          {
            lineStyle: { color: 'blue' },
            name: '警戒值',
            xAxis: 10,
            label: { normal: { formatter: '警戒值' } }
          },
          {
            lineStyle: { color: 'blue' },
            name: '警戒值',
            xAxis: -10,
            label: { normal: { formatter: '警戒值' } }
          },
          {
            lineStyle: { color: 'red' },
            name: '行動值',
            xAxis: 15,
            label: { normal: { formatter: '行動值' } }
          },
          {
            lineStyle: { color: 'red' },
            name: '行動值',
            xAxis: -15,
            label: { normal: { formatter: '行動值' } }
          }
        ]
      },
      soChart: {
        xAxisType: 'value'
      // },
      // soChartData: {
      //   columns: ['date', 'PV'],
      //   rows: [
      //     { date: '0', PV: -2.5 },
      //     { date: '11', PV: -2 },
      //     { date: '6', PV: -1.5 },
      //     { date: '-4', PV: -1 },
      //     { date: '-13', PV: -0.5 },
      //     { date: '4', PV: 0 }
      //   ]
      }
    }
  }
}
</script>
