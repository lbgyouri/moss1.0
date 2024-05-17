<template>
  <div class="fengji">
    <div class="mainInfos">
      <template v-for="item in turbineStatusData">
        <PlantTitle :id="300001" :level="'plant'" :titlename="plantList.name" class="fjplanttitle"></PlantTitle>
        <template v-for=" iitem in item.items">
          <!-- <PlantTitle :id="iitem.id" :level="'item'" :titlename="plantList.name" class="fjplanttitle"></PlantTitle> -->
          <div class="itemInfos" style="display: flex;">
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
      </template>
    </div>
    <PlantFoot :summaryData="summaryData"></PlantFoot>
  </div>
</template>
<script>
import PlantTitle from "@/components/matrixcpn/plantTitle.vue"
import PlantFoot from "@/components/matrixcpn/plantFoot.vue"
import { GetTurbineStatus, GetBasePlant, GetSummary } from '@/service/index'

export default {
  components: {
    PlantTitle,
    PlantFoot
  },
  data() {
    return {
      getparams: { level: 'plant', id: 300001 },
      turbineStatusData: [],
      plantList: {},
      summaryData: {},
      time: null,
    }
  },
  created() {
    this.mountedAction()
  },
  mounted() {
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        setTimeout(() => {
          this.mountedAction()
        }, 0)
        console.log("刷新");
      }, 3000)
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
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    mountedAction() {
      this.TurbineStatusAction()
      this.BasePlantAction()
      this.SummarAction()
    },
    async TurbineStatusAction() {
      const res = await GetTurbineStatus(this.getparams)
      const result = this.parseCallBack(res.data)
      this.turbineStatusData = result
      // console.log(result, 'detail--Tur')
    },
    async BasePlantAction() {
      const res = await GetBasePlant(this.getparams)
      const result = this.parseCallBack(res.data)
      this.plantList = result[1]
      console.log(this.plantList, '风机plantList')
    },
    async SummarAction() {
      const res = await GetSummary(this.getparams)
      const result = this.parseCallBack(res.data)
      this.summaryData = result
      this.monthComplete = result.compRate.month
      this.yearComplete = result.compRate.year
      console.log(eval(res.data + "; API_CALLBACK")(), 'SummarData')
    },
    goturbines(infos) {
      console.log(infos.id)
      this.$router.push({ name: 'robot', params: { id: infos.id } })
    },
    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },
  }
}

</script>

<style scoped>
.fengji {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mainInfos {
  flex: 1;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 5px;
  background-color: #222b4f;
}

.itemInfos {
  display: flex;
  flex-wrap: wrap;
  /* margin-top: 3px; */
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.info {
  width: 92px;
  color: #fff;
  padding: 3px 5px;
  box-sizing: border-box;
  padding-right: 10px;
  margin-top: 2px;
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

.fjplanttitle {
  background-color: #14192f;
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