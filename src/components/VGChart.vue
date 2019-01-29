<template>
  <div class="chart">
    <ve-line 
      width='90%'
      :grid='vgGrid'
      :data="vgChartData" 
      :mark-line="vgMark"
      :extend="vgExtend"
      :legend-visible="false"></ve-line>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import 'echarts/lib/component/markLine'
import moment from 'moment'

export default {
  name: 'VGChart',
  components: { VeLine },
  props: {
    vgChartData: Object,
    project: Object
  },
  data() {
    return {
      vgGrid: {
        show: true,
        top: 50,
        left: 10,
        backgroundColor: '#ccc',
        borderColor: '#000'
      },
      vgMark: {
        data: [
          {
            name: '管理值',
            yAxis: 70,
            label: { normal: { formatter: '管理值', position: 'start' } }
          },
          {
            name: '管理值',
            yAxis: -70,
            label: { normal: { formatter: '管理值', position: 'start' } }
          },
          {
            lineStyle: { color: 'blue' },
            name: '警戒值',
            yAxis: 80,
            label: { normal: { formatter: '警戒值', position: 'start' } }
          },
          {
            lineStyle: { color: 'blue' },
            name: '警戒值',
            yAxis: -80,
            label: { normal: { formatter: '警戒值', position: 'start' } }
          },
          {
            lineStyle: { color: 'red' },
            name: '行動值',
            yAxis: 110,
            label: { normal: { formatter: '行動值', position: 'start' } }
          },
          {
            lineStyle: { color: 'red' },
            name: '行動值',
            yAxis: -110,
            label: { normal: { formatter: '行動值', position: 'start' } }
          }
        ]
      },
      vgExtend: {
        xAxis: {
          type: 'time',
          axisLabel: {
            formatter(value) {
              return moment(value).format('HH:mm')
            }
          }
        }
      }
      // vgChartData: {
      //   columns: ['date', 'PV'],
      //   rows: [
      //     { date: '01-01', PV: 1231 },
      //     { date: '01-02', PV: 1223 },
      //     { date: '01-03', PV: 2123 },
      //     { date: '01-04', PV: 4123 },
      //     { date: '01-05', PV: 3123 },
      //     { date: '01-06', PV: 7123 },
      //     { date: '01-07', PV: 7123 },
      //     { date: '01-08', PV: 7123 },
      //     { date: '01-09', PV: 7123 }
      //   ]
      // }
    }
  }
}
</script>
