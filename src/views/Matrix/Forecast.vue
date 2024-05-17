<template>
  <div class="forecast">
    <plantTitle2></plantTitle2>
    <div class="content">
      <div class="infos">
        <div class="list">
          <div class="listitem">
            <div class="name">日累计发电量预测</div>
            <div class="data">
              <div class="datanum">{{ ((forecastData && forecastData.predPowerGen) ? forecastData.predPowerGen.today :
                0)
                | toWKWh}}</div>
              <div class="unit">万kWh</div>
            </div>
          </div>
          <div class="listitem">
            <div class="name">昨日发电量预测</div>
            <div class="data">
              <div class="datanum">{{ ((forecastData && forecastData.predPowerGen) ? forecastData.predPowerGen.yesterday
                : 0) | toWKWh }}</div>
              <div class="unit">万kWh</div>
            </div>
          </div>
          <div class="listitem">
            <div class="name">昨日发电量</div>
            <div class="data">
              <div class="datanum">{{ ((forecastData && forecastData.powerGen) ? forecastData.powerGen.yesterday : 0) |
                toWKWh }}</div>
              <div class="unit">万kWh</div>
            </div>
          </div>
          <div class="Percent">
            <div class="chart1" ref="chart1"></div>
            <div class="complate">预测完成</div>
          </div>
        </div>
        <div class="chart2" ref="chart2"></div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import formatChartData from '@/util/mix'
import plantTitle2 from '@/components/matrixcpn/plantTitle2.vue';
import { Getforecast, GetPowers } from '@/service/index'
export default {
  mixins: [formatChartData],
  components: {
    plantTitle2
  },
  data() {
    return {
      src: 'http://150.158.31.201:8081/#/all-type/prediction2?plantId=300001',
      forecastData: {},
      chart1: null,
      chart2: null,
      timer:null,
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted() {
    this.forecastAction()
    this.PowersAction()
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        setTimeout(() => {
          this.forecastAction()
          this.PowersAction()
        }, 0)
      }, 3000)
    }
  },
  filters: {
    toWKWh: function (value) {
      if (value instanceof Array) {
        for (var i = 0; i < value.length; i++) {
          value[i] = parseFloat((value[i] / 10).toFixed(2))
        }
      } else {
        if (value) {
          value = (parseFloat((value)) / 10).toFixed(2)
        }
      }
      return value || 0.00
    }
  },
  methods: {
    async forecastAction() {
      const res = await Getforecast({
        level: 'plant',
        id: 300001
      })
      const result = this.parseCallBack(res.data)
      this.forecastData = result
      let num = (result.comRate.today || 0).toFixed(2)
      console.log(this.forecastData, '预测')
      this.chart1 = echarts.init(this.$refs.chart1)
      this.mysetOption(this.chart1, num)
    },
    async PowersAction() {
      const res = await GetPowers({
        level: 'plant',
        id: 300001,
        term: 'h'
      })
      const result = this.parseCallBack(res.data)
      this.powersData = result
      this.setLineChart(result)
    },
    setLineChart(data) {
      if (this.chart2) {
        this.chart2.dispose()
      }
      let dom = this.$refs.chart2
      if (dom) {
        this.chart2 = echarts.init(dom)
        var option = this.renderPowerLine(data)
        this.chart2.setOption(option)
      }

    },
    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },
    renderPowerLine(data) {
      var all = this.getAllTime(data.data);
      var all1 = this.getAllTime(data.data1);
      var all2 = this.getAllTime(data.data2);
      let timeList = all.time
      if (all.time.length > 2) {
        timeList = all.time
      } else if (all1.time.length > 2) {
        timeList = all1.time
      } else if (all2.time.length > 2) {
        timeList = all2.time
      }

      return {
        animation: false,
        grid: {
          left: 80,
          top: 30,
          right: 80,
          bottom: 10,
          containLabel: true
        },
        legend: {
          show: true,
          data: [
            { name: '实时功率', icon: 'roundRect' },
            { name: '参考功率', icon: 'roundRect' },
            { name: '风速', icon: 'roundRect' },
            { name: '短期预测', icon: 'roundRect' },
            { name: '超短期预测', icon: 'roundRect' }
          ],
          top: 0,
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [{
          data: timeList,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#FBFBFC'
            }
          }
        }, {
          data: all1.time.length > 2 ? all1.time : timeList,
          show: false,
          axisLine: {
            lineStyle: {
              color: '#FBFBFC'
            }
          }
        }, {
          data: all2.time.length > 2 ? all2.time : timeList,
          show: false,
          axisLine: {
            lineStyle: {
              color: '#FBFBFC'
            }
          }
        }],
        yAxis: [{
          name: 'MW',
          nameRotate: 90,
          nameGap: 50,
          nameLocation: "middle",
          boundaryGap: [0, '50%'],
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ffffff'
            }
          }
        }, {
          name: 'm/s',
          min: 0,
          max: 25,
          nameRotate: 90,
          nameGap: 50,
          nameLocation: "middle",
          boundaryGap: [0, 0],
          splitLine: {
            show: true
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#FBFBFC'
            }
          }
        }],
        series: [
          this.setSeries(all.data, '实时功率', 0, 0, 0, '#D71702'),
          this.setSeries(all.data, '参考功率', 0, 0, 1, '#EFF905'),
          this.setSeries(all.data, '风速', 0, 1, 2, '#00DA23'),
          this.setSeries(all1.data, '短期预测', 1, 0, 0, '#c766c4'),
          this.setSeries(all2.data, '超短期预测', 2, 0, 0, '#0dd4d6')
        ]
      }
    },
    getAllTime(data) {
      let step = 15
      var newData = {};
      var time = [];
      let index = 0
      let min = 0
      let time1 = []
      let time2 = []
      for (let key in data) {
        if (index == 0) {
          time1 = key.split(':')
        }
        if (index == 1) {
          time2 = key.split(':')
          index++
          break
        }
        index++
      }
      if (!index) {
        return {
          time: [],
          data: {}
        }
      }
      if (index == 2) {
        if (time1[0] == time2[0]) {
          step = ~~(time2[1]) - ~~(time1[1])
        } else {
          step = ~~(time2[1]) + 60 - ~~(time1[1])
        }
      }
      let c0 = ~~time1[0]
      let c1 = ~~time1[1]
      for (let i = 0; i < 60 * 24; i++) {
        if (c0 > 0) {
          if (c1 - step > 0) {
            c1 = c1 - step
          } else {
            c0 = c0 - 1
            c1 = c1 + 60 - step
          }
        } else {
          if (c1 - step > 0) {
            c1 = c1 - step
          } else {
            break
          }
        }
      }
      min = c1
      if (min != 0) {
        newData['00:00'] = [null]
        time.unshift('00:00')
      }
      for (var i = min; i <= 60 * 24; i += step) {
        var h = ~~(i / 60);
        var m = ~~(i % 60);
        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;
        var t = h + ':' + m;
        time.push(t);
        newData[t] = data[t] || data[t + ':00'] || [null];
        if (!(newData[t] instanceof Array)) {
          newData[t] = [newData[t]];
        }
      }
      if (time[time.length - 1] != '24:00') {
        newData['24:00'] = [null]
        time.push('24:00')
      }
      return {
        time: time,
        data: newData
      }
    },
    setSeries(data, name, x, y, i, color) {
      return {
        name: name,
        type: 'line',
        xAxisIndex: x,
        yAxisIndex: y,
        showSymbol: false,
        hoverAnimation: false,
        itemStyle: {
          normal: {
            color: color,
            lineStyle: {
              width: 1
            }
          }
        },
        lineStyle: {
          color: color
        },
        data: this.extract(data, i)
      }
    },
    mysetOption(who, value) {
      who.setOption({
        backgroundColor: "#19203b",
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
              length: 90,
              lineStyle: {
                width: 5,
                color: "#19203b"
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
.forecast {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 5px;
  background-color: #222b4f;
}

.content {
  flex: 1;
}

.infos {
  display: flex;
  padding-top: 20px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}

.list {
  padding: 0 15px;
  height: 560px;
  width: 450px;
  box-sizing: border-box;
  background-color: #19203b;
}

.listitem {
  padding: 10px 15px;
  height: 70px;
  width: 100%;
  margin: 20px 0;
  box-sizing: border-box;
  background-color: #222b4f;
}

.data {
  display: flex;
  align-items: baseline;
  justify-content: right;
}

.name {
  color: #989db6;
  font-size: 18px;
}

.datanum {
  color: #989db6;
  font-size: 20px;
  margin-right: 5px;
}

.unit {
  font-size: 12px;
  color: #f06e4a;
}

.chart2 {
  width: 1380px;
  height: 560px;
}

.chart1 {
  width: 100%;
  height: 200px;
}

.complate {
  font-size: 23px;
  margin-top: 10px;
  color: #fff;
  text-align: center;
}
</style>