<template>
  <div style="flex: 1; display: flex;flex-direction: column;position: relative;">
    <div class="select">
      <div class="selectBar">

        <input class="input" type="text" v-model="currcode" placeholder="故障代码">

        <div class="splite"></div>
        <template>
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{ currbranch }}
              <a-icon type="caret-down" />
            </a>
            <a-menu slot="overlay">
              <template v-for="item in brandList">
                <a-menu-item @click="currbranchf(item.name)">
                  {{ item.name }}
                </a-menu-item>
              </template>
            </a-menu>
          </a-dropdown>
        </template>
        <!-- <div class="splite"></div>
        <template>
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{ currsys }}
              <a-icon type="caret-down" />
            </a>
            <a-menu slot="overlay">
              <template v-for="item in partList">
                <a-menu-item @click="currsysf(item.name)">
                  {{ item.name }}
                </a-menu-item>
              </template>

            </a-menu>
          </a-dropdown>
        </template> -->
        <div class="splite"></div>


        <template>
          <input class="input" type="text" v-model="currphe" placeholder="故障现象">
        </template>

      </div>
      <div class="selectBtns">
        <div class="query" @click="submit">查询</div>
        <div class="reset" @click="reset">重置</div>
      </div>

    </div>

    <div class="mainList">
      <div class="listTitleTabs">

        <div class="titleTab tab1">ID</div>
        <div class="titleTab tab1">机组型号</div>
        <div class="titleTab tab1">主故障代码</div>
        <div class="titleTab tab1">伴随故障代码</div>
        <div class="titleTab tab1" style="flex: 1;">故障名称</div>
        <div class="titleTab tab1" style="flex: 1;">备注</div>
        <div class="titleTab tab1">操作</div>

      </div>
      <div class="listItemCon">
        <template v-for="item in faultData">
          <div class="listItems">
            <div class="listItemInfo">{{ item.id }}</div>
            <div class="listItemInfo">{{ item.modelName }}</div>
            <div class="listItemInfo" style="color: #d4c332;">{{ item.mainCode }}</div>
            <div class="listItemInfo">{{ item.companionCode }} </div>
            <div class="listItemInfo" style=" flex: 1;">{{ item.cnName }}</div>
            <div class="listItemInfo" style="flex: 1;">{{ item.remark }}</div>
            <div class="listItemInfo" @click="look(item)" style="cursor: pointer;">查看</div>

          </div>
        </template>
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
    <div class="alter" v-show="showalert">
      <div class="close" @click="showalert = false">关闭</div>
      <div class="lookinfo">
        <div class="maincode">{{ maincode }}</div>
        <div class="cnname">{{ cnname }}</div>
        <div class="enname">{{ enname }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import selectDate from '@/components/selectDate.vue'
import { GetFaultData } from '@/service/index'
export default {
  data() {
    return {
      locale: zhCN,
      currDate: '请选择开始到结束日期',
      isDateIcon: true,
      faultData: [],
      totalPage: 1,
      loading: false,
      currcode: '',
      currbranch: '品牌型号',
      currsys: '结构部件',
      currphe: '',
      maincode: '',
      cnname: '',
      enname: '',
      showalert: false,
      selectParams: {
        page: 1,
        rows: 13,
        //品牌型号,
        brand: '',
        //故障代码
        code: '',
        //结构部件
        sys: '',
        //故障现象
        phe: ''
      },
      brandList: [{
        name: '品牌型号'
      },
      {
        name: 'UP1.5'
      },
      {
        name: 'UP2.0'
      },
      {
        name: 'HZ2.0'
      }
      ],
      partList: [{
        name: '结构部件'
      },
      {
        name: '塔架及基础'
      },
      {
        name: '偏航系统'
      },
      {
        name: '机械传动系统'
      },
      {
        name: '发电机'
      },
      {
        name: '液压系统'
      },
      {
        name: '电控系统'
      },
      {
        name: '叶轮'
      },
      {
        name: '变桨系统'
      },
      {
        name: '测风系统'
      },
      {
        name: '其他'
      }
      ],

    }
  },
  created() {
    this.faultDataAction()
  },
  methods: {
    async faultDataAction() {
      const res = await GetFaultData(this.selectParams)
      this.faultData = res.data.data
      console.log(res.data, 'siajdo ')
      this.totalPage = res.data.pages
    },

    currPlantf(name, id) {
      this.currPlant = name
      this.getPlantType(id)
    },

    currbranchf(name) {
      this.currbranch = name
      console.log(1)
    },
    currsysf(name) {
      this.currsys = name
      console.log(name, 2)
    },

    submit() {
      this.selectParams.brand = this.currbranch == '品牌型号' ? '' : this.currbranch
      this.selectParams.code = this.currcode == '故障代码' ? '' : this.currcode
      this.selectParams.sys = this.currsys == '结构部件' ? '' : this.currsys
      this.selectParams.phe = this.currphe == '故障现象' ? '' : this.currphe
      console.log(this.selectParams, 756)
      this.faultDataAction()
    },
    reset() {
      this.selectParams = {
        page: 1,
        rows: 13,
        //品牌型号,
        brand: '',
        //故障代码
        code: '',
        //结构部件
        sys: '',
        //故障现象
        phe: ''
      },
        this.currcode = ''
      this.currbranch = '品牌型号'
      this.currsys = '结构部件'
      this.currphe = ''
      this.faultDataAction()
    },
    onChange(date, datestring) {
      this.currDate = datestring[0] + ' ~ ' + datestring[1]
      this.startTime = datestring[0]
      this.endTime = datestring[1]
    },
    look(item) {
      this.showalert = true
      this.maincode = item.mainCode
      this.cnname = item.cnName
      this.enname = item.enName
    },
    clearDate() {
      this.currDate = '请选择开始到结束日期'
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

    },
    pre() {
      if (this.selectParams.page > 1) {
        this.selectParams.page--
        this.faultDataAction()
      }

    },
    next() {
      if (this.selectParams.page < this.totalPage) {
        this.selectParams.page++
        this.faultDataAction()
      }

    },
    shouye() {
      this.selectParams.page = 1
      this.faultDataAction()
    },
    weiye() {
      this.selectParams.page = this.totalPage
      this.faultDataAction()
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

.listItems:nth-child(2n) {
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
  width: 255px;
  padding-right: 8px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #080f22;
  border: 2px solid #1d6fc5;
}

.input {
  outline: none;
  border: 0;
  height: 40px;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 8px;
  box-sizing: border-box;
  color: #989db6;
  background-color: #2f3d55;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #989db6;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #989db6;
  opacity: 1;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #989db6;
  opacity: 1;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #989db6;
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
  align-items: center;
  padding: 8px 0;
}

.listItemInfo {
  width: 200px;
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
  font-size: 16px;
  color: #fff;
  height: 50px;
  box-sizing: border-box;
  background-color: #31415b;
}

.titleTab {
  text-align: center;
  height: 50px;
  width: 200px;
  line-height: 50px;
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
  border-top: 2px solid #60646f;
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

.alter {
  position: absolute;
  left: 50%;
  top: 20%;
  width: 500px;
  height: 250px;
  color: #fff;
  border-radius: 8px;
  transform: translate(-50%);
  background-color: rgba(35, 55, 85);
}

.close {
  text-align: right;
  padding-right: 20px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  cursor: pointer;
  box-sizing: border-box;
}

.lookinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 20px;
  margin-top: 20px;
}

.cnname {

  margin: 15px 0;
}
</style>