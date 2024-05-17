<template>
  <div id="app" :style="box">
    <div :style="scale" style="position: fixed;top: 0;left: 0;">
      <Header></Header>
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from './components/header'
export default {
  components: {
    Header
  },
  data() {
    return {
      box: '',
      viewportWidth: 0, // 保存可视化区域宽度的变量
      viewportHeight: 0,// 保存可视化区域高度的变量
      height: 919,
      width: 1920,
      w: 1,
      h: 1,
      scale: '',

    }
  },
  mounted() {
    // 在组件挂载时绑定resize事件
    window.addEventListener('resize', this.handleResize);

    // 初始化可视化区域宽度和高度
    this.getViewportSize();
  },



  methods: {
    handleResize() {
      // 窗口大小改变时触发的方法
      this.getViewportSize();
    },
    getViewportSize() {
      // 获取可视化区域宽度和高度的方法
      this.viewportWidth = window.innerWidth;
      this.viewportHeight = window.innerHeight;
      this.size()
    },
    size() {
      this.width = 1920
      this.height = 919
      let clientWidth = this.viewportWidth
      let clientHeight = this.viewportHeight
      let s = clientWidth / clientHeight
      if (1 <= s && s < 2) {
        this.height = clientHeight * (this.width / clientWidth)
      }
      console.log(this.height, 's')
      // this.$store.commit('setViewHeight', this.height)
      this.w = clientWidth / this.width
      this.h = clientHeight / this.height
      this.$store.commit('reciveScale', { x: this.w, y: this.h })
      console.log(this.w, this.h, this.viewportWidth, this.viewportHeight, 'ahha')
      this.scale =
        `transform: scale(${this.w},${this.h});transform-origin: 0px 0px;width: ${this.width}px;height: ${this.height}px;`
      this.box = `width: ${clientWidth}px;height:${clientHeight}px;`
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;/
  color: #2c3e50;
  // overflow: hidden;
}

nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
