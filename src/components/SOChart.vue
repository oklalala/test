<template>
  <div class="chart"><ve-line :data="soChartData"></ve-line></div>
</template>

<script>
import VeLine from "v-charts/lib/line.common"

export default {
  name: "SOChart",
  components: { VeLine },
  props: {
    soChartData: Object
  },
  mounted() {
    // this.soChartData = {
    //   columns: ["date", "PV"],
    //   rows: [
    //     { date: 4, PV: 0 },
    //     { date: -3, PV: -0.5 },
    //     { date: -4, PV: -1 },
    //     { date: 6, PV: -1.5 },
    //     { date: 4, PV: -2 },
    //     { date: 0, PV: -2.5 }
    //   ]
    // },
    this.chartSettings = {
      xAxisType: 'value',
      scale: [true, true],
    }
  },
  data() {
    return {
      // soChartData: {}
    }
  }
};
</script>
