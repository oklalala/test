<template>
  <div class="hello">
    <!-- <div id="myChart" :style="{width: '300px', height: '300px'}"></div> -->
    <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'VGECharts',
  props: {
    vgChartData: Array,
    project: Object
  },
  data() {
    return {
      orgOptions: {},
      testData: [
        ['2019-01-30T00:00:00+8000', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T03:00:00+8000', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T10:42:00+8000', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T11:21:00+8000', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T12:24:00+8000', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T15:00:00+8000', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T18:00:00+8000', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T21:32:00+8000', Math.floor(Math.random() * 300) - 150],
        ['2019-01-30T23:59:00+8000', Math.floor(Math.random() * 300) - 150]
      ],
      markLine: {
        silent: true,
        data: [
          {
            label: { formatter: '行動值', position: 'start' },
            lineStyle: {
              color: 'red'
            },
            yAxis: -150
          },
          {
            label: { formatter: '警戒值', position: 'start' },
            lineStyle: {
              color: 'blue'
            },
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
            lineStyle: {
              color: 'blue'
            },
            yAxis: 100
          },
          {
            label: { formatter: '行動值', position: 'start' },
            lineStyle: {
              color: 'red'
            },
            yAxis: 150
          }
        ]
      }
    }
  },
  mounted() {
    this.orgOptions = {
      title: {
        text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis',
        // Label: {
        //   formatter(value) {
        //     // 輸入的時間 與 v-charts 軸上的時間有落差
        //     return moment(value)
        //       .format('HH:mm')
        //   }
        // }
      },
      legend: {
        data: ['VG-1-1', 'VG-1-2', 'VG-1-3', 'VG-1-4', 'VG-1-5']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'time',
        axisLabel: {
          formatter(value) {
            // 輸入的時間 與 v-charts 軸上的時間有落差
            return moment(value)
              // .subtract(8, 'h')
              .format('HH:mm')
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
          data: [
            ['2019-01-30T00:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T03:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T10:42:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T11:21:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T12:24:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T15:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T18:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T21:32:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T23:59:00+8000', Math.floor(Math.random() * 300) - 150]
          ],
          markLine: this.markLine
        },
        {
          name: 'VG-1-2',
          type: 'line',
          data: [
            ['2019-01-30T00:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T03:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T10:42:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T11:21:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T12:24:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T15:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T18:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T21:32:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T23:59:00+8000', Math.floor(Math.random() * 300) - 150]
          ],
          markLine: this.markLine
        },
        {
          name: 'VG-1-3',
          type: 'line',
          data: [
            ['2019-01-30T00:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T03:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T10:42:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T11:21:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T12:24:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T15:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T18:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T21:32:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T23:59:00+8000', Math.floor(Math.random() * 300) - 150]
          ],
          markLine: this.markLine
        },
        {
          name: 'VG-1-4',
          type: 'line',
          data: [
            ['2019-01-30T00:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T03:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T10:42:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T11:21:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T12:24:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T15:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T18:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T21:32:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T23:59:00+8000', Math.floor(Math.random() * 300) - 150]
          ],
          markLine: this.markLine
        },
        {
          name: 'VG-1-5',
          type: 'line',
          data: [
            ['2019-01-30T00:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T03:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T10:42:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T11:21:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T12:24:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T15:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T18:00:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T21:32:00+8000', Math.floor(Math.random() * 300) - 150],
            ['2019-01-30T23:59:00+8000', Math.floor(Math.random() * 300) - 150]
          ],
          markLine: this.markLine
        }
      ]
    }
  }
}
</script>
