<template>
  <div style="flex: 1; display: flex;flex-direction: column;">
    <div class="select">
      <div class="selectBar">
        <template>
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{ currPlant }}
              <a-icon type="caret-down" />
            </a>
            <a-menu slot="overlay">
              <template v-for="item in plantList">

                <a-menu-item @click="currPlantf(item.name, item.id)">
                  {{ item.name }}
                </a-menu-item>

              </template>
            </a-menu>
          </a-dropdown>
        </template>
        <div class="splite"></div>
        <template>
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{ currKind }}
              <a-icon type="caret-down" />
            </a>
            <a-menu slot="overlay">
              <template v-for="item in plantTypeList">
                <a-menu-item @click='currKindf(item.name, item.id)'>
                  {{ item.name }}
                </a-menu-item>
              </template>
            </a-menu>
          </a-dropdown>
        </template>
        <div class="splite"></div>
        <template>
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{ currJiqi }}
              <a-icon type="caret-down" />
            </a>
            <a-menu slot="overlay" style="height: 300px;overflow-y: scroll;">
              <template v-for="item in turbineList">
                <a-menu-item @click="currJiqif(item.name, item.id)">
                  {{ item.name }}
                </a-menu-item>
              </template>

            </a-menu>
          </a-dropdown>
        </template>



        <div class="splite"></div>

        <div class="range" @mouseenter="entericon" @mouseleave="leaveicon">
          <a-config-provider :locale="locale">
            <!-- <a-range-picker :allowClear="true" @change="onChange" style="width: 255px;height: 36px;border-radius: 5px;
              padding-left: 8px;box-sizing: border-box;">
              <a-icon slot="suffixIcon" type="smile" />
              <div class="pickerCon">
                <div class="dateicon">
                  <img src="../../assets/images/date.png" alt="">
                </div>
                <div class="pickerText">{{ currDate }}</div>
              </div>
            </a-range-picker> -->
            <a-date-picker :allowClear="true" :locale="locale" @change="onChange" style="width: 255px;height: 36px;border-radius: 5px;
              padding-left: 8px;box-sizing: border-box;">
              <a-icon slot="suffixIcon" type="smile" />
              <div class="pickerCon">
                <div class="dateicon">
                  <img src="../../assets/images/date.png" alt="">
                </div>
                <div class="pickerText">{{ currDate }}</div>
              </div>
            </a-date-picker>
          </a-config-provider>
        
          <a-icon style="color:#989db6;font-size: 16px;" v-show="isDateIcon" type="caret-down" />
          <a-icon style="color:#989db6;font-size: 16px;" @click="clearDate" v-show="!isDateIcon" type="close-circle" />
        </div>
      </div>
      <div class="selectBtns">
        <div class="query" @click="submit">查询</div>
        <div class="reset" @click="reset">重置</div>
      </div>

    </div>

    <div class="mainList">
      <div class="ooo" style="overflow-x: scroll;flex: 1;">
        <div class="listTitleTabs">
          <template v-for="item in faultSummaryData.header">
            <div class="titleTab tab1">{{ item }}</div>
          </template>

        </div>
        <div class="listItemCon">
          <template v-for="item in faultSummaryData.data">
            <div class="listItems">
              <template v-for="iitem in item">
                <div class="listItemInfo">{{ iitem }}</div>
              </template>

            </div>
          </template>
        </div>
      </div>
      <div class="pagination">

        <div class="shouye" @click="shouye">首页</div>
        <div class="pre" @click="pre">上一页</div>
        <div class="pageinfo">{{ selectParams.page }}/{{ totalPage }}</div>
        <div class="next" @click="next">下一页</div>
        <div class="weiye" @click="weiye">尾页</div>

      </div>
    </div>
    <div class="mask" v-show="loading">
      <div class="loading">
        <img src="../../assets/images/loading.gif" alt="">
        <div class="loadingtext">加载中</div>
      </div>
    </div>
  </div>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { GetFaultSummary, GetWarnningType } from '@/service/index'
export default {
  data() {
    return {
      currPlant: '全部风场',
      currKind: '全部类型',
      currKindId: '',
      currJiqi: '全部风机',
      currJiqiId: '',
      startTime: '',
      endTime: '',
      locale: zhCN,
      currDate: '请选择起始日期',
      isDateIcon: true,
      faultSummaryData: [],
      totalPage: 1,
      loading: false,
      selectParams: {
        page: 1,
        parame: 'auto',
        plantId: 300001,
        rows: 13,
        model: '',
        turbId: '',
        // beginTime: '2024-04-06',
        // endTime: '2024-05-06'
      },
      plantList: [{
        id: '',
        name: '全部风场'
      },
      {
        "id": 300001,
        "name": "大庆海智"
      },],
      plantTypeList: [{
        id: '',
        name: '全部类型'
      }],
      turbineList: [{
        id: '',
        name: '全部风机'
      }],


      listItem: [
        {
          fj: 'F11',
          lx: 'EN156-988',
          bj: '故障',
          gz: '30430',
          nr: '上位限功率',
          time: '3分11秒',
          start: '2024-03-12 20:39:07',
          end: '2024-03-12 20:39:07'
        },
        {
          fc: '乐胜风机',
          fj: 'F11',
          lx: 'EN156-988',
          bj: '故障',
          gz: '30430',
          nr: '上位限功率',
          time: '3分11秒',
          start: '2024-03-12 20:39:07',
          end: '2024-03-12 20:39:07'
        },
        {
          fc: '乐胜风机',
          fj: 'F11',
          lx: 'EN156-988',
          bj: '故障',
          gz: '30430',
          nr: '上位限功率',
          time: '3分11秒',
          start: '2024-03-12 20:39:07',
          end: '2024-03-12 20:39:07'
        },
        {
          fc: '乐胜风机',
          fj: 'F11',
          lx: 'EN156-988',
          bj: '故障',
          gz: '30430',
          nr: '上位限功率',
          time: '3分11秒',
          start: '2024-03-12 20:39:07',
          end: '2024-03-12 20:39:07'
        },
        {
          fc: '乐胜风机',
          fj: 'F11',
          lx: 'EN156-988',
          bj: '故障',
          gz: '30430',
          nr: '上位限功率',
          time: '3分11秒',
          start: '2024-03-12 20:39:07',
          end: '2024-03-12 20:39:07'
        }
      ]
    }
  },
  created() {
    this.WarnningAction()
  },
  methods: {
    async WarnningAction() {
      this.loading = true
      const res = await GetFaultSummary(this.selectParams)
      const result = this.parseCallBack(res.data)
      if (result.data) {
        this.loading = false
      }
      this.faultSummaryData = result
      this.totalPage = result.pages
      console.log(result, 'warringTotal')
    },
    async getPlantType(plantId) {
      const res = await GetWarnningType({
        level: 'ftype',
        plantId
      })
      const result = this.parseCallBack(res.data)
      this.plantTypeList = [{
        id: 0,
        name: '全部类型'
      }]
      this.plantTypeList = [...this.plantTypeList, ...result.models]
      console.log(this.plantTypeList, '类型')
      // if (this.params.plantId) {
      //   if (this.params.type) {
      //     this.plantTypeList.forEach(v => {
      //       if (v.name == this.params.type) {
      //         this.plantTypeValue = v.id
      //         this.getList()
      //         this.getTurbines(this.params.plantId, v.id)
      //       }
      //     })
      //   } else {
      //     this.getList()
      //   }
      // }

    },
    async getTurbines(plantId, model) {
      const res = await GetWarnningType({
        level: 'wmachine',
        plantId,
        model: 3
      })
      const result = this.parseCallBack(res.data)
      this.turbineList = [...this.turbineList, ...result.turbines]
      console.log(this.turbineList, '机器')
    },
    currPlantf(name, id) {
      this.currPlant = name
      this.getPlantType(id)
      console.log(id)
    },
    currKindf(name, id) {
      this.currKind = name
      this.currKindId = id
      console.log(id)
      this.getTurbines(300001)
    },
    currJiqif(name, id) {
      this.currJiqi = name
      this.currJiqiId = id
      console.log(id)
    },

    submit() {
      this.selectParams.model = this.currKindId
      this.selectParams.turbId = this.currJiqiId
      // this.selectParams.beginTime = this.startTime
      // this.selectParams.endTime = this.endTime
      console.log(this.selectParams)
      this.WarnningAction()
    },
    reset() {
      this.selectParams = {
        page: 1,
        parame: 'auto',
        plantId: 300001,
        rows: 13,
        model: '',
        turbId: '',
      }
      this.currPlant = '全部风场'
      this.currKind = '全部类型'
      this.currJiqi = '全部风机'
      this.currDate = '请选择起始日期'
      this.WarnningAction()
    },
    onChange(date, datestring) {
      this.currDate =datestring
      this.startTime = datestring
      // this.endTime = datestring[1]
      console.log(date,datestring)
    },
    clearDate() {
      this.currDate = '请选择起始日期'
      this.isDateIcon = true
    },
    entericon() {
      if (this.currDate !== '请选择开始到结束日期') {
        this.isDateIcon = false
      }
    },
    leaveicon() {
      if (this.currDate !== '请选择开始到结束日期') {
        this.isDateIcon = true
      }
    },
    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },
    pagechange(page, pagesize) {
      this.selectParams.page = page
      this.WarnningAction()
    },
    pre() {
      if (this.selectParams.page > 1) {
        this.selectParams.page--
        this.WarnningAction()
      }

    },
    next() {
      if (this.selectParams.page < this.totalPage) {
        this.selectParams.page++
        this.WarnningAction()
      }

    },
    shouye() {
      this.selectParams.page = 1
      this.WarnningAction()
    },
    weiye() {
      this.selectParams.page = this.totalPage
      this.WarnningAction()
    },
    changePlant(key) {
      console.log(key)
    }

  }
}

</script>

<style scoped>
::v-deep .ant-pagination-item-link {
  font-size: 25px;
  color: #989db6;
}

/* 定义滚动条的样式 */
.ooo::-webkit-scrollbar {
  height: 8px;
}

/* 定义滚动条滑块的样式 */
.ooo::-webkit-scrollbar-thumb {
  height: 5px;
  background-color: #1663af;
  /* 设置滑块的背景颜色 */
  border-radius: 4px;
  /* 设置滑块的圆角 */
}

/* 定义滚动条滑道的样式 */
.ooo::-webkit-scrollbar-track {
  height: 5px;
  border-radius: 4px;
  background-color: #989db6;
  /* 设置滑道的背景颜色 */
}

::v-deep .ant-pagination-item a {
  font-size: 25px;
  color: #989db6;
  margin: 0 8px;
}

::v-deep .ant-pagination-item-active {
  background-color: transparent;
  border: 0;
}

::v-deep .ant-pagination-item-active a {
  color: #fff;
}

.listItems:nth-child(2n) .listItemInfo {
  background-color: #222c47;
}

.ant-dropdown-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 165px;
  height: 40px;
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

.range {
  display: flex;
  align-items: center;
  height: 40px;
  width: 180px;
  padding-right: 8px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #080f22;
  border: 2px solid #1d6fc5;
}

.pickerCon {
  display: flex;
  height: 100%;
  width: 100%;
  font-size: 16px;
  align-items: center;
  color: #989db6;
}

.pickerCon .dateicon img {
  width: 20px;
  height: 20px;
}

.pickerCon .pickerText {
  margin-left: 5px;
}

/* .ant-calendar-picker {
    display: flex;
    width: 165px;
    height: 100%;
    color: #fff;
    background-color: #2f3d55;
  } */
.ant-calendar-picker-input.ant-input {
  color: rebeccapurple !important;
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
  width: 405px;
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
  color: #989db6;
  flex: 1;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
}

.faultmain {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  padding: 0 15px;
  box-sizing: border-box;
  border-radius: 10px 0 0 0;
  background-color: #19203b;
}

.select {
  display: flex;
  align-items: center;
  height: 85px;
  padding-left: 15px;
  box-sizing: border-box;
  border-radius: 10px 0 0 0;
  background-color: #19203b;
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

.listItemCon {
  flex: 1;
  box-sizing: border-box;
  /* background-color: red; */
}

.listItems {
  display: flex;
  font-size: 16px;
  width: 100%;
  /* justify-content: space-between; */
  align-items: center;
  /* padding: 8px 0; */
}

.listItemInfo {
  width: 100px;
  flex-shrink: 0;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #989db6;
}

.splite {
  width: 20px;
  height: 2px;
  margin: 0 5px;
  background-color: #898989;
}

.mainList {
  display: flex;
  flex: 1;
  padding: 0 15px;
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;
  flex-direction: column;
  background-color: #19203b;
}

.listTitleTabs {
  display: flex;
  width: 100%;
  font-size: 16px;
  color: #fff;
  height: 50px;
  box-sizing: border-box;
}

.titleTab {
  text-align: center;
  height: 50px;
  width: 100px;
  flex-shrink: 0;
  /* margin: 0 2px; */
  line-height: 50px;
  background-color: #31415b;
}

.titleTab:nth-child(1),
.listItemInfo:nth-child(1) {
  width: 120px;
}

.titleTab:nth-child(2),
.listItemInfo:nth-child(2) {
  width: 100px;
}

.titleTab:nth-child(3),
.listItemInfo:nth-child(3) {
  width: 120px;
}

.titleTab:nth-child(4),
.listItemInfo:nth-child(4) {
  width: 100px;
}

.titleTab:nth-child(5),
.listItemInfo:nth-child(5) {
  width: 140px;
}

.titleTab:nth-child(6),
.listItemInfo:nth-child(6) {
  width: 140px;
}

.titleTab:nth-child(7),
.listItemInfo:nth-child(7) {
  width: 140px;
}

.titleTab:nth-child(8),
.listItemInfo:nth-child(8) {
  width: 150px;
}

.titleTab:nth-child(9),
.listItemInfo:nth-child(9) {
  width: 180px;
}

.titleTab:nth-child(10),
.listItemInfo:nth-child(10) {
  width: 180px;
}

.titleTab:nth-child(11),
.listItemInfo:nth-child(11) {
  width: 120px;
}

.titleTab:nth-child(12),
.listItemInfo:nth-child(12) {
  width: 150px;
}

.titleTab:nth-child(13),
.listItemInfo:nth-child(13) {
  width: 150px;
}

.titleTab:nth-child(14),
.listItemInfo:nth-child(14) {
  width: 150px;
}

.titleTab:nth-child(15),
.listItemInfo:nth-child(15) {
  width: 230px;
}

.titleTab:nth-child(16),
.listItemInfo:nth-child(16) {
  width: 150px;
}

.titleTab:nth-child(17),
.listItemInfo:nth-child(17) {
  width: 200px;
}

.titleTab:nth-child(18),
.listItemInfo:nth-child(18) {
  width: 150px;
}

.titleTab:nth-child(19),
.listItemInfo:nth-child(19) {
  width: 120px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  border-radius: 0 0 10px 10px;
  padding: 0 15px;
  color: #989db6;
  font-size: 20px;
  /* border-top: 2px solid #60646f; */
  box-sizing: border-box;
  background-color: #19203b;
}

.shouye,
.weiye {
  width: 140px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}

.pre,
.next {
  cursor: pointer;
}

.pageinfo {
  text-align: center;
  width: 100px;
  margin: 0 20px;
}

.mask {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, .3)
}

.active {
  background-color: #1f8efa;
  color: #fff;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 0px;
    height: 50px; */
}

.loading img {
  width: 30px;
  height: 30px;
}

.loadingtext {
  color: #fff;
  font-size: 14px;
  margin-top: 12px;
}
</style>