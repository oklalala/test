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
  created() {
    this.fetchData()
    
    console.warn(this.vgChartData, 'created')
  },
  mounted() {
    
    // this.$nextTick(function () {
    //     console.warn('hahahahahahahahahahahah')
    //     // Code that will run only after the
      // this.fetchData()
        
    //     // entire view has been rendered
    //   })
    
    console.warn(this.vgChartData,'mounted')
    // setTimeout(() => {
      
    // }, 1000);
  },
  updated() {
    this.fetchData()
    console.warn(this.vgChartData,'updated')
  },
  destroyed() {
    console.warn(this.vgChartData,'destroyed')
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
          // data: this.vgsPosition
          data:['VG-1-1','VG-1-2','VG-1-3','VG-1-4','VG-1-5']
        },
        grid: {
          containLabel: true
        },
        xAxis: {
          type: 'time',
          // min: +moment(this.selectedDay.split('/').join('-')).startOf('day'),
          // max: +moment(this.selectedDay.split('/').join('-')).endOf('day'),
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
  // computed: {
  //   // vgsPosition() {
  //   //   return this.vgChartData.map(x => x = x.vgLocation)
  //   // }
  // },
  // watch: {
  //   vgChartData (value) {
  //     console.log('watch', value)
  //     this.orgOptions.series = value.map((item, index) => ({
  //       name: item.vgLocation,
  //       type: 'line',
  //       data: item.data,
  //       markLine: this.markLine
  //     }))

  //   }
  // },
  methods: {
    fetchData() {
  //     debugger
      console.log(this.vgChartData)
      this.orgOptions.series = this.vgChartData.map((item, index) => ({
        name: item.vgLocation,
        type: 'line',
        data: item.data,
        markLine: this.markLine
      }))
      console.log('>>>>>>>', this.orgOptions.series)
    }
  }
}
</script>
