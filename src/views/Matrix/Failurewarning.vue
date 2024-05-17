<template>
  <div class="faultmain">
    <PlantTitle2 class="bgc"></PlantTitle2>
    <div class="mask" v-show="loading">
      <div class="loading">
        <img src="../../assets/images/loading.gif" alt="">
        <div class="loadingtext">加载中</div>
      </div>
    </div>


    <div class="mianList">
      <div class="listTitleTabs">
        <div class="titleTab tab1">风机</div>
        <div class="titleTab tab2">风机类型</div>
        <div class="titleTab tab3">时间</div>
        <div class="titleTab tab4">故障等级</div>
        <div class="titleTab tab5">故障代码</div>
        <div class="titleTab tab6">报警内容</div>
      </div>
      <div class="listItemCon">
        <template v-for="item in diagnosisData">
          <div class="listItems">
            <div class="listItemInfo">{{ item.turbName }}</div>
            <div class="listItemInfo">{{ item.turbModel }}</div>
            <div class="listItemInfo">{{ item.time }}</div>
            <div class="listItemInfo">{{ item.level == 'fault' ? '故障' : '警告' }}</div>
            <div class="listItemInfo" style="color: #d4c332;">{{ item.faultCode }}</div>
            <div class="listItemInfo">{{ item.description }}</div>
          </div>
        </template>
      </div>
    </div>
    <div class="pagination">


      <div class="shouye" @click="shouye">首页</div>
      <div class="pre" @click="pre">上一页</div>
      <div class="pageinfo">{{ diagnParams.page }}/{{ totalPage }}</div>
      <div class="next" @click="next">下一页</div>
      <div class="weiye" @click="weiye">尾页</div>
    </div>

  </div>
</template>
<script>
import { Getdiagnosis } from '@/service/index'
import PlantTitle2 from '@/components/matrixcpn/plantTitle2.vue'
export default {
  components: {
    PlantTitle2
  },
  data() {
    return {
      totalPage: 1,
      loading: false,
      diagnParams: {
        level: 'plant',
        id: 300001,
        page: 1,
        rows: 12
      },
      diagnosisData: []
    }
  },
  created() {
    this.DiagnosisAction()
  },
  watch: {
    'diagnParams.page': {
      handler() {
        this.DiagnosisAction()
      }
    }
  },
  methods: {
    async DiagnosisAction() {
      this.loading = true
      const res = await Getdiagnosis(this.diagnParams)
      const result = this.parseCallBack(res.data)
      this.diagnosisData = result.data
      if (result.data) {
        this.loading = false
      }
      this.totalPage = result.pages
      console.log(result, '预警信息')
    },
    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },
    pagechange(page, pagesize) {
      this.diagnParams.page = page
    },
    pre() {
      if (this.diagnParams.page > 1) {
        this.diagnParams.page--
      }

    },
    next() {
      if (this.diagnParams.page < this.totalPage) {
        this.diagnParams.page++
      }

    },
    shouye() {
      this.diagnParams.page = 1
    },
    weiye() {
      this.diagnParams.page = this.totalPage
    }
  },
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
  background-color: #2f3d59;
}

.faultmain {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 5px;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;
  background-color: #222b4f;
}

.mask {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, .3)
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

.mianList {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.listItemCon {
  flex: 117;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* background-color: red; */
}

.listItems {
  padding: 7px 0;
  display: flex;
  font-size: 16px;
  align-items: center;
  /* padding: 0.4% 0; */

}

.listItemInfo {
  flex: 1;
  text-align: center;
  color: #fff;
}


.bgc {
  background-color: #14192f;
}

.listTitleTabs {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #fff;
  height: 50px;
  box-sizing: border-box;
  background-color: #31415b;
}

.titleTab {
  text-align: center;
  flex: 1;
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
  margin: 0 20px;
  width: 100px;
}
</style>