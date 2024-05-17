<template>
  <div class="fault">
    <div class="faultTabCon">
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
    <div class="warningMain">
      <div class="warnLeft">
        <div class="selectCon">
          <template>
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                全部风场
                <!-- <a-icon type="down" /> -->
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  1st menu item
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          <template>
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                全部风场
                <!-- <a-icon type="down" /> -->
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  1st menu item
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          <template>
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                全部风场
                <!-- <a-icon type="down" /> -->
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  1st menu item
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </div>
        <div class="openCon">
          <div class="openItem" @click="currindex = 1" :class="{ 'borderactive': currindex == 1 }">
            <div class="openItemTop" :class="{ 'bgcactive': currindex == 1 }">
              <div class="openItemTit">民勤光伏电站,设备编号:#1-NB01</div>
              <div class="openItemDes">2023年02月18日至2023年02月21日,预警记录共100条</div>
            </div>
            <div class="openItemBtns">
              <div class="confirm">
                <div class="confirmText">确认</div>
                <a-switch size="small" default-checked @change="onChange" />

              </div>
              <div class="close">
                <div class="closeText">关闭</div>
                <a-switch size="small" default-checked @change="onChange" />

              </div>
            </div>
          </div>
          <div class="openItem" @click="currindex = 2" :class="{ 'borderactive': currindex == 2 }">
            <div class="openItemTop" :class="{ 'bgcactive': currindex == 2 }">
              <div class="openItemTit">民勤光伏电站,设备编号:#1-NB01</div>
              <div class="openItemDes">2023年02月18日至2023年02月21日,预警记录共100条</div>
            </div>
            <div class="openItemBtns">
              <div class="confirm">
                <div class="confirmText">确认</div>
                <a-switch size="small" default-checked @change="onChange" />

              </div>
              <div class="close">
                <div class="closeText">关闭</div>
                <a-switch size="small" default-checked @change="onChange" />

              </div>
            </div>
          </div>
          <div class="openItem" @click="currindex = 3" :class="{ 'borderactive': currindex == 3 }">
            <div class="openItemTop" :class="{ 'bgcactive': currindex == 3 }">
              <div class="openItemTit">民勤光伏电站,设备编号:#1-NB01</div>
              <div class="openItemDes">2023年02月18日至2023年02月21日,预警记录共100条</div>
            </div>
            <div class="openItemBtns">
              <div class="confirm">
                <div class="confirmText">确认</div>
                <a-switch size="small" default-checked @change="onChange" />

              </div>
              <div class="close">
                <div class="closeText">关闭</div>
                <a-switch size="small" default-checked @change="onChange" />

              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="warnRight">
        <div class="warnRightTitle">民勤光伏电站,设备编号:#1-NB01</div>
        <div class="notice">
          <div class="noticeItem">
            <div class="noticeItemDate">
              <div class="dateTitle" style="text-align: left;">发生日期</div>
              <div class="dateTitle dateTitle2">检出日期</div>
              <div class="dateTitle">持续时间(d)</div>
            </div>
            <div class="noticeItemDateInfo">
              <div class="DateInfo" style="text-align: left;">2023-12-03</div>
              <div class="DateInfo DateInfo2">2023-12-04</div>
              <div class="DateInfo">3.27</div>
            </div>
          </div>
          <div class="noticeItem">
            <div class="noticeItemDate">
              <div class="dateTitle" style="text-align: left;">预警信息</div>
              <div class="dateTitle dateTitle2"></div>
              <div class="dateTitle"></div>
            </div>


            <div class="noticeItemDateInfo2">
              <div class="method">解决方法</div>
              <div class="methodInfo">(1).检查一下机器就好了</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import moment from 'moment';
export default {
  data() {
    return {
      currindex: 1,
      tabcurrindex: 0,
      tabsname: ['运行状态异常预警', '传感器预警', '大部件预警', '光伏预警', '同型号异常预警']
    }
  },
  methods: {
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },
    onChange(checked) {
      console.log(`a-switch to ${checked}`);
    },
  }
}
</script>

<style scoped>
.ant-dropdown-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 360px;
  height: 30%;
  padding: 8px 10px;
  font-size: 18px;
  color: #989db6;
  box-sizing: border-box;
  border-radius: 7px;
  background-color: #111728;
}

.ant-input {
  background-color: rebeccapurple !important;
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
  width: 835px;
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
  font-size: 18px;
  border-radius: 5px;
  color: #989db6;
  flex: 1;
  height: 100%;
  cursor: pointer;
}

.warningMain {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: 162;
  box-sizing: border-box;
  background-color: #080f22;
}

.warningMain .warnLeft {
  display: flex;
  flex-direction: column;
  width: 395px;
  padding: 20px 15px 30px 15px;
  box-sizing: border-box;
  background-color: #1e2645;
  border-radius: 10px;
}

.warnLeft .selectCon {
  display: flex;
  flex: 35;
  flex-direction: column;
  align-items: center;

  justify-content: space-between;
}

.openCon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 127;
  width: 100%;
  margin-top: 30px;

}

.openItem {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 32%;
  border-radius: 5px;
}

.openItemTop {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  flex: 4;
  padding: 5px;
  font-size: 16px;
  color: #f5f5f7;
  padding-bottom: 8px;
  background-color: #111728;
  box-sizing: border-box;
  border-bottom: 2px solid #1f8efa;
  border-radius: 5px 5px 0 0;
  letter-spacing: 1px;
}

.openItemTop .openItemTit {
  text-align: left;
}

.openItemTop .openItemDes {
  text-align: left;
}

.openItemBtns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-left: 20px;
  padding-right: 15px;
  box-sizing: border-box;
  border-radius: 0 0 5px 5px;
  background-color: #445788;
}

.confirm,
.close {
  display: flex;
  justify-content: space-between;
  width: 20%;
  align-items: center;
  font-size: 16px;
  color: #f5f5f7;
}

.warningMain .warnRight {
  display: flex;
  flex-direction: column;
  width: 1470px;
  padding: 20px;
  padding-bottom: 30px;
  border-radius: 10px 0 10px 10px;
  background-color: #19203b;
}

.warnRight .warnRightTitle {
  text-align: left;
  color: #f5f5f7;
  font-size: 20px
}

.warnRight .notice {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
  margin-top: 60px;
  padding-top: 20px;
  border-top: 2px solid #44597a;
  box-sizing: border-box;
}

.notice .noticeItem {
  display: flex;
  flex-direction: column;
  width: 695px;
  height: 30%;

  border-radius: 10px;
}

.noticeItem .noticeItemDate {
  display: flex;
  padding-left: 20px;
  box-sizing: border-box;
}

.noticeItem .noticeItemDate {
  align-items: center;
  flex: 1;
  font-size: 18px;
  color: #f5f5f7;
  border-radius: 3px;
  background-color: #303e66;
}

.noticeItem .noticeItemDateInfo {
  display: flex;
  flex: 3;
  padding: 7px 0;
  padding-left: 20px;
  font-size: 16px;
  color: #989db6;
  border-radius: 3px;
  background-color: #111728;
}

.noticeItemDateInfo2 {
  padding-left: 20px;
  box-sizing: border-box;
  flex: 3;
  padding-top: 7px;
  color: #989db6;
  background-color: #111728;
  font-size: 16px;
  border-radius: 3px;
}

.method,
.methodInfo {
  text-align: left;
}

.noticeItem .noticeItemDate .dateTitle,
.noticeItem .noticeItemDateInfo .DateInfo {
  width: 110px;
  text-align: center;
}

.noticeItem .noticeItemDate .dateTitle2,
.noticeItemDateInfo .DateInfo2 {
  margin-left: 100px;
  margin-right: 250px;
}

.tabactive {
  background-color: #1f8efa;
  color: #fff;
}

.borderactive {
  border: 2px solid #dbdbdb;
}

.bgcactive {
  background-color: #2a3a61;
}
</style>