<template>
  <div class="vgECharts">
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
    selectedDay: String,
    selectedFloor: Number
  },
  created() {
    this.fetchData()
    this.setVGMarkLine()
    this.setVGChartScope()
  },
  updated() {
    this.fetchData()
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
          text: `第 ${this.selectedFloor} 階軸力計`
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: this.vgsPosition
        },
        grid: {
          containLabel: true
        },
        xAxis: {
          type: 'time',
          min: +moment(this.selectedDay.split('/').join('-')).startOf('day'),
          max: +moment(this.selectedDay.split('/').join('-')).endOf('day'),
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
        //   {
        //     name: 'VG-1-1',
        //     type: 'line',
        //     data: [],
        //     markLine: this.markLine
        //   },
        //   {
        //     name: 'VG-1-2',
        //     type: 'line',
        //     data: [],
        //     markLine: this.markLine
        //   },
        //   {
        //     name: 'VG-1-3',
        //     type: 'line',
        //     data: [],
        //     markLine: this.markLine
        //   },
        //   {
        //     name: 'VG-1-4',
        //     type: 'line',
        //     data: [ 
        //       [ "2019-01-30T00:00:00+00:00", 0 ],
        //       [ "2019-01-30T03:00:00+00:00", 0 ],
        //       [ "2019-01-30T06:00:00+00:00", 0 ],
        //       [ "2019-01-30T09:00:00+00:00", 0 ],
        //       [ "2019-01-30T12:00:00+00:00", 0 ],
        //       [ "2019-01-30T15:00:00+00:00", 0 ],
        //       [ "2019-01-30T18:00:00+00:00", 0 ],
        //       [ "2019-01-30T21:00:00+00:00", 0 ]],
        //     markLine: this.markLine
        //   },
        //   {
        //     name: 'VG-1-5',
        //     type: 'line',
        //     data: [
        //       ['2019-01-30T03:00:00+0800', Math.floor(Math.random() * 300) - 150],
        //       ['2019-01-30T06:42:00+0800', Math.floor(Math.random() * 300) - 150],
        //       ['2019-01-30T09:28:00+0800', Math.floor(Math.random() * 300) - 150],
        //       ['2019-01-30T12:24:00+0800', Math.floor(Math.random() * 300) - 150],
        //       ['2019-01-30T15:00:00+0800', Math.floor(Math.random() * 300) - 150],
        //       ['2019-01-30T18:00:00+0800', Math.floor(Math.random() * 300) - 150],
        //       ['2019-01-30T21:32:00+0800', Math.floor(Math.random() * 300) - 150]
        //     ],
        //     markLine: this.markLine
        //   }
        ]
      }
    }
  },
  computed: {
    vgsPosition() {
      return this.vgChartData.map(item => item = item.vgLocation)
    }
  },
  methods: {
    fetchData() {
      this.orgOptions.series = this.vgChartData.map((item, index) => ({
        name: item.vgLocation,
        type: 'line',
        data: item.data,
        markLine: this.markLine
      }))
    },
    setVGMarkLine() {
      var vg = this.project.vgManagement[this.selectedFloor]
      this.markLine.data[0].yAxis = vg.notice
      this.markLine.data[1].yAxis = -vg.notice
      this.markLine.data[2].yAxis = vg.warning
      this.markLine.data[3].yAxis = -vg.warning
      this.markLine.data[4].yAxis = vg.action
      this.markLine.data[5].yAxis = -vg.action
    },
    setVGChartScope() {
      var vg = this.project.vgManagement[this.selectedFloor]
      this.orgOptions.yAxis.max = vg.action * 1.2
      this.orgOptions.yAxis.min = -vg.action * 1.2
    }
  }
}
</script>
