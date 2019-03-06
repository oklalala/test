<template>
  <div class="soECharts">
    <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
  </div>
</template>

<script>
export default {
  name: 'SOECharts',
  data() {
    return {
      orgOptions: {},
      testData: [
        ['2019-01-30T00:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T03:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T10:42:00.000Z', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T11:21:00.000Z', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T12:24:00.000Z', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T15:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T18:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T21:32:00.000Z', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T23:59:00.000Z', Math.floor(Math.random() * 300) - 150]
      ],

      markLine: {
        silent: true,
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
      }
    }
  },
  mounted() {
    this.orgOptions = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['10:00', '12:00']
      },
      grid: {
        left: '3%',
        right: '4%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      dataset: {
        source: [
          { depth: -5, '10:00': 0, '12:00': 0 },
          { depth: -4, '10:00': 0.2, '12:00': 2 },
          { depth: -3, '10:00': 0.4, '12:00': -3 },
          { depth: -2, '10:00': 0.5, '12:00': -0.4 },
          { depth: -1, '10:00': 0.1, '12:00': -0.2 },
          { depth: 0, '10:00': -0.3, '12:00': -0.5 }
        ]
      },
      xAxis: {
        type: 'value',
        max: 15 * 2,
        min: -15 * 2
      },
      yAxis: {
        type: 'category'
      },
      series: [
        {
          name: '10:00',
          type: 'line',
          encode: {
            // 将 "amount" 列映射到 X 轴。
            x: '10:00',
            // 将 "product" 列映射到 Y 轴。
            y: 'depth'
          },
          markLine: this.markLine,
          smooth: true
        },
        {
          name: '12:00',
          type: 'line',
          encode: {
            x: '12:00',
            y: 'depth'
          },
          markLine: this.markLine,
          smooth: true
        }
      ]
    }
  }
}
</script>
