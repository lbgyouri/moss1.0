<template>
  <div class="matrix">
    <div class="main">
      <div class="allChangzhan">
        <div class="Date">{{ today }}</div>
        <div class="changZhanTitle" @click="menuParent('全部')">
          全部场站
        </div>
        <div class="allOptions">
          <a-menu mode="inline" style="color: #fff;">
            <a-sub-menu key="sub1">
              <span slot="title"><span class="optionTitle" @click="menuParent(plantList)">{{ plantList.name
                  }}</span></span>
              <template v-for="(item, index) in plantList.items">
                <a-menu-item class="menuoption" style=" padding-left: 70px;" @click="menuItem(item)">
                  {{ item.name }}
                </a-menu-item>
              </template>
            </a-sub-menu>
          </a-menu>
        </div>
      </div>


      <div class="mainDetail">
        <div class="detailTop">
          <div class="agc">
            查看AGC
          </div>
          <div class="topTabs">

            <div class="resetTab topTab" v-show="showReset" @click="resetCurrStatus" @mouseenter="enterTab('reset')"
              @mouseleave="leaveTab()">
              <img style="width: 20px;height: 20px;" src="@/assets//matrixIcon/icon-reset.png" alt="">
              <div class="toolTip" :class="currTool == 'reset' ? 'toolTipActive' : ''">
                <div class="toolTop"></div>
                重置
              </div>
            </div>

            <div class="topTab" @click="changeTab('running')" @mouseenter="enterTab('running')"
              @mouseleave="leaveTab()">
              <div class="topTabIcon">
                <img :src="topTabAsset[0].imgurl" alt="">
              </div>
              <div class="topTabNum" :style="{ color: topTabAsset[0].color }">{{ summaryData?.count?.running || 0 }}
              </div>
              <i class="sanjiao" :class="currStatus == 'running' ? 'sanjiaoActive' : ''"></i>
              <div class="toolTip" :class="currTool == 'running' ? 'toolTipActive' : ''">
                <div class="toolTop"></div>
                正常发电
              </div>
            </div>
            <div class="topTab" @click="changeTab('techStandby')" @mouseenter="enterTab('techStandby')"
              @mouseleave="leaveTab()">
              <div class="topTabIcon">
                <img :src="topTabAsset[1].imgurl" alt="">
              </div>
              <div class="topTabNum" :style="{ color: topTabAsset[1].color }">{{ summaryData?.count?.techStandby || 0 }}
              </div>
              <i class="sanjiao" :class="currStatus == 'techStandby' ? 'sanjiaoActive' : ''"></i>
              <div class="toolTip" :class="currTool == 'techStandby' ? 'toolTipActive' : ''">
                <div class="toolTop"></div>
                技术待机
              </div>
            </div>
            <div class="topTab" @click="changeTab('maint')" @mouseenter="enterTab('maint')" @mouseleave="leaveTab()">
              <div class="topTabIcon">
                <img :src="topTabAsset[2].imgurl" alt="">
              </div>
              <div class="topTabNum" :style="{ color: topTabAsset[2].color }">{{ summaryData?.count?.maint || 0 }}</div>
              <i class="sanjiao" :class="currStatus == 'maint' ? 'sanjiaoActive' : ''"></i>
              <div class="toolTip" :class="currTool == 'maint' ? 'toolTipActive' : ''">
                <div class="toolTop"></div>
                维护
              </div>
            </div>
            <div class="topTab" @click="changeTab('faultShutdown')" @mouseenter="enterTab('faultShutdown')"
              @mouseleave="leaveTab()">
              <div class="topTabIcon">
                <img :src="topTabAsset[3].imgurl" alt="">
              </div>
              <div class="topTabNum" :style="{ color: topTabAsset[3].color }">{{ summaryData?.count?.faultShutdown || 0
                }}
              </div>
              <i class="sanjiao" :class="currStatus == 'faultShutdown' ? 'sanjiaoActive' : ''"></i>
              <div class="toolTip" :class="currTool == 'faultShutdown' ? 'toolTipActive' : ''">
                <div class="toolTop "></div>
                故障停机
              </div>
            </div>
            <div class="topTab" @click="changeTab('userShutdown')" @mouseenter="enterTab('userShutdown')"
              @mouseleave="leaveTab()">
              <div class="topTabIcon">
                <img :src="topTabAsset[4].imgurl" alt="">
              </div>
              <div class="topTabNum" :style="{ color: topTabAsset[4].color }">{{ summaryData?.count?.userShutdown || 0
                }}
              </div>
              <i class="sanjiao" :class="currStatus == 'userShutdown' ? 'sanjiaoActive' : ''"></i>
              <div class="toolTip" :class="currTool == 'userShutdown' ? 'toolTipActive' : ''">
                <div class="toolTop"></div>
                用户停机
              </div>
            </div>
            <div class="topTab" @click="changeTab('netFault')" @mouseenter="enterTab('netFault')"
              @mouseleave="leaveTab()">
              <div class="topTabIcon">
                <img :src="topTabAsset[5].imgurl" alt="">
              </div>
              <div class="topTabNum" :style="{ color: topTabAsset[5].color }">{{ summaryData?.count?.netFault || 0 }}
              </div>
              <i class="sanjiao" :class="currStatus == 'netFault' ? 'sanjiaoActive' : ''"></i>
              <div class="toolTip" :class="currTool == 'netFault' ? 'toolTipActive' : ''">
                <div class="toolTop"></div>
                电网故障
              </div>
            </div>
            <div class="topTab" @click="changeTab('limit')" @mouseenter="enterTab('limit')" @mouseleave="leaveTab()">
              <div class="topTabIcon">
                <img :src="topTabAsset[6].imgurl" alt="">
              </div>
              <div class="topTabNum" :style="{ color: topTabAsset[6].color }">{{ summaryData?.count?.limit || 0 }}</div>
              <i class="sanjiao" :class="currStatus == 'limit' ? 'sanjiaoActive' : ''"></i>
              <div class="toolTip" :class="currTool == 'limit' ? 'toolTipActive' : ''">
                <div class="toolTop"></div>
                限制功率
              </div>
            </div>
            <div class="topTab" @click="changeTab('envStandby')" @mouseenter="enterTab('envStandby')"
              @mouseleave="leaveTab()">
              <div class="topTabIcon">
                <img :src="topTabAsset[7].imgurl" alt="">
              </div>
              <div class="topTabNum" :style="{ color: topTabAsset[7].color }">{{ summaryData?.count?.envStandby || 0 }}
              </div>
              <i class="sanjiao" :class="currStatus == 'envStandby' ? 'sanjiaoActive' : ''"></i>
              <div class="toolTip" :class="currTool == 'envStandby' ? 'toolTipActive' : ''">
                <div class="toolTop"></div>
                环境待机
              </div>
            </div>
            <div class="topTab" @click="changeTab('unknown')" @mouseenter="enterTab('unknown')"
              @mouseleave="leaveTab()">
              <div class="topTabIcon">
                <img :src="topTabAsset[8].imgurl" alt="">
              </div>
              <div class="topTabNum" :style="{ color: topTabAsset[8].color }">{{ summaryData?.count?.unknown || 0 }}
              </div>
              <i class="sanjiao" :class="currStatus == 'unknown' ? 'sanjiaoActive' : ''"></i>
              <div class="toolTip" :class="currTool == 'unknown' ? 'toolTipActive' : ''">
                <div class="toolTop"></div>
                未知状态
              </div>
            </div>
            <div class="topTab" @click="changeTab('disconn')" @mouseenter="enterTab('disconn')"
              @mouseleave="leaveTab()">
              <div class="topTabIcon">
                <img :src="topTabAsset[9].imgurl" alt="">
              </div>
              <div class="topTabNum" :style="{ color: topTabAsset[9].color }">{{ summaryData?.count?.disconn || 0 }}
              </div>
              <i class="sanjiao" :class="currStatus == 'disconn' ? 'sanjiaoActive' : ''"></i>
              <div class="toolTip" :class="currTool == 'disconn' ? 'toolTipActive' : ''">
                <div class="toolTop"></div>
                离线状态
              </div>
            </div>
          </div>
        </div>

        <div class="detailItem">
          <div class="item" v-for="(item, index) in turbineStatusData">

            <PlantTitle :id="item.id" :titlename="plantList.name" :level="'plant'" v-show="showStatusTitle">
            </PlantTitle>

            <template v-for="(iitem, iindex) in item.items" v-if="currStatus == ''">
              <div class="itemInfos aaa">
                <template v-for="(turbines, i) in iitem.turbines">
                  <div class="info" :class="turbines.status" @click="goturbines(turbines)">
                    <div class="infoNum">{{ turbines.name }}</div>
                    <div class="infoDetail">
                      <div class="infoIcon" :class="turbines.status == 'running' ? 'isRunning' : ''">
                        <img src="@/assets/matrixIcon/mos_08.png" alt="">
                      </div>
                      <div class="infocontent">
                        <div class="contentKw">
                          {{ turbines.activePower }}kw
                        </div>
                        <div class="contentSpeed">
                          {{ turbines.avgWindSpeed }}m/s
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </template>
            <template>
              <div class="itemInfos bbb" v-for="(iitem, iindex) in item.items">
                <template v-for="(turbines, i) in iitem.turbines" @click="goturbines(turbines)">
                  <div class="info" :class="turbines.status" v-show="turbines.status == currStatus">
                    <div class="infoNum">{{ turbines.name }}</div>
                    <div class="infoDetail">
                      <div class="infoIcon" :class="turbines.status == 'running' ? 'isRunning' : ''">
                        <img src="@/assets/matrixIcon/mos_08.png" alt="">
                      </div>
                      <div class="infocontent">
                        <div class="contentKw">
                          {{ turbines.activePower }}kw
                        </div>
                        <div class="contentSpeed">
                          {{ turbines.avgWindSpeed }}m/s
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <PlantFoot :summaryData="summaryData"></PlantFoot>
  </div>
</template>
<script>
import PlantTitle from "@/components/matrixcpn/plantTitle.vue"
import PlantFoot from "@/components/matrixcpn/plantFoot.vue"
import { GetTurbineStatus, GetSummary, GetBasePlant } from '@/service/index'
import getCurrentDate from '@/util/currTime'
export default {
  components: {
    PlantTitle,
    PlantFoot
  },
  data() {
    return {
      today: '',
      showReset: false,
      currTool: '',
      currStatus: '',
      turbineStatusData: [],
      showStatusTitle: true,
      summaryData: {},
      plantList: {},
      getparams: { level: 'plant', id: 300001 },
      timer: null,
      topTabAsset: [
        {
          name: '正常发电',
          imgurl: require("@/assets/matrixIcon/icon-running.png"),
          color: "#5df442",
        },
        {
          name: '技术待机',
          imgurl: require("@/assets/matrixIcon/icon-standby.png"),
          color: "#85cb78",
        },
        {
          name: '维护',
          imgurl: require("@/assets/matrixIcon/icon-shutdown.png"),
          color: "#e1e701",
        },
        {
          name: '故障停机',
          imgurl: require("@/assets/matrixIcon/icon-fault.png"),
          color: "#bc1d15",
        },
        {
          name: '用户停机',
          imgurl: require("@/assets/matrixIcon/icon-maint.png"),
          color: "#eda414",
        },
        {
          name: '电网故障',
          imgurl: require("@/assets/matrixIcon/icon-initialize.png"),
          color: "#f273ff",
        },
        {
          name: '限制功率',
          imgurl: require("@/assets/matrixIcon/icon-startup.png"),
          color: "#7978f8",
        },
        {
          name: '环境待机',
          imgurl: require("@/assets/matrixIcon/icon-untying.png"),
          color: "#4dc5e0",
        },
        {
          name: '未知状态',
          imgurl: require("@/assets/matrixIcon/icon-disconn.png"),
          color: "#6e7178",
        },
        {
          name: '离线状态',
          imgurl: require("@/assets/matrixIcon/icon-unknown.png"),
          color: "#818389",
        },
      ],

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
  mounted() {
    this.mountedAction()
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        setTimeout(() => {
          this.mountedAction()
        }, 0)
        console.log("刷新一下");
      }, 3000)
    }
    this.today = getCurrentDate()
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  watch: {
    getparams(newvalue, oldvalue) {
      this.TurbineStatusAction()
      this.SummarAction()
    }
  },
  methods: {
    mountedAction() {
      this.TurbineStatusAction()
      this.SummarAction()
      this.BasePlantAction()
    },
    async TurbineStatusAction() {
      const res = await GetTurbineStatus(this.getparams)
      const result = this.parseCallBack(res.data)
      this.turbineStatusData = result
      console.log(this.turbineStatusData, 'turbineStatusData')
    },
    async SummarAction() {
      const res = await GetSummary(this.getparams)
      const result = this.parseCallBack(res.data)
      this.summaryData = result
      this.monthComplete = result.compRate.month
      this.yearComplete = result.compRate.year
      console.log(result, 'SummarData')
    },
    async BasePlantAction() {
      const res = await GetBasePlant(this.getparams)
      const result = this.parseCallBack(res.data)
      this.plantList = result[1]
      console.log(this.plantList, 'plantList')
    },
    menuParent(item) {
      this.getparams = item == '全部' ? { level: 'plant', id: 300001 } : { level: 'plant', id: item.id }
      this.showStatusTitle = true
    },
    resetCurrStatus() {
      this.showReset = false
      this.currStatus = ''
    },
    menuItem(item) {
      this.showStatusTitle = false
      this.getparams = { level: 'item', id: item.id }
    },
    changeTab(status) {
      this.showReset = true
      this.currStatus = status
      console.log(this.currStatus, '选中zh')
    },
    goturbines(infos) {
      console.log(infos.id)
      this.$router.push(`robot/${infos.id}`)
    },
    enterTab(status) {
      this.currTool = status
    },
    leaveTab() {
      this.currTool = ''
    },
    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },
    goalltype() {
      this.$router.push({ name: 'plantdetail' })
    }
  },
}
</script>

<style scoped>
::v-deep .ant-menu-submenu-title {
  display: flex;
  justify-content: space-between;
  /* padding: 0 35px 0 50px; */
  border-left: 2px solid #1d7cda;
  box-sizing: border-box;
  align-items: center;
  background-color: #181c30;
  width: 100%;
  height: 30px;
  font-size: 18px;
  color: #989db6;
  margin-top: 20px;
}

::v-deep .ant-menu.ant-menu-inline.ant-menu-sub {
  background-color: #222b4f;
}

::v-deep .ant-menu {
  background-color: #222b4f;
  color: #989db6;
  border: none;
}

.menuoption {
  padding-left: 60px;
  background-color: #222b4f;
  box-sizing: border-box;
}

::v-deep .ant-menu-sub.ant-menu-inline>.ant-menu-item {
  text-align: left;
}

.ant-menu-item::after {
  border: 0;
}

::v-deep .ant-menu-submenu-inline>.ant-menu-submenu-title .ant-menu-submenu-arrow::before {
  background-color: #fff !important;
}


.optionTitle,
.menuoption {
  padding-left: 20px;
  box-sizing: border-box;
}

.anticon {
  color: #fff;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.matrix {
  display: flex;
  flex-direction: column;
  width: 1920px;
  height: calc(100% - 85px);
  padding: 15px;
  padding-top: 25px;
  box-sizing: border-box;
  background-color: #080f22;
}

.main {
  flex: 1;
  display: flex;
  width: 100%;
}

.detailTop {
  display: flex;
  justify-content: space-between;
  align-items: start;
  height: 40px;
}

.agc {
  visibility: hidden;
  height: 40px;
  width: 105px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  border-radius: 5px;
  color: #fff;
  /* background-color: #1f8efa; */
}

.topTabs {
  display: flex;
  padding-right: 20px;
  box-sizing: border-box;
}

.topTab {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  font-size: 18px;
  margin: 0 18px;
  cursor: pointer;
}

.toolTip {
  display: none;
  position: absolute;
  width: 60px;
  height: 25px;
  left: 50%;
  font-size: 12px;
  top: 130%;
  text-align: center;
  line-height: 25px;
  background-color: #fff;
  border-radius: 5px;
  transform: translateX(-50%)
}

.toolTip .toolTop {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -100%);
  width: 0;
  height: 0;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  border-bottom: 5px solid #fff;
}

.toolTipActive {
  display: block
}

.topTab .sanjiao {
  opacity: 0;
  position: absolute;
  top: 60%;
  left: 60%;
  transform: translate(-50%);
  border: 10px solid transparent;
  border-bottom-color: orange;
}

.sanjiaoActive {
  opacity: 1 !important;
}

.topTabIcon img {
  width: 16px;
  height: 16px;
}

.allChangzhan {
  width: 340px;
  height: 100%;
  padding-top: 30px;
  box-sizing: border-box;
  background-color: #222b4f;
  border-radius: 10px;
}

.Date {
  font-size: 20px;
  color: #fff;
  letter-spacing: 2px;
  text-align: right;
  padding-right: 25px;
  box-sizing: border-box;
}

.changZhanTitle {
  width: 290px;
  padding: 15px 0;
  border-bottom: 2px solid #606372;
  margin: 0 auto;
  margin-top: 30px;
  font-size: 25px;
  color: #fff;
  text-align: left;
  cursor: pointer;
}

.mainDetail {
  flex: 1;
  margin-left: 10px;

}

.topTabs:nth-child(0) {
  color: 'red'
}

.itemInfos {
  display: flex;
  flex-wrap: wrap;
  margin-top: 3px;
}

.info {
  width: 92px;
  color: #fff;
  padding: 3px 5px;
  box-sizing: border-box;
  padding-right: 10px;
  margin-top: 4px;
  margin-right: 4px;
  cursor: pointer;
}

.info .infoNum {
  font-size: 18px;
  text-align: center;
}

.infoDetail {
  display: flex;
  justify-content: space-between;
  height: 34px;
  box-sizing: border-box;
  /* margin-top: 3px; */
  padding: 0;
}

.infoDetail .infoIcon {
  height: 100%;

}

.isRunning {
  animation: rotate 5s infinite linear;
}

.infoDetail .infoIcon img {
  height: 100%;
}

.infocontent {
  font-size: 13px;
}



.running {
  background: green;
}

.techStandby {
  background: #6ebd6e;
}

.maint {
  background: #e5e923;
}

.faultShutdown {
  background: #df1f0f;
}

.userShutdown {
  background: #eaa218;
}

.netFault {
  background: #e26ded;
}

.limit {
  background: #4746ce;
}

.envStandby {
  background: #44d5eb;
}

.unknown {
  background: #9e9fa3;
}

.disconn {
  background-color: #818389;
}
</style>