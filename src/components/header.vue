<template>
  <div class="header">
    <div class="headerTitle">新能源风电集控中心管理系统</div>
    <div class="tabBar">
      <template v-for="(item, index) in headerData">
        <div class="barItem" :class="{ 'active': currindex == index }" @click="goPage(item.routername, index)">
          {{ item.name }}
        </div>
      </template>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currindex: 0,
      headerData: [{
        name: '首页',
        routername: 'home',
      }, {
        name: '全场矩阵',
        routername: 'matrix'
      }, {
        name: '故障诊断',
        routername: 'fault'
      }, {
        name: '性能分析',
        routername: 'performance'
      },
      {
        name: '生产管理',
        routername: 'manage'
      }]
    }
  },
  created() {
    this.$router.push({ name: 'home' })
  },
  methods: {
    goPage(routername, index) {
      if (routername == "manage") {
        window.location = "http://116.62.119.54:19302/pms/login?to=/pms/index"
      }
      else {
        this.currindex = index
        this.$router.push({ name: routername })
      }
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 85px;
  padding-left: 15px;
  padding-right: 30px;
  box-sizing: border-box;
  background-color: #000;
}

.headerTitle {
  width: 425px;
  font-size: 30px;
  color: #ffffff;
  padding-left: 5px;
}

.tabBar {
  display: flex;
  align-items: center;
  /* width: 800PX; */
  font-size: 22px;
  color: #989db6;
  margin-left: 200px;

}

.barItem {
 width: 200px;
  letter-spacing: 2px;
  height: 85px;
  text-align: center;
  line-height: 85px;
  cursor: pointer;
  box-sizing: border-box;
}

.barLine {
  width: 2px;
  height: 50px;
  background-color: #656565;
}

.active {
  color: #ffffff;
  background-color: #273148;
  border-bottom: 5px solid #6d74f4;
}
</style>