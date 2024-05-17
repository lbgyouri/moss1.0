<template>
  <div class="foot">
    <div class="footLeft">
      <div class="footLeftItem">
        <div class="flName">年发电量 (万kWh)</div>
        <div class="flNum">{{ summaryData.powerGen ? (summaryData.powerGen.year) : 0 | toWKWh }}</div>
      </div>
      <div class="footLeftItem">
        <div class="flName">月发电量 (万kWh)</div>
        <div class="flNum">{{ summaryData.powerGen ? (summaryData.powerGen.month) : 0 | toWKWh }}</div>
      </div>
      <div class="footLeftItem">
        <div class="flName">日发电量 (万kWh)</div>
        <div class="flNum">{{ summaryData.powerGen ? (summaryData.powerGen.today) : 0 | toWKWh }}</div>
      </div>
      <div class="footLeftItem">
        <div class="flName">实时功率 (MW)</div>
        <div class="flNum">{{ summaryData.activePower }}</div>
      </div>
      <div class="footLeftItem">
        <div class="flName">平均风速 (m/s)</div>
        <div class="flNum">{{ summaryData.avgWindSpeed }}</div>
      </div>
      <div class="footLeftItem">
        <div class="flName">平均辐照 (W/m²)</div>
        <div class="flNum">{{ summaryData.avgRadiation }}</div>
      </div>

    </div>
    <div class="footRight">
      <div class="footRightItem">
        <div class="frName">装机台数</div>
        <div class="frNum" style="color: #5aa4ff;">{{ summaryData.count ? summaryData.count.total : 0 }}</div>
      </div>
      <div class="footRightItem">
        <div class="frName">运行台数</div>
        <div class="frNum" style="color: #32ff84;">{{ summaryData.count ? summaryData.count.running +
          summaryData.count.limit : 0 }}</div>
      </div>
      <div class="footRightItem">
        <div class="frName">待机台数</div>
        <div class="frNum" style="color: #9afec7;">{{ summaryData.count ? summaryData.count.userShutdown +
          summaryData.count.techStandby + summaryData.count.envStandby : 0 }}</div>
      </div>
      <div class="footRightItem">
        <div class="frName">维护台数</div>
        <div class="frNum" style="color: #ffc955;">{{ summaryData.count ? summaryData.count.maint : 0 }}</div>
      </div>
      <div class="footRightItem">
        <div class="frName">故障台数</div>
        <div class="frNum" style="color: #e92c31;">{{ summaryData.count ? summaryData.count.faultShutdown +
          summaryData.count.netFault : 0 }}</div>
      </div>
      <div class="footRightItem">
        <div class="frName">离线台数</div>
        <div class="frNum" style="color: #9c9c9c;">{{ summaryData.count ? summaryData.count.unknown +
          summaryData.count.disconn : 0 }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  filters: {
    toWKWh: function (value) {
      if (value instanceof Array) {
        for (var i = 0; i < value.length; i++) {
          value[i] = parseFloat((value[i] / 10).toFixed(2));
        }
      } else {
        value = parseFloat((value / 10).toFixed(2));
      }
      return value || 0;
    }
  },
  props: {
    summaryData: {
      type: Object,
      default: () => ({})
    }
  }
}

</script>

<style scoped>
.foot {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 140px;
  margin-top: 20px;
}

.foot .footLeft {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px 0 25px;
  box-sizing: border-box;
  width: 1320px;
  border-radius: 10px 0 0 10px;
  background-color: #19203b;
}

.foot .footLeft .footLeftItem {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  flex: 1;
  height: 60%;
}

.footLeftItem .flName {
  font-size: 18px;
  color: #989db6;
}

.footLeftItem .flNum {
  font-size: 30px;
  color: #fff;
}

.foot .footRight {
  width: 560px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 0 10px 10px 0;
  background-color: #222b4f;
}

.foot .footRight .footRightItem {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  height: 35%;
  flex: calc(100%/3);
}

.footRightItem .frName {
  font-size: 18px;
  color: #989db6;
}

.footRightItem .frNum {
  font-size: 20px;
  color: #fff;
}
</style>