<template>
  <div :class="level == 'item' ? 'itemTitle2' : 'itemTitle'">
    <div class="titleName" @click="goalltype(id, level)">{{ titlename }}</div>
    <div :class="level == 'item' ? 'titleTabs2' : 'titleTabs'">
      <div class="tab">
        <div class="tabName">装机台数</div>
        <div class="titleNum">
          <span style="color: #fff;">{{ summaryData.count ? summaryData.count.total : 0 }}
          </span>台
        </div>
      </div>
      <div class="tab">
        <div class="tabName">装机容量</div>
        <div class="titleNum">
          <span style="color: #fff;">{{ summaryData.capacity || 0 }}
          </span>MW
        </div>
      </div>
      <div class="tab">
        <div class="tabName">实时功率</div>
        <div class="titleNum">
          <span style="color: #fff;">{{ summaryData.activePower || 0 }}
          </span>MW
        </div>
      </div>
      <div class="tab">
        <div class="tabName">平均风速</div>
        <div class="titleNum">
          <span style="color: #fff;">{{ summaryData.avgWindSpeed || 0 }}
          </span>m/s
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GetSummary } from '@/service/index'
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    level: {
      type: String,
      default: ''
    },
    titlename: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      summaryData: {},
      getparams: { level: 'plant', id: 30000 },
      timer:null,
    }

  },
mounted() {
  this.SummarAction()
  if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        setTimeout(() => {
          this.SummarAction()
        }, 0)
        // console.log("刷新");
      }, 3000)
    }

  },

  methods: {
    goalltype(id, level) {
        this.$router.push({ name: 'plantdetail', params: { id, level } })
        console.log(id, 'iiiiiiiii')
 
    },
    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },
    async SummarAction() {
      console.log(this.titlename, 'nameshow')
      this.getparams.level = this.level
      this.getparams.id = this.id
      const res = await GetSummary(this.getparams)
      const result = this.parseCallBack(res.data)
      this.summaryData = {}
      this.summaryData = result
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
  background-color: #222b4f;
}

.itemTitle2 {
  display: flex;
  height: 30px;
  margin-top: 8px;
  font-size: 18px;
  padding-left: 15px;
  box-sizing: border-box;
  align-items: center;
  color: #fff;
  background-color: #222b4f;
}

.itemTitle .titleName,.itemTitle2 .titleName {
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