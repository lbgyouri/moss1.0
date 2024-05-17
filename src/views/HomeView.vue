<template>
  <div class="home">
    <div class="main">

      <div class="left">
        <div class="leftDate">
          <div class="dateCloud">
            <div class="cloudIcon">
              <img src="../assets/images/mos_05.png" alt="">
            </div>
            <div class="cloudText">累计运行天数</div>
          </div>
          <div class="dateInfo">
            <div class="infoDetails">{{ today }}</div>
            <div class="infoDays">{{ summaryData.runDays }} <span class="smallday">天</span></div>
          </div>
        </div>

        <div class="running">
          <div class="itemTitle">项目运行状态</div>
          <div class="changjingBar">
            <div class="changjing gs">乐胜风电场</div>
          </div>
          <div class="runningDetail">
            <div class="runninglist">
              <div class="listItem">
                <div class="listText">运行台数</div>
                <div class="listNum">{{ summaryData.count ? summaryData.count.running : 0 }} 台</div>
              </div>
              <div class="listItem">
                <div class="listText">待机台数</div>
                <div class="listNum">{{ summaryData.count ? summaryData.count.techStandby + summaryData.count.envStandby
              +
              summaryData.count.userShutdown : 0 }} 台</div>
              </div>
              <div class="listItem">
                <div class="listText">维护台数</div>
                <div class="listNum">{{ summaryData.count ? summaryData.count.maint : 0 }} 台</div>
              </div>
              <div class="listItem">
                <div class="listText">限功率台数</div>
                <div class="listNum">{{ summaryData.count ? summaryData.count.limit : 0 }} 台</div>
              </div>
              <div class="listItem">
                <div class="listText">故障台数</div>
                <div class="listNum">{{ summaryData.count ? summaryData.count.faultShutdown + summaryData.count.netFault
              :
              0 }} 台</div>
              </div>
              <div class="listItem">
                <div class="listText">通讯中断台数</div>
                <div class="listNum">{{ summaryData.count ? summaryData.count.unknown + summaryData.count.disconn : 0 }}
                  台
                </div>
              </div>
            </div>
            <div class="runningEchart" id="prectHuan">
              <div class="rightHuan" ref="lhchart1">

              </div>

              <div class="echartFont">健康度</div>
            </div>
          </div>
        </div>

        <div class="baseInfo">
          <div class="itemTitle">场站基本信息</div>
          <div class="changjingBar">
            <div class="changjing gs">乐胜风电场</div>
          </div>
          <div class="baseInfoDetail">
            <div class="baseInfolist">
              <div class="listItem">
                <div class="listText">装机容量</div>
                <div class="listNum"> {{ summaryData.capacity ? summaryData.capacity : 0 }}MW</div>
              </div>
              <div class="listItem">
                <div class="listText">实时功率</div>
                <div class="listNum">{{ summaryData.activePower ? summaryData.activePower : 0 }}MW</div>
              </div>
              <div class="listItem">
                <div class="listText">负荷率</div>
                <div class="listNum">
                  {{ ((summaryData.activePower && summaryData.capacity) ? (summaryData.activePower /
              summaryData.capacity *
              100) : 0).toFixed(2) }}%
                </div>
              </div>
              <div class="listItem">
                <div class="listText">月利用小时</div>
                <div class="listNum">{{ summaryData.runHours ? summaryData.runHours.month : 0 }}h</div>
              </div>
              <div class="listItem">
                <div class="listText">年利用小时</div>
                <div class="listNum"> {{ summaryData.runHours ? summaryData.runHours.year : 0 }}h</div>
              </div>

            </div>
            <div class="baseInfoEchart" id="prectHuan">
              <div class="rightHuan" ref="lrchart2">

              </div>

              <div class="echartFont">发电完成率</div>
            </div>
          </div>
        </div>
      </div>
      <!-- mi -->
      <div class="middle">
        <div class="middleTabs">
          <div class="mTab">
            <div class="tabIcon">
              <img src="../assets/images/mos_01.png" alt="">
            </div>
            <div class="tabInfo">
              <div class="tabInfoText">
                装机容量
              </div>
              <div class="tabInfoNum">
                {{ summaryData.capacity }}<span class="tabInfoNumDw">MW</span>
              </div>
            </div>

          </div>
          <div class="tabLine"></div>
          <div class="mTab">
            <div class="tabIcon">
              <img src="../assets/images/mos_02.png" alt="">
            </div>
            <div class="tabInfo">
              <div class="tabInfoText">
                实时功率
              </div>
              <div class="tabInfoNum">
                {{ summaryData.activePower }}<span class="tabInfoNumDw">MW</span>
              </div>
            </div>

          </div>
          <div class="tabLine"></div>
          <div class="mTab">
            <div class="tabIcon">
              <img src="../assets/images/mos_03.png" alt="">
            </div>
            <div class="tabInfo">
              <div class="tabInfoText">
                负荷率
              </div>
              <div class="tabInfoNum">
                {{ ((summaryData.activePower && summaryData.capacity) ? (summaryData.activePower / summaryData.capacity
              *
              100) : 0).toFixed(2) }}
                <span class="tabInfoNumDw">%</span>
              </div>
            </div>

          </div>
          <div class="tabLine"></div>
          <div class="mTab">
            <div class="tabIcon">
              <img src="../assets/images/mos_04.png" alt="">
            </div>
            <div class="tabInfo">
              <div class="tabInfoText">
                年利用时
              </div>
              <div class="tabInfoNum">
                {{ summaryData.runHours ? summaryData.runHours.year : 0 }}
                <span class="tabInfoNumDw">小时</span>
              </div>
            </div>

          </div>
        </div>
        <div class="middleMap">
          <div class="map" :style="mapStyle">
            <img class="mapimg" src='../assets/images/bg_map.png'>
            <img class="mapicon" src='../assets/images/mos_07.png'>
            <!-- <template v-for="(item, index) in turbineList">
              <div :style="{ left: item.x + 'px', top: item.y + 'px' }" class="turbine-box">
                <div :data-id="item.id" :data-x="item.x" :data-y="item.y" :data-name="item.name" :data-type="item.t"
                  class="mask turbine-hour" :style="{ 'z-index': 99999 + index }">
                </div>
                <img :class="item.status == 'running' ? 'tubine-running' : ''" class="tubine"
                  src="../assets/images/mos_06.png" />
                <img class="tubine-tower" src="../assets/images/mos_07.png" />
              </div>
              <div @click="jumpPlant(item)" v-else
								:style="{left: item.x+'px',top:item.y+'px','z-index': 999 + index}" :data-id="item.id"
								:data-x="item.x" :data-y="item.y" :data-name="item.name" :data-type="item.t"
								class="turbine-pv turbine-hour"></div>
            </template> -->
            <!-- <img class="mapBgc" src="../assets/images/bg_map.png" alt=""> -->
            <!-- <div class="greenIcon icon1">
              <img src="../assets/images/mos_06.png" alt="">
            </div>
            <div class="greenIcon icon2">
              <img src="../assets/images/mos_06.png" alt="">
            </div>
            <div class="greenIcon icon3">
              <img src="../assets/images/mos_06.png" alt="">
            </div>
            <div class="whiteIcon whiteIcon1 ">
              <img src="../assets/images/mos_07.png" alt="">
            </div>
            <div class="whiteIcon whiteIcon2 ">
              <img src="../assets/images/mos_07.png" alt="">
            </div>
            <div class="whiteIcon whiteIcon3 ">
              <img src="../assets/images/mos_07.png" alt="">
            </div>
            <div class="whiteIcon whiteIcon4 ">
              <img src="../assets/images/mos_07.png" alt="">
            </div>
            <div class="whiteIcon whiteIcon5 ">
              <img src="../assets/images/mos_07.png" alt="">
            </div>
            <div class="whiteIcon whiteIcon6 ">
              <img src="../assets/images/mos_07.png" alt="">
            </div> -->
          </div>
          <div class="column">
            <div class="columnIcons">
              <img src="../assets/homeIcon/icon-running.png" alt="">
              <img src="../assets/homeIcon/icon-standby.png">
              <img src="../assets/homeIcon/icon-maint.png" alt="">
              <img src="../assets/homeIcon/icon-fault.png" alt="">
              <img src="../assets/homeIcon/icon-startup.png" alt="">
              <img src="../assets/homeIcon/icon-initialize.png" alt="">
              <img src="../assets/homeIcon/icon-shutdown.png" alt="">
              <img src="../assets/homeIcon/icon-untying.png" alt="">
              <img src="../assets/homeIcon/icon-disconn.png" alt="">
              <img src="../assets/homeIcon/icon-startup2.png" alt="">
            </div>
            <div class="columnTitles">
              <div class="columnTitle title1">正常发电</div>
              <div class="columnTitle title2">技术待机</div>
              <div class="columnTitle title3">用户停机</div>
              <div class="columnTitle title4">故障停机</div>
              <div class="columnTitle title5">维护</div>
              <div class="columnTitle title6">电网故障</div>
              <div class="columnTitle title7">限制功率</div>
              <div class="columnTitle title8">环境待机</div>
              <div class="columnTitle title9">未知状态</div>
              <div class="columnTitle title9">离线</div>
            </div>
          </div>
          <div class="complete">
            <div class="com">
              <a-progress :stroke-color="{
              '0%': '#354cd3',
              '50%': '#5e7de4',
              '100%': '#a2cbfe',
            }" :width="progressWidth" type="circle" :percent="monthComplete">
                <template #format="percent">
                  <span style="color: #fff;font-size: 20px">
                    {{ percent }}
                    <span style="font-size: 14px;">%</span>
                  </span>
                </template>
              </a-progress>
              <div class="comtext">月累计完成率</div>
            </div>
            <div class="com">
              <a-progress :stroke-color="{
              '0%': '#d15f35',
              '50%': '#e27c60',
              '100%': '#fba7a4',
            }" :width="progressWidth" type="circle" :percent="yearComplete">
                <template #format="percent">
                  <span style="color: #fff;font-size: 20px">
                    {{ percent }}
                    <span style="font-size: 14px;">%</span>
                  </span>
                </template>
              </a-progress>
              <div class="comtext">年累计完成率</div>
            </div>
          </div>
        </div>
        <div class="middleCharts">
          <!-- <div class="mchartsTab">
            <div class="mcTab">
              <div class="mTabLine line1"></div>
              <div class="mTabText">功率</div>
            </div>
            <div class="mcTab">
              <div class="mTabLine line2"></div>
              <div class="mTabText">短期预测</div>
            </div>
            <div class="mcTab">
              <div class="mTabLine line3"></div>
              <div class="mTabText">超短期预测</div>
            </div>
            <div class="mcTab">
              <div class="mTabLine line4"></div>
              <div class="mTabText">风速</div>
            </div>
          </div> -->
          <div class="middleChart" ref="mchart">
          </div>
        </div>
      </div>

      <!-- right -->
      <div class="right">
        <div class="stats">
          <div class="statsitem">
            <div class="statsname">日累计发电量</div>
            <div class="statsnum">{{ summaryData.powerGen ? summaryData.powerGen.today : 0 | toWKWh }}<span
                class="statsnumDw">kWh</span></div>
          </div>
          <div class="statsitem">
            <div class="statsname">月累计发电量</div>
            <div class="statsnum">{{ summaryData.powerGen ? summaryData.powerGen.month : 0 | toWKWh }} <span
                class="statsnumDw">kWh</span></div>
          </div>
          <div class="statsitem">
            <div class="statsname">年累计发电量</div>
            <div class="statsnum">{{ summaryData.powerGen ? summaryData.powerGen.year : 0 | toWKWh }} <span
                class="statsnumDw">kWh</span></div>
          </div>
        </div>
        <div class="fadian">

          <div class="itemTitle">发电量统计</div>
          <div class="changjingBar">
            <div class="changjing gs">乐胜风电场</div>

          </div>

          <div class="faDianChartCon">
            <div class="faDianChart" ref="rightzhuchart">

            </div>
          </div>
        </div>
        <div class="rightBase">
          <div class="itemTitle">场站基本信息</div>
          <div class="changjingBar">
            <div class="changjing gs">乐胜风电场</div>

          </div>
          <div class="rightDetail">
            <div class="rightDetailInfos">
              <div class="rdInfo">
                <div class="rdInfoTitle">日累计发电量预测</div>
                <div class="rdInfoData">
                  <div class="rdInfoDataNum">{{ forecastData.predPowerGen ? forecastData.predPowerGen.today : 0 |
              toWKWh }}</div>
                  <div class="rdInfoDataDw">万kWh</div>
                </div>
              </div>
              <div class="rdInfo">
                <div class="rdInfoTitle">昨日发电量预测</div>
                <div class="rdInfoData">
                  <div class="rdInfoDataNum">{{ forecastData.predPowerGen ? forecastData.predPowerGen.yesterday : 0 |
              toWKWh }}</div>
                  <div class="rdInfoDataDw">万kWh</div>
                </div>
              </div>
              <div class="rdInfo">
                <div class="rdInfoTitle">昨日发电量</div>
                <div class="rdInfoData">
                  <div class="rdInfoDataNum"> {{ forecastData.powerGen ? forecastData.powerGen.yesterday : 0 | toWKWh}}
                  </div>
                  <div class="rdInfoDataDw">万kWh</div>
                </div>
              </div>
            </div>
            <div class="rightDetailChart" id="prectHuan">
              <div class="rightHuan" ref="rhchart">

              </div>
              <div class="echartFont">预测完成</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import * as echarts from 'echarts';
import { GetSummary, Getforecast, GetGeneration, GetMap, GetPowers } from '@/service/index'
import getCurrentDate from '../util/currTime'
import circular from "@/util/circular request"

export default {
  name: 'HomeView',
  data() {
    return {
      lhchart1: null,
      lrchart2: null,
      rhchart: null,
      rightzhuchart: null,
      today: '',
      mchart: null,
      monthComplete: 0,
      yearComplete: 0,
      progressWidth: 95,
      mapStyle: {},
      turbineList: [],
      summaryData: {},
      forecastData: {},
      generationData: {},
      mapData: {},
      powersData: {},
      all: [],
      all1: [],
      all2: [],
      timer: null,
      getparams: { level: 'plant', id: 300001 }
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

    this.initHuan()
    this.initRightZhuEchart()
    this.today = getCurrentDate()
    this.mountedAction()
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        setTimeout(() => {
          this.mountedAction()
        }, 0)
      }, 3000)
    }
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    mountedAction() {
      this.SummarAction()
      this.forecastAction()
      this.GenerationAction()
      this.MapAction()
      this.PowersAction()
    },
    //lll

    async SummarAction() {
      const res = await GetSummary(this.getparams)
      const result = this.parseCallBack(res.data)
      this.mysetOption(this.lhchart1, result.count.healthRate)
      this.mysetOption(this.lrchart2, result.compRate.month)
      this.summaryData = result
      this.monthComplete = result.compRate.month
      this.yearComplete = result.compRate.year
      // console.log(eval(res.data + "; API_CALLBACK")(), 'summaryData')
    },

    async forecastAction() {
      const res = await Getforecast(this.getparams)
      const result = this.parseCallBack(res.data)
      this.forecastData = result
      this.mysetOption(this.rhchart, (result.comRate.yesterday || 0).toFixed(2))
      // console.log(this.forecastData, 'forecastData')
    },

    async GenerationAction() {
      const res = await GetGeneration({
        level: 'plant',
        id: 300001,
        term: 'm'
      })
      const result = this.parseCallBack(res.data)
      this.generationData = result
      let data = []
      let key = []
      for (let k in result) {
        key.push(k)
        data.push(result[k][2])
      }
      this.rightzhuchart.setOption({
        xAxis: {
          data: key
        },
        series: [{
          data
        }]
      })
    },
    async MapAction(plant) {
      const res = await GetMap(this.getparams)
      const result = this.parseCallBack(res.data)
      // this.mapStyle={
      //   width:result.width+'px',
      //   height:result.height+'px',
      // }
      this.backgroundImage = result.mapBgc
      this.turbineList = result.items || []

      // console.log(result, 'turbineList')
    },


    async PowersAction() {
      const res = await GetPowers({
        level: 'plant',
        id: 300001,
        term: 'h'
      })
      const result = this.parseCallBack(res.data)
      // console.log(this.all1, 'all898989')
      this.powersData = result
      this.initMchart(result)
    },
    getAllTime(data, step) {
      var newData = {};
      var time = [];
      for (var i = 0; i <= 60 * 24; i += step) {
        var h = ~~(i / 60);
        var m = ~~(i % 60);
        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;
        var t = h + ':' + m;
        time.push(t);
        newData[t] = data[t] || data[t + ':00'] || [null, null, null];
        if (!(newData[t] instanceof Array)) {
          newData[t] = [newData[t]];
        }
      }
      // console.log(newData, time, 'ni')
      return {
        time: time,
        data: newData
      }
    },

    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },



    initMchart(result) {
      if (!this.mchart) {
        this.mchart = echarts.init(this.$refs.mchart)
      }
      var all = this.getAllTime(result.data, 10);  //实时功率
      var all1 = this.getAllTime(result.data1, 15);
      var all2 = this.getAllTime(result.data2, 15);
      console.log(all.data, '功率', all1.data, '1', all2.data, '2')
      const option = {
        xAxis: [
          {
            axisTick: {
              show: false
            },
            type: 'category',
            data: all.time,
            axisLabel: {
              interval: 8,
              color: '#fff',  //更改坐标轴文字颜色
              fontSize: 12

            },
            boundaryGap: false
          },
          {
            data: all1.time,
            show: false
          }
        ],
        grid: {
          x: 40,
          y: 28,
          x2: 30,
          y2: 19,
          borderWidth: 1
        },
        legend: {
          data: ['功率', '短期预测', '超短期预测', '风速'],
          x: 'center',
          y: 'top',
          icon: 'roundRect',
          itemHeight: 2,

          textStyle: {
            fontSize: 12,
            color: '#fff',
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        yAxis: [
          {
            name: 'MW',
            axisLabel: {
              color: "#fff",
              fontSize: 12,
            },
            nameTextStyle: {
              fontSize: 12,
              color: "#fff",
              padding: [80, 0, 0, -30]
            },
            type: 'value',
            axisLine: { //轴线
              show: true,

            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: "#353b5a",
              }
            }
          },
          {
            type: 'value',
            name: 'm/s',
            nameTextStyle: {
              fontSize: 12,
              color: "#fff",
            },
            axisLabel: {
              color: "#fff",
              fontSize: 12,
            },

            interval: 5,
            axisLine: { //轴线
              show: true,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: "#353b5a",
              }
            }
          }
        ],
        series: [
          this.mchartSeries('功率', 0, 0, '#2650c7', all.data, 10),
          this.mchartSeries('短期预测', 1, 0, 'orange', all1.data, 0),
          this.mchartSeries('超短期预测', 1, 0, '#f729a2', all2.data, 0),
          this.mchartSeries('风速', 0, 1, '#19af82', all.data, 2)

        ]
      };
      this.mchart.setOption(option)
    },
    isObject(o) {
      return Object.prototype.toString.call(o) === '[object Object]';
    },
    extract(data) {
      var indexs = [];
      var callback = function (i, v) {
        return v
      };
      for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];
        if (typeof arg == 'function') {
          callback = arg;
        } else {
          indexs.push(arguments[i]);
        }
      }
      var values = [];
      if (this.isObject(data)) {
        for (var key in data) {
          var item = [];
          for (var i = 0; i < indexs.length; i++) {
            var index = indexs[i];
            if (index == '$key') {
              item.push(callback(i, key));
            } else if (index == '$value') {
              item.push(callback(i, data[key]));
            } else {
              item.push(callback(i, data[key][index]));
            }
          }
          if (item.length == 1) {
            values.push(item[0]);
          } else {
            values.push(item);
          }
        }
      } else {
        for (var j = 0; j < data.length; j++) {
          var item = [];
          for (var i = 0; i < indexs.length; i++) {
            var index = indexs[i];
            if (index == '$index') {
              item.push(callback(i, j));
            } else {
              item.push(callback(i, data[j][index]));
            }
          }
          if (item.length == 1) {
            values.push(item[0]);
          } else {
            values.push(item);
          }
        }
      }
      return values;
    },
    mchartSeries(name, x, y, color, data, number) {
      return {
        name: name,
        type: 'line',
        xAxisIndex: x,
        yAxisIndex: y,
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: color,
          width: 1
        },
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
        },
        // areaStyle: {},
        data: this.extract(data, number)
      }
    },
    handleResize() {
      // 在窗口大小变化时重新调整图表大小
      this.mchart.resize();
      this.rightzhuchart.resize()
    },
    initRightZhuEchart() {
      this.$nextTick(() => {
        this.rightzhuchart = echarts.init(this.$refs.rightzhuchart)
        const option = {
          xAxis: {
            type: 'category',
            // data: [54, 4, 8, 3, 684, 46, 66, 88, 99],
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: '#02b0fd',
              fontSize: 12
            }
          },
          grid: {
            left: '0',
            containLabel: true,
            bottom: '0',
            top: "8%",
            right: '2%',
          },
          yAxis: {
            type: 'value',
            show: true,
            splitLine: {
              lineStyle: {
                type: 'line',
                width: 3,

                color: '#1f384d',
              }
            },
            axisLabel: {
              color: '#fff',
              fontSize: 12
            }
          },
          series: [
            {
              data: [],
              type: 'bar',
              barWidth: 12,
              itemStyle: {
                color: function (params) {
                  return params.dataIndex % 2 === 0 ? "#02affd" : '#30d6e7'
                },
                borderRadius: [5, 5, 0, 0]
              }
            }
          ]
        };
        this.rightzhuchart.setOption(option)
      })
    },
    initHuan() {
      this.$nextTick(() => {
        this.lrchart2 = echarts.init(this.$refs.lrchart2)
        this.lhchart1 = echarts.init(this.$refs.lhchart1)
        this.rhchart = echarts.init(this.$refs.rhchart)
      })
    },
    mysetOption(who, value) {
      who.setOption({
        backgroundColor: "#171f37",
        title: {
          text: '{a|' + value + '}{c|%}',
          x: 'center',
          y: 'center',
          textStyle: {
            rich: {
              a: {
                fontSize: 30,
                color: '#fff'
              },
              c: {
                fontSize: 18,
                color: '#fff'
              }
            }
          }
        },
        grid: { // 让图表占满容器
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px"
        },
        series: [
          {
            name: '吃猪肉频率',
            type: 'pie',
            radius: ['100%', '85%'],
            silent: true,
            clockwise: true,
            startAngle: 360 * 0.8 / 2 + 90,
            z: 0,
            zlevel: 0,
            label: {
              position: "center",
            },
            data: [{
              value: value,
              name: "",
              itemStyle: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: '#0d80fe' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#28E8FA' // 100% 处的颜色
                  }]
                },
              }
            },
            {
              value: 100 / 0.8 - 100 / 0.8 * (1 - 0.8) - value,
              name: "",
              label: {
                show: true
              },
              itemStyle: {
                color: '#3d4a5a'
              }
            },
            {
              value: 100 / 0.8 * (1 - 0.8),
              name: "",
              label: {
                show: false
              },
              itemStyle: {
                color: "rgba(0,0,0,0)"
              }
            }
            ]
          },
          {
            name: "",
            type: "gauge",
            radius: "8.7%",
            center: ['50%', '50%'],
            startAngle: -(-90 + 180 * (1 - 0.8)),
            endAngle: -(90 + 180 * 0.8),
            splitNumber: 36,
            axisTick: {
              show: false
            },
            splitLine: {
              length: 70,
              lineStyle: {
                width: 5,
                color: "#171f37"
              }
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            detail: {
              show: false
            },
            data: [{ value: 0, name: "" }]
          }
        ]

      })
    },

  }
}

</script>
<style scoped>
.turbine-box {
  position: absolute;
  left: 20%;
  top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.turbine-box .mask {
  position: absolute;
  left: 15px;
  top: 5px;
  width: 15px;
  height: 50px;
  z-index: 3;
}

.turbine-box .tubine {
  width: 40px;
  height: 40px;
  position: relative;
  z-index: 9999;
}

.turbine-box .tubine-running {
  animation: turbine 4s linear infinite;
}

.turbine-box .tubine-tower {
  height: 35px;
  margin-top: -20px;
  position: relative;
  z-index: 9998;
}

.home {
  width: 100%;
  height: calc(100% - 85px);

}

.main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 15px;
  padding-top: 25px;
  box-sizing: border-box;
  background-color: #071022;

}




.echartFont {
  font-size: 16px
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 470px;
  height: 100%;
  /* padding-left: 30px;
  padding-right: 22px; */
  box-sizing: border-box;
}

.left .leftDate {
  display: flex;
  flex-shrink: 0;
  height: 170px;
  letter-spacing: 2px;
  justify-content: space-between;
  background-color: #171f37;
  border-radius: 10px;
  padding-left: 30px;
  padding-right: 40px;
  box-sizing: border-box;
}

.leftDate .dateCloud,
.dateInfo {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  height: 100%;
  font-size: 18px;
  box-sizing: border-box;
}

.leftDate .dateCloud {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140px;
  padding: 25px 0;
  color: #949cb7;
}

.leftDate .dateInfo {
  align-items: end;
  padding-top: 15px;
  color: #ffffff;
  padding-bottom: 25px
}

.dateInfo .smallday {
  font-size: 15px;
}

.running {
  display: flex;
  flex-direction: column;
  flex: 89;
  padding: 15px 0;
  padding-left: 30px;
  padding-right: 22px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #171f37;
  margin: 15px 0;
}

.changjingBar {
  display: flex;
  text-align: left;
  width: 415px;
  flex: 1;
  color: #989db6;
}

.changjingBar.f2 {
  padding-left: 25px;
}

.changjingBar .changjing {
  flex: 1;
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 3px;
  border-bottom: 3px solid #545763;
}

.changjingBar .changjing.gs {
  border-color: #676fee;
}

.runningDetail {
  display: flex;
  justify-content: space-between;
  flex: 18;
  padding-right: 5px;
  box-sizing: border-box;
  margin-top: 25px;
}

.runningDetail .runninglist {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.runningDetail .runninglist .listItem {
  display: flex;
  /* padding: 15px 0; */
  width: 200px;
  justify-content: space-between;
}

.listItem .listText {
  color: #989db6;
  font-size: 16px;
}

#prectHuan {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 140px;
  color: #ffffff;
  align-items: center;
  justify-content: center,
}

.runningEchart .pre,
.basepre {
  position: absolute;
  left: 50%;
  top: 45%;
  font-size: 28px;
  transform: translate(-50%, -50%);
}

.listItem .listNum {
  color: #ffffff;
  font-size: 14px;
}

.baseInfo {
  display: flex;
  flex-direction: column;
  /* height: 310px; */
  flex: 61;
  padding: 15px 0;
  padding-left: 30px;
  padding-right: 22px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #171f37;
}

.itemTitle {
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 23px;
  color: #ffffff;
  flex: 3;
}

.baseInfoDetail {
  display: flex;
  flex: 18;
  padding-right: 5px;
  box-sizing: border-box;
  margin-top: 25px;
}

.baseInfoDetail .baseInfolist {
  display: flex;
  flex: 1;
  width: 180px;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}



.baseInfoDetail .baseInfolist .listItem {
  display: flex;
  /* padding: 7px 0; */
  width: 170px;
  justify-content: space-between;
}

.listItem .listText {
  color: #989db6;
  font-size: 16px;
}

.listItem .listNum {
  color: #ffffff;
  font-size: 14px;
}



.middle {
  display: flex;
  flex-direction: column;
  width: 915px;
  height: 100%;
}

.middleTabs {
  display: flex;
  padding-right: 0;
  box-sizing: border-box;
  align-items: center;
  height: 95px;
  border-radius: 10px;
  background-color: #181e38;
}

.mTab {
  flex: 1;
  display: flex;
  align-items: center;
  height: 65px;
}

.mTab .tabIcon {
  margin-left: 26px;
}

.mTab .tabInfo {
  display: flex;
  margin-left: 20px;
  flex-direction: column;
  justify-content: space-between;
  height: 65px;
  font-size: 18px;
  text-align: left;
}

.tabInfo .tabInfoText {

  color: #989db6;
}

.tabInfo .tabInfoNum {
  font-size: 20px;
  color: #ffffff;
}

.tabInfo .tabInfoNum .tabInfoNumDw {
  font-size: 14px;
}

.tabLine {
  width: 2px;
  height: 50px;
  background-color: #6e7279;
}

.middleMap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 64;
  background-image: url("../assets/images/bg_map01.png");
  background-position: center;
  background-size: cover;
  background-size: 100% 100%;
  background-repeat: no-repeat;

}

.map {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.map .mapicon {
  position: absolute;
  left: 50%;
  top: 50%;
}

.map .mapimg {
  width: 65%;
}

.map .greenIcon {
  position: absolute;
}


.map .greenIcon.icon1 {
  /* left: 415px;
  top: 210px; */
  left: 50%;
  top: 40%;
}

.map .greenIcon.icon2 {
  left: 60%;
  top: 70%;
}

.map .greenIcon.icon3 {
  right: 24%;
  bottom: 27%;
}

.map .whiteIcon {
  position: absolute;
}

.map .whiteIcon.whiteIcon1 {
  left: 52%;
  top: 40%;
}

.map .whiteIcon.whiteIcon2 {
  right: 26%;
  bottom: 23%;
}

.map .whiteIcon.whiteIcon3 {
  right: 35%;
  bottom: 23%;
}

.map .whiteIcon.whiteIcon4 {
  right: 37%;
  bottom: 23%;
}

.map .whiteIcon.whiteIcon5 {
  right: 35%;
  bottom: 26%;
}

.map .whiteIcon.whiteIcon6 {
  right: 37%;
  bottom: 26%;
}

/* .map img{
  width: 730px;
  height: 640px;
} */
.middleMap .column {
  display: flex;
  position: absolute;
  top: 20px;
  right: 0;
  width: 140px;
  flex: 1;
  height: 50%;
  padding: .8vh 0;
  padding-left: 10px;

  box-sizing: border-box;
  border-radius: 10px;
  background-color: rgba(22, 40, 69, .8);
}

.columnIcons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* height: 320px; */
  width: 25px;
  padding-top: 10px;
  padding-bottom: 5px;
  box-sizing: border-box;
  background-color: rgba(6, 19, 48, .6);
}

.columnIcons img {
  width: 13px;
  height: 13px;
}

.columnTitles {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 5px;
  box-sizing: border-box;
  width: 85px;
  font-size: 14px;
  margin-left: 15px;
  background-color: rgba(6, 19, 48, .6);
}

.columnTitle {
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
}

.columnTitles .columnTitle.title1 {
  color: #34b638;
}

.columnTitles .columnTitle.title2 {
  color: #69a568;
}

.columnTitles .columnTitle.title3 {
  color: #c68e1a;
}


.columnTitles .columnTitle.title4 {
  color: #c41d15;
}

.columnTitles .columnTitle.title5 {
  color: #cdd605;
}

.columnTitles .columnTitle.title6 {
  color: #b65ad3;
}

.columnTitles .columnTitle.title7 {
  color: #6e71e5;
}

.columnTitles .columnTitle.title8 {
  color: #53d5ef;
}

.columnTitles .columnTitle.title9 {
  color: #9ea0a3;
}

.middleMap .complete {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 140px;
  height: 52%;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #16203a;
}

.middleMap .complete .com {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: .2vh;
  font-size: 15px;
  color: #ffffff;
}

.com .comtext {
  margin-top: 1vh;
}

.middleCharts {
  display: flex;
  flex-direction: column;
  /* height: 170px; */
  flex: 17;

  padding: 10px 20px;
  padding-top: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #171f37;
}

.mchartsTab {
  display: flex;
  padding-left: 110px;
  flex: 1;
  padding-top: 5px;
  font-size: 12px;
  box-sizing: border-box;
  color: #fff;
}

.mchartsTab .mcTab {
  display: flex;
  align-items: center;
  margin: 0 20px;
  height: 100%;
}

.mcTab .mTabLine {
  height: 2px;
  width: 18px;

}

.mcTab .mTabText {
  margin-left: 8px;
}

.mTabLine.line1 {
  background-color: #f2a02b;

}

.mTabLine.line2 {
  background-color: #2650c7;

}

.mTabLine.line3 {
  background-color: #f729a2;

}

.mTabLine.line4 {
  background-color: #19af82;
}

.middleCharts .middleChart {
  position: relative;
  flex: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0;
  padding-bottom: 5px;
  box-sizing: border-box;
}




.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 470px;
  height: 100%;
  /* padding-left: 30px;
  padding-right: 22px; */
  box-sizing: border-box;
}

.rightHuan {
  width: 140px;
  height: 140px;
  font-size: 12px;
}

.right .stats {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 170px;
  padding: 15px 50px 25px 25px;
  box-sizing: border-box;
  background-color: #171f37;
  border-radius: 10px;
}

.echartFont {
  font-size: 16px;
}

.right .stats .statsitem {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 18px
}

.right .stats .statsitem .statsname {
  color: #989db6;
}

.right .stats .statsitem .statsnum {
  color: #ffffff;
}

.right .stats .statsitem .statsnumDw {
  font-size: 14px;
}

.right .fadian {
  display: flex;
  flex-direction: column;
  flex: 89;
  margin: 15px 0;
  padding: 15px 0;
  box-sizing: border-box;
  padding-left: 25px;
  background-color: #171f37;
  border-radius: 10px;
}

.fadian .faDianHeader {
  padding-left: 25px;
}

.fadian .faDianChartCon {
  display: flex;
  flex: 18;
  margin-top: 25px;
  justify-content: center;
  width: 100%;
}

.fadian .faDianChart {
  width: 100%;
  padding-right: 25px;
  box-sizing: border-box;
}

.right .rightBase {
  display: flex;
  flex-direction: column;
  flex: 61;
  padding: 15px 0;
  background-color: #171f37;
  border-radius: 10px;
  padding-left: 25px;
  padding-right: 20px;
  box-sizing: border-box;
}

.rightBase .rightDetail {
  display: flex;
  justify-content: space-between;
  padding-right: 7px;
  box-sizing: border-box;
  flex: 18;
  margin-top: 25px;
}

.rightDetail .rightDetailInfos {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.rightDetail .rightDetailInfos .rdInfo .rdInfoData {
  display: flex;
  color: #ffffff;
  font-size: 14px;
  margin-top: 5px;
}

.rightDetail .rightDetailInfos .rdInfo .rdInfoTitle {
  font-size: 16px;
  color: #8088a0;
}

.rightDetail .rightDetailInfos .rdInfo .rdInfoData .rdInfoDataDw {
  margin-left: 10px;
}


.detailpre {
  position: absolute;
  top: 45%;
  left: 50%;
  font-size: 28px;
  transform: translate(-50%, -50%)
}

.itemTitle {
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 23px;
  color: #ffffff;
  flex: 3;
}

.changjingBar {
  display: flex;
  text-align: left;
  width: 415px;
  flex: 1;
  color: #989db6;
}



.changjingBar .changjing {
  flex: 1;
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 3px;
  border-bottom: 3px solid #545763;
}

.changjingBar .changjing.gs {
  border-color: #676fee;
}
</style>
