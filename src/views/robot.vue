<template>
  <div class="robot" @click="jump">
    <iframe width="100%" height="100%" class="trub_frame" frameborder="no" marginwidth="0" marginheight="0"
      scrolling="no" allowtransparency="yes" :src='src'></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: ''
    }
  },
  mounted() {
    window.backtoMatrix = () => {
      window.location.href = "/matrix"
    }
    const id = this.$route.params.id
    this.src = `http://150.158.31.201:8081/#/all-info?turbId=${id}`
  },
  methods: {
    jump() {
      console.log(11111)
      window.backtoMatrix()
    }
  }
}
</script>

<style scoped>
.robot {
  height: calc(100% - 85px);
  width: 100%;
   background-color: #19203b;
}
</style>