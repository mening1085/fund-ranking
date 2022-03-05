<template>
  <div class="home">
    <v-container>
      <v-card tile flat>
        <v-row
          class="px-0 px-sm-6 mb-3 d-flex justify-space-between align-center"
        >
          <v-col cols="auto">
            <v-row class="d-flex justify-space-between align-center" no-gutters>
              <!-- :no-gutters="$vuetify.breakpoint.xs" -->

              <v-col cols="auto">
                <Button
                  text="1D"
                  variable="1D"
                  :isActiveBtn="isActiveBtn"
                  :loadingBtn="loadingBtn"
                  :onFetchData="fetchData"
                />
              </v-col>
              <v-col cols="auto">
                <Button
                  text="1W"
                  variable="1W"
                  :isActiveBtn="isActiveBtn"
                  :loadingBtn="loadingBtn"
                  :onFetchData="fetchData"
                />
              </v-col>
              <v-col cols="auto">
                <Button
                  text="1M"
                  variable="1M"
                  :isActiveBtn="isActiveBtn"
                  :loadingBtn="loadingBtn"
                  :onFetchData="fetchData"
                />
              </v-col>
              <v-col cols="auto">
                <Button
                  text="1Y"
                  variable="1Y"
                  :isActiveBtn="isActiveBtn"
                  :loadingBtn="loadingBtn"
                  :onFetchData="fetchData"
                />
              </v-col>
            </v-row>
          </v-col>
          <!-- <v-spacer /> -->
          <v-col class="d-flex justify-center justify-sm-end">
            <v-text-field
              style="max-width: 300px"
              v-model="search"
              append-icon="mdi-magnify"
              label="ค้นหา"
              single-line
              hide-details
              color="var(--color-secondary)"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider />

        <v-data-table
          single-expand
          show-expand
          item-key="mstar_id"
          :headers="headers"
          :items="desserts"
          :search="search"
          :loading="loadingTable"
          loading-text="กำลังโหลดข้อมูล"
        >
          <v-progress-linear
            v-show="loadingTable"
            slot="progress"
            color="var(--color-primary)"
            indeterminate
          ></v-progress-linear>
          <template v-slot:item.nav_date="{ item }">
            <span>{{ item.nav_date | moment("DD/MM/YYYY") }}</span>
          </template>
          <template v-slot:item.nav_return="{ item }">
            <span :class="item.nav_return >= 0 ? 'color_plus' : 'color__minus'">
              {{ item.nav_return }}%
            </span>
          </template>
          <template v-slot:item.avg_return="{ item }">
            <span :class="item.avg_return >= 0 ? 'color_plus' : 'color__minus'">
              <span v-if="item.avg_return >= 0">+</span>{{ item.avg_return }}%
            </span>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="px-12 py-6">
              <div
                class="font-16 font-weight-bold mb-2"
                style="border-bottom: 2px solid var(--color-fr)"
              >
                {{ item.thailand_fund_code }}
              </div>
              <div>
                <span class="font-weight-bold">ราคา:</span> {{ item.nav }} บาท
              </div>
              <div>
                <span class="font-weight-bold"> ผลตอบแทน:</span>
                {{ item.nav_return }}( {{ item.avg_return }}%)
              </div>
              <div>
                <span class="font-weight-bold">อัพเดทล่าสุด:</span>
                {{ item.nav_date | moment("DD/MM/YYYY") }}
              </div>
              <p class="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
                reiciendis, asperiores tenetur quod maiores nulla consequuntur
                impedit harum nobis, ipsam fugiat nisi sequi aliquam omnis
                exercitationem possimus iste, in voluptates.
                <a @click="onClickSeeMore" style="color: var(--color-fr)">
                  see more
                </a>
              </p>
            </td>
          </template>
        </v-data-table>
      </v-card>

      <!--  Mixed Chart -->
      <v-card
        tile
        flat
        class="pa-3 pa-sm-6 mt-12"
        v-if="desserts.length > 0 && isShowChart"
      >
        <div class="font-20 mb-3 font-weight-bold txt__secondary text-center">
          10 อันดับ "ผลตอบแทนและค่าเฉลี่ยผลตอบแทน" ดีที่สุดในช่วง
          {{ checkText(isActiveBtn) }}
        </div>
        <apexchart
          type="line"
          width="100%"
          :height="$vuetify.breakpoint.xs ? '400' : '500'"
          :options="chartOptionsMixed"
          :series="seriesMixed"
        ></apexchart>
      </v-card>

      <!--  Bar Chart & Area Chart -->
      <v-row class="mt-8" v-if="desserts.length > 0 && isShowChart">
        <v-col cols="12" sm="12" md="6" class="mb-6">
          <v-card flat tile class="pa-3 pa-sm-6">
            <div
              class="font-20 mb-3 font-weight-bold txt__secondary text-center"
            >
              10 อันดับผลตอบแทนดีที่สุดในช่วง {{ checkText(isActiveBtn) }}
            </div>
            <apexchart
              width="100%"
              :height="$vuetify.breakpoint.xs ? '400' : '500'"
              type="bar"
              :options="options"
              :series="topTenPerformance"
            ></apexchart>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" class="mb-6">
          <v-card flat tile class="pa-3 pa-sm-6">
            <div
              class="font-20 mb-3 font-weight-bold txt__secondary text-center"
            >
              10 อันดับค่าเฉลี่ยผลตอบแทนดีที่สุดในช่วง
              {{ checkText(isActiveBtn) }}
            </div>
            <apexchart
              width="100%"
              :height="$vuetify.breakpoint.xs ? '400' : '500'"
              type="area"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Button from "../components/Button.vue";
export default {
  name: "HomeView",
  components: { Button },
  data() {
    return {
      isShowChart: true,
      loadingTable: false,
      expanded: [],
      loadingBtn: false,
      isActiveBtn: "1D",
      search: "",
      headers: [
        { text: "ชื่อกองทุน", value: "thailand_fund_code", width: "25%" },
        { text: "ราคา", value: "nav", width: "15%" },
        { text: "ผลตอบแทน", value: "nav_return", width: "15%" },
        { text: "ผลตอบแทนเฉลี่ย", value: "avg_return", width: "20%" },
        { text: "อัพเดทล่าสุด", value: "nav_date", width: "20%" },
      ],
      desserts: [],

      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                fixedStepSize: 1,
              },
            },
          ],
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        colors: ["#F7A500"],
        xaxis: {
          categories: [],
        },
        yaxis: {
          logBase: 1,
          tickAmount: 1,
          labels: {
            formatter: (value) => {
              return value;
            },
          },
          crosshairs: {
            show: true,
            position: "back",
            stroke: {
              color: "#b6b6b6",
              width: 1,
              dashArray: 0,
            },
          },
          tooltip: {
            enabled: true,
            offsetX: 0,
          },
        },
        dataLabels: {
          enabled: false,
        },
      },

      topTenPerformance: [
        {
          name: "ผลตอบแทน",
          data: [],
        },
      ],

      series: [
        {
          name: "ค่าเฉลี่ยผลตอบแทน",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fixedStepSize: 1,
              },
            },
          ],
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
        stroke: {
          width: 2,
          curve: "straight",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          logBase: 1,
          tickAmount: 3,
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#18C161"],
      },

      seriesMixed: [
        {
          name: "ผลตอบแทน",
          type: "column",
          data: [],
        },
        {
          name: "ค่าเฉลี่ยผลตอบแทน",
          type: "line",
          data: [],
        },
      ],
      chartOptionsMixed: {
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: [0, 4],
        },
        colors: ["#18C161", "#F7A500"],
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          logBase: 1,
          tickAmount: 1,
          labels: {
            formatter: (value) => {
              return value;
            },
          },
          crosshairs: {
            show: true,
            position: "back",
            stroke: {
              color: "#b6b6b6",
              width: 1,
              dashArray: 0,
            },
          },
          tooltip: {
            enabled: true,
            offsetX: 0,
          },
        },
      },
    };
  },

  mounted() {
    this.fetchData("1Y");
  },

  methods: {
    async fetchData(slug) {
      // Clear data
      this.options.xaxis.categories = [];
      this.topTenPerformance[0].data = [];
      this.seriesMixed[0].data = [];
      this.seriesMixed[1].data = [];
      this.desserts = [];
      this.series[0].data = [];

      // action something
      this.loadingTable = true;
      this.loadingBtn = true;
      this.isShowChart = false;
      this.isActiveBtn = slug;

      const URL = `${window.location.origin}/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-${slug}.json`;
      // Fecth Data from API
      axios.get(URL).then((response) => {
        setTimeout(() => {
          const { data } = response.data;
          this.desserts = data;

          // set data chart
          const arr_slice = data.slice(0, 10);
          arr_slice.forEach((element) => {
            this.options.xaxis.categories.push(element.thailand_fund_code);
            this.chartOptionsMixed.xaxis.categories.push(
              element.thailand_fund_code
            );
            this.chartOptions.xaxis.categories.push(element.thailand_fund_code);
            this.topTenPerformance[0].data.push(element.nav_return);
            let avg_return = element.avg_return + "%";
            this.series[0].data.push(avg_return);
            this.seriesMixed[0].data.push(element.nav_return);
            this.seriesMixed[1].data.push(avg_return);
          });

          this.loadingTable = false;
          this.loadingBtn = false;
          this.isShowChart = true;
        }, 500);
      });
    },

    onClickSeeMore() {
      this.$swal({
        icon: "warning",
        title: "Coming Soon",
        confirmButtonColor: "var(--color-fr)",
      });
    },

    checkText(txt) {
      switch (txt) {
        case "1D":
          return "1 วัน";
        case "1W":
          return "1 สัปดาห์";
        case "1M":
          return "1 เดือน";
        case "1Y":
          return "1 ปี";
        default:
          return "";
      }
    },
  },
};
</script>
<style lang="scss">
.v-data-table
  > .v-data-table__wrapper
  tbody
  tr.v-data-table__expanded__content {
  box-shadow: unset !important;
}
.color_plus {
  color: var(--color-success);
}
.color__minus {
  color: var(--color-danger);
}
</style>
