<template>
<div class="boost">
  <plantTitle2></plantTitle2>
  <div class="con">
    <iframe width="100%" height="100%" class="trub_frame" frameborder="no" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" :src='src'></iframe>
  </div>
</div>
</template>
<script>
import plantTitle2 from '@/components/matrixcpn/plantTitle2.vue';
export default{
  components:{
    plantTitle2
  },
  data(){
    return{
      src:'http://150.158.31.201:8081/#/all-type/booster/keshanyufeng?plantId=300001'
    }
  }
}

</script>

<style scoped>
 .boost{
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;
  background-color: #222b4f;
 }
 .con{
        
  flex: 1;
 }
</style>