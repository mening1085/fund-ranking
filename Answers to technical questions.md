# Technical questions

## ใช้เวลาทำแบบทดสอบไปเท่าไร ถ้ามีเวลามากกว่านี้จะทำอะไรเพิ่ม ถ้าใช้เวลาน้อยในการทำโจทย์สามารถใช้โอกาสนี้ในการอธิบายได้ว่าอยากเพิ่มอะไร หรือแก้ไขในส่วนไหน

ใช้เวลาทำแบบทดสอบไป 1 วันหน่อยๆ สิ่งที่อยากเพิ่มคือ

- หน้าดูรายละเอียดกองทุน
- เพิ่ม Api อีกตัวเพื่อยิงไป get รายละเอียดต่างๆของแต่ละกองทุนนั้นๆมาเช่น ค่าธรรมเนียมขาย, ค่าใช้จ่ายกองทุนรวม, ลงทุนครั้งแรกขั้นต่ำ,วันที่จดทะเบียนกองทุน หรือรวมถึงมูลค่าทรัพย์สินสุทธิของกองทุน เพื่อนำมาแสดงในหน้ารายละเอียดต่างๆของกองทุน
- เพิ่ม Api get ข้อมูลราคาแต่ละช่วงเวลาของกองทุนนั้นๆที่เลือกมาเพื่อนำมาแสดงเป็นกราฟให้ผู้ใช้งานเห็นภาพรวมราคาแต่ละช่วงเวลาต่างๆ
- เพิ่มส่วนของ Article ต่างๆ หรือ Article ที่เกี่ยวข้องกับกองทุนนั้นๆ(กรณีมีหน้าแสดงรายละเอียดของกองทุนให้เอา Article มาแสดงในหน้ารายละเอียดด้วย) เข้ามาเพื่อให้เว็บไซต์ดูมีความน่าสนใจเพิ่มมากขึ้น และเพื่อเป็นประโยชน์ต่อผู้ใช้งานเอง ที่จะได้ติดตามข่าวสารกองทุนต่างๆได้ รวมถึงกองทุนในหมวดหมู่เดียวกัน

## อะไรคือ feature ที่นำเข้ามาใช้ในการพัฒนา application นี้ กรุณาแนบ code snippet มาด้วยว่าใช้อย่างไร ในส่วนไหน

### **1. Data Table ของ Vuetify ที่สามารถ Search, Sort, Loading เข้ามาใช้งาน รวมถึงมี pagination มาให้ด้วย** [ดูเพิ่มเติมได้ที่นี่](https://vuetifyjs.com/en/components/data-tables/)

- การเรียกใช้งาน Data Table

```vue
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
      <div class="font-16 font-weight-bold mb-2">
        {{ item.thailand_fund_code }}
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
        reiciendis, asperiores tenetur quod maiores nulla consequuntur
        impedit harum nobis, ipsam fugiat nisi sequi aliquam omnis
        exercitationem possimus iste, in voluptates.
        <a
          @click="onClickSeeMore"
          style="color: var(--color-finnomena)"
        >
          see more
        </a>
      </p>
    </td>
  </template>
</v-data-table>
```

- การ Set Header ให้กับ Table

```js
 headers: [
   { text: "ชื่อกองทุน", value: "thailand_fund_code", width: "25%" },
   { text: "ราคา", value: "nav", width: "15%" },
   { text: "ผลตอบแทน", value: "nav_return", width: "15%" },
   { text: "ผลตอบแทนเฉลี่ย", value: "avg_return", width: "20%" },
   { text: "อัพเดทล่าสุด", value: "nav_date", width: "20%" },
 ],
 desserts: [],
```

- การ Set Data ให้กับ Table

```js
async fetchData(slug) {
  const URL = `${window.location.origin}/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-${slug}.json`;
  // Fecth Data from API
  axios.get(URL).then((response) => {
    setTimeout(() => {
      const { data } = response.data;
      this.desserts = data;
    }, 500);
  });
},
```

### **2. APEXCHARTS เป็นเครื่องมือในการสร้างกราฟแผนภูมิต่าง ๆ ด้วย JavaScript โดยมี FEATURES หลักๆ คือ Responsive, Interactive, Dynamic, Smooth Animations** [ดูเพิ่มเติมได้ที่นี่](https://apexcharts.com/features/)

- การเรียกใช้งานกราฟในส่วน template

```vue
<apexchart
  width="100%"
  :height="$vuetify.breakpoint.xs ? '400' : '550'"
  type="bar"
  :options="options"
  :series="topTenPerformance"
></apexchart>
```

- การกำหนด Option ต่างๆของกราฟ และตัวแปรตั้งต้น(topTenPerformance)ของ data ในส่วนของ Javascript

```js
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
    stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
    },
    colors: ["#F7A500", "#DA1617"],
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
}
topTenPerformance: [
    {
        name: "ผลตอบแทน",
        data: [],
    },
    {
        name: "ค่าเฉลี่ยผลตอบแทน",
        data: [],
    },
],
```

- Get ข้อมูลมาจาก Api จำนวน 10 ตัวแรก และนำมา set ให้กับตัวแปร topTenPerformance แต่ละตัว และ options.xaxis.categories เพื่อมาแสดงในกราฟ

  - topTenPerformance[0] = ก้อนข้อมูลของกราฟ "ผลตอบแทน"

  - topTenPerformance[1] = ก้อนข้อมูลของกราฟ "ค่าเฉลี่ยผลตอบแทน"

  - options.xaxis.categories คือ labels ในแกน X (ชื่อกองทุน)

```js
axios.get(URL).then((response) => {
  setTimeout(() => {
    const { data } = response.data;
    this.desserts = data;

    // set data chart
    const arr_slice = data.slice(0, 10);
    arr_slice.forEach((element) => {
      this.options.xaxis.categories.push(element.thailand_fund_code);
      this.topTenPerformance[0].data.push(element.nav_return);
      let avg_return = element.avg_return + "%";
      this.topTenPerformance[1].data.push(avg_return);
    });

    this.loadingTable = false;
    this.loadingBtn = false;
    this.isShowChart = true;
  }, 500);
});
```

## เราจะสามารถติดตาม performance issue บน production ได้อย่างไร เคยมีประสบการณ์ด้านนี้ไหม

ยังไม่เคยมีประสบการณ์ทางด้านนี้ครับ แต่พร้อมที่จะเรียนรู้ครับ

## อยากปรับปรุง FINNOMENA APIs ที่ใช้ในการพัฒนา ในส่วนไหนให้ดียิ่งขึ้น

1. อยากให้มีการส่งรายละเอียดของกองทุนมาด้วย เป็นแบบรายละเอียดย่อๆก่อนก็ได้ เพื่อให้ผู้ใช้งานได้รู้ว่ากองทุนแต่ละกองทุนนั้นเกี่ยวกับอะไร เพราะบางคนที่เข้ามาชมก็อาจไม่มีความรู้เรื่องกองทุนเหล่านั้น
2. อยากให้มี API อีกตัว เพื่อที่เอาไว้สำหรับดึงข้อมูลของกองทุนนั้นๆมาแสดงในหน้าที่จะสร้างเพิ่มเติม เพื่อให้ผู้ใช้ได้ศึกษาเกี่ยวกับกองทุนนั้นๆ ที่ผู้ใช้สนใจ
3. อยากให้มี API ที่ดึงข้อมูลราคาในแต่ละช่วงเวลาของแต่ละกองทุนนั้นๆ เพื่อที่จะให้ผู้ใช้งานได้รู้ราคาของกองทุนแต่ละช่วงเวลาได้
4. อยากให้มี API ที่เกี่ยวกับบทความข่าวสารต่างๆเกี่ยวกับกองทุน หรือการลงทุนต่างๆ เพื่อที่จะทำให้เว็บไซต์ดูมีความหน้าสนใจมากยิ่งขึ้น อีกทั้งผู้ใช้งานก็จะได้รับรู้ข่าวสารต่างๆที่เกี่ยวกับกองทุน หรือการลงทุนอีกด้วย

> \*ใน Task requirements ที่บอกว่า "ต้องมี test มาด้วย" ข้อนี้ผมไม่เข้าใจว่าหมายถึงอะไรครับ ไม่รู้ว่าจะให้บอกวิธีการทดสอบ web application หรือให้เขียน Unit Test ครับ ถ้าเป็น Unit Test ยังไม่เคยเขียนครับ ขอโทษด้วยครับ
