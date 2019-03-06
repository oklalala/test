<template>
  <div class="vgECharts">
    <chart ref="chart1" :options="options" :auto-resize="true"></chart>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'VGECharts',
  props: {
    vgChartData: Array,
    project: Object,
    selectedDay: Date,
    selectedFloor: Number
  },
  computed: {
    vgsPosition() {
      return this.vgChartData.map(item => (item = item.vgLocation))
    },
    vgManagement() {
      return this.project.vgManagement[this.selectedFloor - 1]
    },
    markLine() {
      return {
        silent: true,
        data: [
          {
            label: { formatter: '行動值', position: 'start' },
            lineStyle: { color: 'red' },
            yAxis: -this.vgManagement.action
          },
          {
            label: { formatter: '警戒值', position: 'start' },
            lineStyle: { color: 'blue' },
            yAxis: -this.vgManagement.warning
          },
          {
            label: { formatter: '管理值', position: 'start' },
            lineStyle: { color: 'green' },
            yAxis: -this.vgManagement.notice
          },
          {
            label: { formatter: '管理值', position: 'start' },
            lineStyle: { color: 'green' },
            yAxis: this.vgManagement.notice
          },
          {
            label: { formatter: '警戒值', position: 'start' },
            lineStyle: { color: 'blue' },
            yAxis: this.vgManagement.warning
          },
          {
            label: { formatter: '行動值', position: 'start' },
            lineStyle: { color: 'red' },
            yAxis: this.vgManagement.action
          }
        ]
      }
    },
    seriesData() {
      if (!this.vgChartData.length) {
        return { type: 'line', markLine: this.markLine }
      }
      return this.vgChartData.map(item => ({
        name: item.vgLocation,
        type: 'line',
        data: item.data,
        markLine: this.markLine
      }))
    },
    options() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.vgsPosition
        },
        xAxis: {
          type: 'time',
          min: +moment(this.selectedDay).startOf('day'),
          max: +moment(this.selectedDay).endOf('day'),
          axisLabel: {
            formatter(value) {
              return moment(value).format('HH:mm')
            }
          }
        },
        yAxis: {
          max: this.vgManagement.action * 1.2,
          min: -this.vgManagement.action * 1.2,
          type: 'value'
        },
        series: this.seriesData
      }
    }
  }
}
</script>
