<template>
  <div class="tower">
    <plantTitle2></plantTitle2>
    <div class="towercon">
      <div class="maincon">
        <img class="bgcimg" src="../../assets//matrixIcon/towerbgc.png" alt="">
        <div class="infolist">

          <div class="listitem">
            <div class="itemname">80米速度</div>
            <div class="itemnum" v-if="windData.windSpeed5 && windData.windSpeed5 != -99"><span
                style="color:#bae3fd;font-size: 28px;">{{ windData.windSpeed5 || 0 }}</span> m/s</div>
            <div class="itemnum" v-else><span style="color:#bae3fd;font-size: 28px;">--</span> m/s</div>
          </div>
          <div class="listitem">
            <div class="itemname">80米风向</div>
            <div class="itemnum" v-if="windData.windDirection5 && windData.windDirection5 != -99"><span
                style="color:#bae3fd;font-size: 28px;">{{ windData.windDirection5 || 0 }}</span>°</div>
            <div class="itemnum" v-else><span style="color:#bae3fd;font-size: 28px;">--</span>°</div>
          </div>
          <div class="listitem">
            <div class="itemname">70米风速</div>
            <div class="itemnum"><span style="color:#bae3fd;font-size: 28px;">{{ windData.windSpeed4 || 0 }}</span> m/s
            </div>
          </div>
          <div class="listitem">
            <div class="itemname">70米风向</div>
            <div class="itemnum"><span style="color:#bae3fd;font-size: 28px;">{{ windData.windDirection4 || 0 }}</span>
              °
            </div>
          </div>
          <div class="listitem">
            <div class="itemname">50米风速</div>
            <div class="itemnum"><span style="color:#bae3fd;font-size: 28px;">{{ windData.windSpeed3 || 0 }}</span> m/s
            </div>
          </div>
          <div class="listitem">
            <div class="itemname">50米风向</div>
            <div class="itemnum"><span style="color:#bae3fd;font-size: 28px;">{{ windData.windDirection3 || 0 }}</span>
              °
            </div>
          </div>
          <div class="listitem">
            <div class="itemname">30米风速</div>
            <div class="itemnum"><span style="color:#bae3fd;font-size: 28px;">{{ windData.windSpeed2 || 0 }}</span> m/s
            </div>
          </div>
          <div class="listitem">
            <div class="itemname">30米风向</div>
            <div class="itemnum"><span style="color:#bae3fd;font-size: 28px;">{{ windData.windDirection2 || 0 }}</span>
              °
            </div>
          </div>
          <div class="listitem">
            <div class="itemname">10米风速</div>
            <div class="itemnum"><span style="color:#bae3fd;font-size: 28px;">{{ windData.windSpeed1 || 0 }}</span> m/s
            </div>
          </div>
          <div class="listitem">
            <div class="itemname">10米风向</div>
            <div class="itemnum"><span style="color:#bae3fd;font-size: 28px;">{{ windData.windDirection1 || 0 }}</span>
              °
            </div>
          </div>


        </div>

      </div>
      <div class="weatherinfo">
        <div class="infoitem">
          <div class="infoname">{{ windData.airTemp || 0 }} <span style="font-size: 18px;color: #eb6845;">°C</span> </div>
          <div class="infoname2">温度</div>


        </div>
        <div class="infoitem">
          <div class="infoname">{{ windData.airPressure || 0 }} <span style="font-size: 18px;color: #eb6845;">Kpa</span>
          </div>
          <div class="infoname2">大气气压</div>


        </div>
        <div class="infoitem">
          <div class="infoname">{{ windData.airHumidity || 0 }} <span style="font-size: 18px;color: #eb6845;">%</span>
          </div>
          <div class="infoname2">湿度</div>


        </div>
      </div>
      <div class="towerbutton">
        <template v-for="(item, index) in wind">
          <div class="button" @click="button(index)" :class="buttonindex==index?'active':''">
            测风塔{{ index + 1 }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import plantTitle2 from '@/components/matrixcpn/plantTitle2.vue';
import { GetWind, GetWeather } from '@/service';
export default {
  components: {
    plantTitle2
  },
  data() {
    return {
      wind: [],
      buttonindex: 0,
      windData: {},
      weatherData: {}
    }
  },
  created() {
    this.windAction()
    this.weatherAction()
  },
  methods: {
    async windAction() {
      const res = await GetWind({ plantId: 300001 })
      const result = this.parseCallBack(res.data)
      this.wind = result
      this.windData = {}
      this.windData = result[this.buttonindex]
      console.log(result, 'wind')
    },
    async weatherAction() {
      const res = await GetWeather({ plantId: 300001 })
      const result = this.parseCallBack(res.data)

      this.weatherData = result
      console.log(result, 'weather')
    },
    button(index) {
      console.log(index)
      this.buttonindex = index
      this.windAction()
    },
    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },
  }
}
</script>

<style scoped>
.tower {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 5px;
  border-radius: 0 0 10px 10px;
  background-color: #222b4f;
}

.towercon {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #222b4f
}

.maincon {
  position: relative;
  width: 1534px;
  height: 580px;
  /* background-color: skyblue; */
}

.bgcimg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.infolist {
  display: flex;
  justify-content: center;
  align-content: space-around;
  flex-wrap: wrap;
  position: absolute;
  left: 340px;
  width: 595px;
  height: 580px;
  padding-bottom: 70px;
  box-sizing: border-box;
}

.listitem {
  display: flex;
  height: 30px;
  width: 40%;
  margin: 0 10px;
  box-sizing: border-box
}

.listitem:nth-child(2n) {
  padding-left: 22px;
}
.listitem:nth-child(n) {
  padding-right: 22px;
}
.itemname,
.itemnum {
  flex: 1;
}

.itemname {
  font-size: 22px;
  color: #209ae3;

}

.itemnum {
  color: #eb6845;
  font-size: 18px;
  text-align: center;
}

.weatherinfo {
  position: absolute;
  top: 10px;
  right: 0px;
  display: flex;
}

.infoitem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 188px;
  height: 122px;
  margin: 0 10px;
  background-image: url('../../assets/matrixIcon/weatherbgc.png');
  background-position: center;
  background-size: cover;
}

.infoname {
  font-size: 30px;
  font-weight: 700;
  color: #bae3fd;
  margin-top: 8px;
}

.infoname2 {
  font-size: 30px;
  margin-top: 6px;
  color: #229af7;
  font-weight: 700;
}

.towerbutton {
  position: absolute;
  top: 10px;
  left: 0px;
}

.button {
  width: 190px;
  height: 70px;
  margin: 6px 0;
  text-align: center;
  line-height: 70px;
  background-image: url('../../assets/matrixIcon/button1.png');
  background-position: center;
  background-size: cover;
  color: #bae3fd;
  font-size: 25px;
  cursor: pointer;
}
.active{

  background-image: url('../../assets/matrixIcon/button.png') !important;
}
</style>