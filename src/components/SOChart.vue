<template>
  <div class="chart">
    <ve-line 
      :data="soChartData" 
      :settings="soChart" 
      :mark-line="soMark"
      :extend="soExtend"
      :legend-visible="false"></ve-line>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import 'echarts/lib/component/markLine'

export default {
  name: 'SOChart',
  components: { VeLine },
  props: {
    soChartData: Object,
    project: Object
  },
  mounted() {
    this.setSOMarkLine()
    this.setSOChartScope()
  },
  data() {
    return {
      soExtend: {
        xAxis: {
          type: 'value',
          name: '總位移量（ cm ）'
        },
        yAxis: {
          type: 'value',
          name: '深度（ m ）',
          max: 0,
          nameTextStyle: {
            color: '#888',
            fontSize: 12
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
              fontSize: 10
            }
          }
        }
      },
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
      }
    }
  },
  methods: {
    setSOMarkLine() {
      var so = this.project.soManagement
      this.soMark.data[0].xAxis = so.notice
      this.soMark.data[1].xAxis = -so.notice
      this.soMark.data[2].xAxis = so.warning
      this.soMark.data[3].xAxis = -so.warning
      this.soMark.data[4].xAxis = so.action
      this.soMark.data[5].xAxis = -so.action
    },
    setSOChartScope() {
      var so = this.project.soManagement
      this.soExtend.xAxis.max = so.action + 5
      this.soExtend.xAxis.min = -so.action - 5
    }
  }
}
</script>
