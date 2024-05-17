<template>
  <div class="timeData">
    <PlantTitle2 :summaryData="summaryData"> </PlantTitle2>
    <div class="infoList">
      <div class="titlelist">
        <div class="titleItem" style="width: 120px;">设备</div>
        <div class="titleItem" style="width: 100px;">型号</div>
        <div class="titleItem" style="width: 100px;">状态</div>
        <template v-for="item in TurbineInfosData.columns">
          <div class="titleItem">
            <div class="titlename">
              {{ item.text }}
            </div>
            <div class="titleDw">( {{ item.unit }} )</div>
          </div>
        </template>
      </div>


      <div class="list" style="display: flex;">
        <div class="lll">
          <template v-for="item in TurbineInfosData.data">
            <div class="listitems">
              <div class="listitem" style="width: 120px;">{{ item.name }}</div>
              <div class="listitem" style="width: 100px;">{{ item.model }}</div>
              <div class="listitem" style="width: 100px;">{{ item.status | getStatusName }}</div>
            </div>
          </template>
        </div>

        <div class="rrr">
          <template v-for=" item in TurbineInfosData.data">
            <div class="listitems" style="display: flex;">
              <template v-for="item2 in TurbineInfosData.columns">
                <div class="listitem">{{ item[item2.name] }}</div>
              </template>
            </div>
          </template>
        </div>


      </div>
    </div>
  </div>
</template>
<script>
import { GetSummary, GetTurbineInfos } from '@/service/index'
import PlantTitle2 from '@/components/matrixcpn/plantTitle2.vue'
export default {
  components: {
    PlantTitle2
  },
  data() {
    return {
      summaryData: {},
      TurbineInfosData: [],
      getparams: { level: 'plant', id: 300001 }
    }
  },
  filters:{
    getStatusName: function (key) {
      let _statusMap = {
        running: '正常发电',
        limit: '限功率',
        userShutdown: '用户停机',
        faultShutdown: '故障停机',
        maint: '维护',
        netFault: '电网故障',
        techStandby: '技术待机',
        envStandby: '环境待机',
        unknown: '未知状态',
        disconn: '连接中断'
      }
      return _statusMap[key] || '未知状态'
    }
  },
  created() {
    this.SummarAction()
    this.TurbineInfosAction()
  },
  methods: {
    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },
    scroll() {
      const scrollTop = Event.target.scrollTop
      const leftcon = this.$refs.contentRef
      leftcon.scrollTop = scrollTop
    },
    async SummarAction() {
      console.log(this.titlename, 'nameshow')
      const res = await GetSummary(this.getparams)
      const result = this.parseCallBack(res.data)
      this.summaryData = {}
      this.summaryData = result
    },
    async TurbineInfosAction() {
      const res = await GetTurbineInfos(300001)
      const result = this.parseCallBack(res.data)
      this.TurbineInfosData = result
      console.log(result, 'TurbineInfosData')
    }
  }
}
</script>

<style scoped>
.timeData {
  display: flex;
  flex-direction: column;
  height: 750px;
  width: 100%;
  margin-top: 5px;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #222b4f;
  border-radius: 0 0 10px 10px;
}

.infoList {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
}
.titlelist{
  display: flex;
  align-items: center;
  color: #f5f5f6;
  width: 100%;
  height: 50px;
  font-size: 15px;
  background-color:#31415b ;
}
.titleItem{
  text-align: center;
}
.list{
  display: flex;
  /* flex: 1; */
  height: 535px;
  overflow-x: hidden;
  overflow-y: scroll;

}
.lll,.rrr{
  display: flex;
  flex-direction: column;
}
.listitems{
  display: flex;
  padding: 8px 0;
  color: #f5f5f6;
}
.listitems:nth-child(2n){
  background-color:#2f3d59;
}
.listitem{
  text-align: center;
  font-size: 15px;
}
.listitem:nth-child(1),.titleItem:nth-child(4){
  width: 107px;
}
.listitem:nth-child(2),.titleItem:nth-child(5){
  width: 107px;
}
.listitem:nth-child(3),.titleItem:nth-child(6){
  width: 107px;

}
.listitem:nth-child(4),.titleItem:nth-child(7){
  width: 107px;

}
.listitem:nth-child(5),.titleItem:nth-child(8){
  width: 107px;

}
.listitem:nth-child(6),.titleItem:nth-child(9){
  width: 107px;

}
.listitem:nth-child(7),.titleItem:nth-child(10){
  width: 107px;

}
.listitem:nth-child(8),.titleItem:nth-child(11){
  width: 107px;

}
.listitem:nth-child(9),.titleItem:nth-child(12){
  width: 107px;

}

.listitem:nth-child(10),.titleItem:nth-child(13){
  width: 100px;

}
.listitem:nth-child(11),.titleItem:nth-child(14){
  width: 100px;

}
.listitem:nth-child(12),.titleItem:nth-child(15){
  width: 180px;

}
.listitem:nth-child(13),.titleItem:nth-child(16){
  width: 180px;
}
/* 定义滚动条的样式 */
::-webkit-scrollbar {
  width: 7px;
}

/* 定义滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  width: 7px;
  background-color: #1663af; /* 设置滑块的背景颜色 */
  border-radius: 4px; /* 设置滑块的圆角 */
}

/* 定义滚动条滑道的样式 */
::-webkit-scrollbar-track {
  width: 7px;
  border-radius: 4px;
  background-color:#989db6; /* 设置滑道的背景颜色 */
}

</style>