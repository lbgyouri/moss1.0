<template>
  <div class="fault">
    <div class="faultTabCon">
      <div class="faultTab">
        <div class="tabs">
          <div class="tabItem" :class="currindex == 1 ? 'active' : ''" @click="router(1)">故障查询</div>
          <div class="tabItem" :class="currindex == 2 ? 'active' : ''" @click="router(2)">故障分析</div>
          <div class="tabItem" :class="currindex == 3 ? 'active' : ''" @click="router(3)">故障汇总</div>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currindex: 1,

    }
  },

  methods: {


    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },
    pagechange(page, pagesize) {
      this.selectParams.page = page
      this.WarnningAction()
    },
    router(index) {
      this.currindex = index
      console.log(index)
      if (index == 1) {
        this.$router.replace({ path: '/fault/query' })
      } if (index == 2) {
        this.$router.replace({ path: '/fault/analyse' })
      } if (index == 3) {
        this.$router.replace({ path: '/fault/total' })
      }

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
</style>