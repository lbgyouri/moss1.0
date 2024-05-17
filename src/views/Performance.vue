<template>
  <div class="fault">
    <iframe width="100%" height="100%" class="trub_frame" frameborder="no" marginwidth="0" marginheight="0"
      scrolling="no" allowtransparency="yes" :src='src'></iframe>
    <!-- <div class="faultTabCon">
      <div class="faultTab">
        <div class="tabs">
          <template v-for="(item, index) in tabsname">
            <div class="tabItem" @click="tabcurrindex = index" :class="{ 'tabactive': tabcurrindex == index }">{{ item
              }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="faultmain">
      <div class="perforTabs">
        <template v-for="(item, index) in pertabname">
          <div class="perTab" @click="currindex = index" :class="{ 'active': currindex == index }">{{ item }}</div>
        </template>
      </div>
      <div class="select">
        <div class="selectBar">
          <template>
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                全部风场
                <a-icon type="caret-down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  1st menu item
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          <div class="splite"></div>
          <template>
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                全部类型
                <a-icon type="caret-down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  1st menu item
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          <div class="splite"></div>
          <template>
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                全部风机
                <a-icon type="caret-down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  1st menu item
                </a-menu-item>
                <a-menu-item key="1">
                  1st menu item
                </a-menu-item>
                <a-menu-item key="1">
                  1st menu item
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          <div class="splite"></div>
          <selectDate></selectDate>
        </div>
        <div class="selectBtns">
          <div class="query">添加</div>
          <div class="reset">查询</div>
          <div class="reset">导出</div>
        </div>

      </div>
      <div class="echart" ref="mechart">

      </div>
    </div> -->
  </div>
</template>
<script>
import * as echarts from 'echarts';
import selectDate from '../components/selectDate.vue'
export default {
  components: {
    selectDate
  },
  data() {
    return {
      currindex: 0,
      src:'http://150.158.31.201:8081/#/performances/turbine/power-scatter-diagram',
      tabcurrindex: 0,
      pertabname: ['功率散点图', '功率曲线分析', '历史功率曲线', '参数对比分析',
        '风速分布分析', '控制策略分析', '对标分析', '状态分析'],
      tabsname: ['风机类', '光伏类', '功率预测', '数据导出'],
      data: [
        [96.24, 11.35],
        [33.09, 85.11],
        [57.6, 36.61],
        [36.77, 27.26],
        [20.1, 6.72],
        [45.53, 36.37],
        [110.07, 80.13],
        [72.05, 20.88],
        [39.82, 37.15],
        [48.05, 70.5],
        [0.85, 2.57],
        [51.66, 63.7],
        [61.07, 127.13],
        [64.54, 33.59],
        [35.5, 25.01],
        [226.55, 664.02],
        [188.6, 175.31],
        [81.31, 108.68]
      ],
      mchart: null,
    }
  },

  mounted() {
    //this.initEchart()
  },
  methods: {
    initEchart() {
      this.mchart = echarts.init(this.$refs.mechart)
      console.log(this.mchart)
      const option = {
        grid: {
          left: '10%',
          containLabel: true
        },
        title: {
          text: '图表标题',
          textStyle: {
            color: '#d9f2ff',
            fontSize: 18,
            fontWeight: 'bold'
          },
          left: 'center',
          top: 20
        },
        xAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: "#d9f2ff",
            }
          },
          axisTick: {
            show: false  // 取消横轴的刻度线显示
          },
          axisLine: {
            show: true,  // 显示横轴的轴线
            lineStyle: {
              width: 2, // 设置纵轴轴线的粗细为 2
              color: "#d9f2ff"
            }
          },
          data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25],
          axisLabel: {
            interval: 4,
            width: 8,
            color: '#fff',  //更改坐标轴文字颜色
            fontSize: 13
          },
          name: '风速(m/s)',
          nameLocation: 'center',  // 将名称放在横轴末尾
          nameTextStyle: {
            fontSize: 16, // 坐标轴名称的字体大小
            color: '#d9f2ff',
          },
          nameGap: 30  // 名称与横轴之间的距离
        },
        yAxis: {
          axisLine: {
            show: true,  // 显示横轴的轴线
            lineStyle: {
              width: 2, // 设置纵轴轴线的粗细为 2
              color: "#d9f2ff"
            }
          },
          name: '功率(kW)',
          nameLocation: 'center',
          nameTextStyle: {
            fontSize: 16,// 坐标轴名称的字体大小
            color: '#d9f2ff',
          },
          nameGap: 30,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: "#d9f2ff",
            }
          },
          axisLabel: {
            color: '#d9f2ff'  // 设置纵轴轴线文字的颜色
          }
        },
        series: [
          {
            symbolSize: 10,
            data: [
              [10.0, 8.04],
              [8.07, 6.95],
              [13.0, 7.58],
              [9.05, 8.81],
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [14.0, 8.96],
              [12.5, 6.82],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68]
            ],
            type: 'scatter'
          },
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
              color: 'orange',
              width: 2
            },
            markLine: {
              symbol: ['none', 'none'],
              label: { show: false },
            },
            areaStyle: {
              color: 'rgba(226,141,41,.5)'
            },
            // data: [
            //   1000, 2000, 1000, 5000, 3500, 2800, 4000, 900
            // ]
          },
        ]
      };
      this.mchart.setOption(option)
    }
  }
}
</script>

<style scoped>
.ant-dropdown-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 165px;
  height: 100%;
  padding: 8px 10px;
  font-size: 16px;
  color: #989db6;
  box-sizing: border-box;
  border-radius: 7px;
  background-color: #2f3d55;
}

.ant-dropdown-link.antlong {
  width: 260px;
}


.fault {
  display: flex;
  flex-direction: column;
  width: 1920px;
  height: calc(100% - 85px);
  padding: 15px;
  padding-top: 25px;
  box-sizing: border-box;
  background-color: #080f22;


}

.faultTabCon {
  display: flex;
  justify-content: right;
  width: 100%;
  height: 65px;
}

.faultTab {
  height: 100%;
  width: 525px;
  padding: 8px 15px;
  box-sizing: border-box;
  border-radius: 10px 10px 0 0;
  background-color: #19203b;
}

.tabs {
  display: flex;
  width: 100%;
  height: 45px;
  padding: 3px 5px;
  box-sizing: border-box;
  border-radius: 7px;
  background-color: #31415b;
}

.tabItem {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-radius: 5px;
  color: #989db6;
  flex: 1;
  height: 100%;
  cursor: pointer;
}

.faultmain {
  width: 100%;
  flex: 162;
  padding: 0 15px;
  box-sizing: border-box;
  border-radius: 10px 0 10px 10px;
  background-color: #19203b;
}

.perforTabs {
  display: flex;
  justify-content: space-between;
  width: 1410px;
  font-size: 16px;
  color: #989db6;
}

.perTab {
  width: 150px;
  letter-spacing: 1px;
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
  border-bottom: 2px solid #53606e;
}

.select {
  display: flex;
  height: 40px;
  box-sizing: border-box;
  margin: 25px 0;
}

.selectBar {
  display: flex;
  height: 100%;
  align-items: center;
}

.selectBtns {
  display: flex;
  margin-left: 20px;
}

.query,
.reset {
  width: 70px;
  height: 100%;
  background-color: #1e82e3;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  border-radius: 7px;
}

.reset {
  margin-left: 10px;
}



.splite {
  width: 20px;
  height: 2px;
  margin: 0 3px;
  background-color: #898989;
}

.echart {
  width: 455px;
  height: 490px;
  background-color: #081527;
}

.active {
  color: #5c81e0;
  border-color: #5c81e0;
}

.tabactive {
  background-color: #1f8efa;
  color: #fff;
}
</style>