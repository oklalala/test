<template>
  <div class="vgECharts">
    {{vgChartData}}
    <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'VGECharts',
  props: {
    vgChartData: Array,
    project: Object,
    selectedDay: String
  },
  updated() {
    this.getData()
  },
  data() {
    return {
      markLine: {
        silent: true,
        data: [
          {
            label: { formatter: '行動值', position: 'start' },
            lineStyle: { color: 'red' },
            yAxis: -150
          },
          {
            label: { formatter: '警戒值', position: 'start' },
            lineStyle: { color: 'blue' },
            yAxis: -100
          },
          {
            label: { formatter: '管理值', position: 'start' },
            yAxis: -50
          },
          {
            label: { formatter: '管理值', position: 'start' },
            yAxis: 50
          },
          {
            label: { formatter: '警戒值', position: 'start' },
            lineStyle: { color: 'blue' },
            yAxis: 100
          },
          {
            label: { formatter: '行動值', position: 'start' },
            lineStyle: { color: 'red' },
            yAxis: 150
          }
        ]
      },
      orgOptions: {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: []
        },
        grid: {
          containLabel: true
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
          max: 150 * 1.2,
          min: -150 * 1.2,
          type: 'value'
        },
        series: [
          {
            name: 'VG-1-1',
            type: 'line',
            data: [],
            markLine: this.markLine
          },
          {
            name: 'VG-1-2',
            type: 'line',
            data: [],
            markLine: this.markLine
          },
          {
            name: 'VG-1-3',
            type: 'line',
            data: [],
            markLine: this.markLine
          },
          {
            name: 'VG-1-4',
            type: 'line',
            data: [],
            markLine: this.markLine
          },
          {
            name: 'VG-1-5',
            type: 'line',
            data: [],
            markLine: this.markLine
          }
        ]
      }
    }
  },
  methods: {
    getData() {
      var vgsData = this.vgChartData.map(x => x = x.data)

      // vgsData = vgsData.push([ "2019-01-30T23:59:00+00:00", 0 ])
      var vgsPosition = this.vgChartData.map(x => x = x.vgLocation)
      console.log(vgsData, vgsPosition)
      this.orgOptions.legend.data = vgsPosition
      for ( var i = 0; i < this.vgChartData.length; i++){
        this.orgOptions.series[i] = {
          name: vgsPosition[i],
          type: 'line',
          data: vgsData[i],
          markLine: this.markLine
        }
      }
      console.log(this.orgOptions)
    }
  }
}
</script>
