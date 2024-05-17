<template>
  <div class="alltype">
    <div class="container">
      <div class="mainHeader">
        <div class="headerLeft">
          <div class="firstTabs">
            <div class="firstTab">大庆海智</div>
            <!-- <div class="firstTab">风电场站1</div>
            <div class="firstTab">风电场站1</div>
            <div class="firstTab">风电场站1</div>
            <a-icon type="right" style="margin-left: 20px;" /> -->
          </div>
          <div class="secondHeader">
            <div class="currDate">{{ today }}</div>
            <div class="secondTabs">
              <template v-for="(item, index) in secondTabData">
                <div class="secondTab" @click="changeTab(index,item.route)" :class="currindex == index ? 'secondTabActive' : ''">
                  {{ item.name }}</div>
              </template>
            </div>
          </div>
        </div>
        <div class="headerRight">
          <div class="rightStatus">
            <div class="topTab" @mouseenter="enterTab('running')" @mouseleave="leaveTab()">
              <div class="topTabIcon">
                <img :src="topTabAsset[0].imgurl" alt="">
              </div>
              <div class="topTabNum" :style="{ color: topTabAsset[0].color }">{{ summaryData?.count?.running || 0 }}
              </div>
              <!-- <i class="sanjiao" :class="currStatus == 'running' ? 'sanjiaoActive' : ''"></i> -->
              <div class="toolTip" :class="currTool == 'running' ? 'toolTipActive' : ''">
                <div class="toolTop"></div>
                正常发电
              </div>
            </div>
            <div class="topTab" @mouseenter="enterTab('techStandby')" @mouseleave="leaveTab()">
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

            <div class="topTab" @mouseenter="enterTab('maint')" @mouseleave="leaveTab()">
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

            <div class="topTab" @mouseenter="enterTab('faultShutdown')" @mouseleave="leaveTab()">
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

            <div class="topTab" @mouseenter="enterTab('userShutdown')" @mouseleave="leaveTab()">
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

            <div class="topTab" @mouseenter="enterTab('netFault')" @mouseleave="leaveTab()">
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

            <div class="topTab" @mouseenter="enterTab('limit')" @mouseleave="leaveTab()">
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

            <div class="topTab" @mouseenter="enterTab('envStandby')" @mouseleave="leaveTab()">
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

            <div class="topTab" @mouseenter="enterTab('unknown')" @mouseleave="leaveTab()">
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

            <div class="topTab" @mouseenter="enterTab('disconn')" @mouseleave="leaveTab()">
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
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>


import { GetSummary } from '@/service/index'
import getCurrentDate from "@/util/currTime"
export default {
  data() {
    return {
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
      currTool: '',
      currStatus: '',
      today: '',
      summaryData: {},
      timer: null,
      getparams: { level: 'plant', id: 30001 },
      currindex: 0,
      secondTabData: [
        {
          name: '风机矩阵',
          route: '/matrix/fengji'
        },
        {
          name: '实时数据',
          route: '/matrix/timeData'
        },
        {
          name: '故障警告',
          route: '/matrix/Failurewarning'
        },
        {
          name: '道路图',
          route: '/matrix/streetMap'
        },
        {
          name: '升压站',
          route: '/matrix/Boost'
        },
        {
          name: '测风塔',
          route: '/matrix/Tower'
        },
        {
          name: '电能表',
          route: '/matrix/Watch'
        },
        {
          name: '功率预测',
          route: '/matrix/Forecast'
        },
      ]
    }
  },
  created() {
    this.today = getCurrentDate()
    this.getparams.id = this.$route.params.id
    this.getparams.level = this.$route.params.level
    console.log(this.getparams.id, this.getparams.level)
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        setTimeout(() => {
          this.SummarAction()
        }, 0)
      }, 3000)
    }
    this.SummarAction()
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器，避免内存泄漏
    clearInterval(this.timer);
  },
  methods: {
    async SummarAction() {
      const res = await GetSummary(this.getparams)
      const result = this.parseCallBack(res.data)
      this.summaryData = {}
      this.summaryData = result
    },

    enterTab(status) {
      this.currTool = status
    },
    leaveTab() {
      this.currTool = ''
    },

    changRouter() {
      console.log('red')
     
    },
    changeTab(index,route) {
      this.currindex = index
      this.$router.replace({ path: route })
    },
    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },
  }
}
</script>

<style scoped>
.alltype {
  display: flex;
  flex-direction: column;
  width: 1920px;
  height: calc(100% - 85px);
  padding: 15px;
  padding-top: 10px;
  box-sizing: border-box;
  background-color: #080f22;
}

.container {
  width: 1890px;
}

.mainHeader {
  display: flex;
  width: 1890px;
  height: 160px;
}

.mainHeader .headerLeft {
  width: 1470px;


}

.headerLeft .firstTabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 740px;
  padding-bottom: 15px;
}

.firstTabs .firstTab {
  width: 170px;
  height: 55px;
  text-align: center;
  line-height: 55px;
  font-size: 23px;
  border-radius: 5px;
  background-color: #1f8efa;
  color: #fff;
}

.secondHeader {
  display: flex;
  align-items: center;
  height: 90px;
  width: 100%;
  padding-left: 20px;
  padding-right: 40px;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 10px 0 0 0;
  background-color: #19203b
}

.secondHeader .currDate {
  width: 160px;
  letter-spacing: 1px;
  color: #fff;
}

.secondHeader .secondTabs {
  display: flex;
  /* flex: 1; */

  margin-left: 30px;
  color: #989898;
}

.secondTabs .secondTab {
  width: 100px;
  text-align: center;
  height: 40px;
  letter-spacing: 1px;
  line-height: 40px;
  margin: 0 20px;
  border-bottom: 2px solid #4e5a69;
  box-sizing: border-box;
  cursor: pointer;
}

.secondTabActive {
  color: #668ee5;
  border-bottom: 2px solid #668ee5 !important;
}

.mainHeader .headerRight {
  display: flex;
  width: 420px;
  height: 100%;
  padding: 0 10px 0 20px;
  box-sizing: border-box;
  border-radius: 10px 10px 0 0;
  background-color: #19203b;
}

.rightStatus {
  display: flex;
  flex-wrap: wrap;
  height: 50px;

}

.topTab {
  position: relative;
  display: flex;
  background-color: #080f22;
  width: 78px;
  height: 25px;
  padding-left: 8px;
  box-sizing: border-box;
  margin: 15px 0;
  font-size: 18px;
  cursor: pointer;
}

.toolTip {
  display: none;
  position: absolute;
  width: 60px;
  height: 25px;
  left: 25%;
  z-index: 2;
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
</style>