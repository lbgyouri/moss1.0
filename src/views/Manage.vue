<template>
  <div class="manage">
    <!-- <div class="name">你好</div> -->
    <iframe width="100%" height="100%" class="trub_frame" frameborder="no" marginwidth="0" marginheight="0"
      scrolling="no" allowtransparency="yes" :src='src'></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: 'http://116.62.119.54:19302/pms/login?to=/pms/index'
    }
  },
  mounted() {
    console.log(this.$('.login-wrapper'))

  },
}
</script>

<style scoped>
.manage {
  position: relative;
  width: 100%;
  height: calc(100% - 85px);
  background-color: #19203b;
}


.name {
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translateX(-50%);
  width: 550px;
  height: 70px;
  background-color: #142c52;
}
</style>