<template>
  <div class="chart">
    <ve-line 
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
    project: Object,
    floorIndex: Number
  },
  mounted() {
    this.setVGMarkLine()
    this.setVGChartScope()
  },
  data() {
    return {
      vgExtend: {
        xAxis: {
          type: 'time',
          axisLabel: {
            formatter(value) {
              // 輸入的時間 與 v-charts 軸上的時間有落差
              return moment(value)
                .subtract(8, 'h')
                .format('HH:mm')
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '軸力 (噸 / T)',
          max: 100,
          min: -100,
          nameTextStyle: {
            color: '#888',
            fontSize: 12
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
              fontSize: 10
            }
          },
          axisLabel: {
            formatter: '{value} 噸'
          }
        },
        series: {
          smooth: false
        }
      },
      vgGrid: {
        top: 50,
        left: 10
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
      }
    }
  },
  methods: {
    setVGMarkLine() {
      var vg = this.project.vgManagement[this.floorIndex]
      this.vgMark.data[0].yAxis = vg.notice
      this.vgMark.data[1].yAxis = -vg.notice
      this.vgMark.data[2].yAxis = vg.warning
      this.vgMark.data[3].yAxis = -vg.warning
      this.vgMark.data[4].yAxis = vg.action
      this.vgMark.data[5].yAxis = -vg.action
    },
    setVGChartScope() {
      var vg = this.project.vgManagement[this.floorIndex]
      this.vgExtend.yAxis.max = vg.action + 10
      this.vgExtend.yAxis.min = -vg.action - 10
    }
  }
}
</script>
