<template>
  <div class="itemTitle">
    <div class="titleName">大庆海智</div>
    <div class="titleTabs">
      <div class="tab">
        <div class="tabName">年发电量</div>
        <div class="titleNum">
          <span style="color: #fff;"> {{ summaryData.powerGen ? (summaryData.powerGen.year) : 0 }}
          </span>万kWh
        </div>
      </div>
      <div class="tab">
        <div class="tabName">月发电量</div>
        <div class="titleNum">
          <span style="color: #fff;">{{ summaryData.powerGen ? (summaryData.powerGen.month) : 0 }}
          </span>万kWh
        </div>
      </div>
      <div class="tab">
        <div class="tabName">日发电量</div>
        <div class="titleNum">
          <span style="color: #fff;"> {{ summaryData.powerGen ? (summaryData.powerGen.today) : 0 }}
          </span>万kWh
        </div>
      </div>
      <div class="tab">
        <div class="tabName">平均风速</div>
        <div class="titleNum">
          <span style="color: #fff;">{{ summaryData.avgWindSpeed ? summaryData.avgWindSpeed : 0 }}
          </span>m/s
        </div>
      </div>
      <div class="tab">
        <div class="tabName">负荷率</div>
        <div class="titleNum">
          <span style="color: #fff;">{{ (summaryData.activePower ? (summaryData.activePower / summaryData.capacity * 100)
            : 0).toFixed(2)}}
          </span>%
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GetSummary } from '@/service/index'
export default {


  data() {
    return {
      getparams: { level: 'plant', id: 300001 },
      timer: null,
      summaryData: {}
    }

  },
 created(){
  this.SummarAction()
  if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        setTimeout(() => {
          this.SummarAction()
        }, 0)
      }, 3000)
    }
 },

  methods: {

    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },
    async SummarAction() {
      const res = await GetSummary(this.getparams)
      const result = this.parseCallBack(res.data)
      this.summaryData = {}
      this.summaryData = result
      console.log('title2')
    },
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器，避免内存泄漏
    clearInterval(this.timer);
  },
}
</script>

<style scoped>
.itemTitle {
  display: flex;
  height: 40px;
  margin-top: 5px;
  font-size: 22px;
  padding-left: 15px;
  box-sizing: border-box;
  align-items: center;
  color: #fff;
  background-color: #14192f;
}



.itemTitle .titleName,
.itemTitle2 .titleName {
  width: 120px;
  letter-spacing: 1px;
  cursor: pointer;
}

.titleTabs {
  display: flex;
  font-size: 20px;
  color: #989db6;
  margin-left: 80px;
}

.titleTabs2 {
  display: flex;
  font-size: 18px;
  color: #989db6;

}

.tab {
  display: flex;
  /* padding: 0 20px; */
  margin: 0 25px;

}

.tab .titleNum {
  margin-left: 12px;
}
</style>