<template>
  <div class="range" @mouseenter="entericon" @mouseleave="leaveicon">
    <a-config-provider :locale="locale">
      <a-range-picker :allowClear="true" @change="onChange" style="width: 255px;height: 36px;border-radius: 5px;
            padding-left: 8px;box-sizing: border-box;">
        <a-icon slot="suffixIcon" type="smile" />
        <div class="pickerCon">
          <div class="dateicon">
            <img src="../assets/images/date.png" alt="">
          </div>
          <div class="pickerText">{{ currDate }}</div>
        </div>

      </a-range-picker>
    </a-config-provider>
    <a-icon style="color:#989db6;font-size: 16px;" v-show="isDateIcon" type="caret-down" />
    <a-icon style="color:#989db6;font-size: 16px;" @click="clearDate" v-show="!isDateIcon" type="close-circle" />
  </div>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  data() {
    return {
      locale: zhCN,
      currDate: '请选择开始到结束日期',
      isDateIcon: true,
    }
  },
  methods: {
    onChange(date, datestring) {
      this.currDate = datestring[0] + ' ~ ' + datestring[1]
      this.$emit('time',datestring[0],datestring[1])
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
  }

}
</script>
<style scoped>
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
  padding-right: 8px;
  box-sizing: border-box;
  color: #989db6;
}

.pickerCon .dateicon img {
  width: 20px;
  height: 20px;
}

.pickerCon .pickerText {
  margin-left: 8px;
}
</style>