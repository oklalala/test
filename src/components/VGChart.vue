<template>
  <div class="chart"><ve-line :data="vgChartData"></ve-line></div>
</template>

<script>
import VeLine from "v-charts/lib/line.common"

export default {
  name: "VGChart",
  components: { VeLine },
  props: {
    vgChartData: Object
  },
  data() {
    return {
      vgChartData: {
        columns: ["date", "PV"],
        rows: [
          { date: "01-01", PV: 1231 },
          { date: "01-02", PV: 1223 },
          { date: "01-03", PV: 2123 },
          { date: "01-04", PV: 4123 },
          { date: "01-05", PV: 3123 },
          { date: "01-06", PV: 7123 },
          { date: "01-07", PV: 7123 },
          { date: "01-08", PV: 7123 },
          { date: "01-09", PV: 7123 }
        ]
      }
    };
  }
};
</script>
