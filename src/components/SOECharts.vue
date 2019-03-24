<!-- @format -->

<template>
  <div class="soECharts">
    <chart ref="chart1" :options="options" :auto-resize="true"></chart>
  </div>
</template>

<script>
export default {
  name: 'SOECharts',
  props: {
    soChartData: Array,
    project: Object
  },
  data() {
    return {}
  },
  computed: {
    soManagement() {
      return this.project.soManagement
    },
    markLine() {
      return {
        silent: true,
        data: [
          {
            lineStyle: { color: 'green' },
            name: '管理值',
            xAxis: this.soManagement.notice,
            label: { normal: { formatter: '管理值' } }
          },
          {
            lineStyle: { color: 'green' },
            name: '管理值',
            xAxis: -this.soManagement.notice,
            label: { normal: { formatter: '管理值' } }
          },
          {
            lineStyle: { color: 'blue' },
            name: '警戒值',
            xAxis: this.soManagement.warning,
            label: { normal: { formatter: '警戒值' } }
          },
          {
            lineStyle: { color: 'blue' },
            name: '警戒值',
            xAxis: -this.soManagement.warning,
            label: { normal: { formatter: '警戒值' } }
          },
          {
            lineStyle: { color: 'red' },
            name: '行動值',
            xAxis: this.soManagement.action,
            label: { normal: { formatter: '行動值' } }
          },
          {
            lineStyle: { color: 'red' },
            name: '行動值',
            xAxis: -this.soManagement.action,
            label: { normal: { formatter: '行動值' } }
          }
        ]
      }
    },
    soLegend() {
      var arr = Object.keys(this.soChartData[0])
      arr.shift()
      return arr
    },
    soData() {
      let tuningArr = new Array(3).fill(0)
      tuningArr[0] = this.soChartData[0].depth - 1
      let c = []
      c.push(tuningArr)
      this.soChartData.forEach(item => c.push(Object.values(item)))
      c.map(x => (x[0] += 1))
      c.unshift(Object.keys(this.soChartData[0]))
      return c
    },
    seriesData() {
      return this.soLegend.map(item => ({
        name: item,
        type: 'line',
        encode: {
          x: item,
          y: 'depth'
        },
        markLine: this.markLine,
        smooth: true
      }))
    },
    options() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: this.soLegend
        },
        dataset: {
          source: this.soData
          // [
          //   [ "depth", "10:00", "12:00" ],
          //   [ -5, 0, 0 ],
          //   [ -4, 0.2, 2 ],
          //   [ -3, 0.4, -3 ],
          //   [ -2, 0.5, -0.4 ],
          //   [ -1, 0.1, -0.2 ],
          //   [ 0, -0.3, -0.5 ]
          // ]
        },
        xAxis: {
          type: 'value',
          max: this.soManagement.action * 2,
          min: -this.soManagement.action * 2
        },
        yAxis: {
          type: 'value'
        },
        series: this.seriesData
        // [
        //   {
        //     name: '10:00',
        //     type: 'line',
        //     encode: {
        //       // 將 "time" 列映射到 X 軸。
        //       x: '10:00',
        //       // 將 "depth" 列映射到 Y 軸。
        //       y: 'depth'
        //     },
        //     markLine: this.markLine,
        //     smooth: true
        //   }
        // ]
      }
    }
  }
}
</script>
