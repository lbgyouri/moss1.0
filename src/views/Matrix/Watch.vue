<template>
  <div class="watch">
    <plantTitle2></plantTitle2>
    <div class="watchcon">
      <div class="watchlist">
       <template v-for="item in merterData">
        <div class="watchitem">
          <div class="itemtitle">{{ item.name }}</div>
          <div class="lineinfo">
            <div class="line">
              <div class="name">正向有功</div>
              <div class="num">{{ item.forwardActive }}</div>
            </div>
            <div class="line">
              <div class="name">反向有功</div>
              <div class="num">{{ item.reverseActive }}</div>
            </div>
            <div class="line">
              <div class="name">正向无功</div>
              <div class="num">{{ item.forwardReactive }}</div>
            </div>
            <div class="line">
              <div class="name">反向无功</div>
              <div class="num">{{ item.reverseReactive }}</div>
            </div>
          </div>

        </div>
       </template>
      </div>
    </div>
  </div>
</template>
<script>
import plantTitle2 from '@/components/matrixcpn/plantTitle2.vue';
import { GetPlantMeters } from '@/service';
export default {
  components: {
    plantTitle2
  },
  data() {
    return {
      merterData: []
    }
  },
  created() {
    this.mertersAction()
  },
  methods: {
    async mertersAction() {
      const res = await GetPlantMeters({ plantId: 300001 })
      const result = this.parseCallBack(res.data)
      this.merterData = result
      console.log(result, 'meters')
    },
    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },
  }
}
</script>

<style scoped>
.watch {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 5px;
  border-radius: 0 0 10px 10px;
  background-color: #222b4f;
}

.watchcon {
  flex: 1;
}

.watchlist {
  display: flex;
  flex-wrap: wrap;
}

.watchitem {
  width: 298px;
  height: 260px;
  margin: 10px 5px;
  background-image: url('../../assets/matrixIcon/diannengbiao.png');
  background-size: 100% 100%;
}

.line {
  display: flex;
  height: 56px;
  line-height: 56px;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 20px;
}

.itemtitle {
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
}

.name {
  color: #27A5FE;
}

.num {
  color: #BAE3FD;
}
</style>