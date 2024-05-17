<template>
  <div class="streetMap">
    <plantTitle2></plantTitle2>
    <div id="pathMap">

    </div>
    <div class="tooltip" id="mapTooltip">
      <div class="title">
        <span class="plant-name">{{ tooltip.name }}</span>＞
      </div>
      <div class="item">
        <span class="name">实时风速: </span>
        <span class="value">{{ tooltip.windSpeed }} m/s</span>
      </div>
      <div class="item">
        <span class="name">实时功率: </span>
        <span class="value">{{ tooltip.activePower }} kW</span>
      </div>
      <hr />
      <div class="item">
        <span class="name">设备: </span>
        <span class="value">风机</span>
      </div>
      <div class="item" style="display: flex;">
        <span class="name">状态: </span>
        <span :class="tooltip.status" class="value">
          &nbsp;<i>•</i>
          &nbsp;{{ tooltip.status | getStatusName }}</span>
      </div>
      <div class="item">
        <span class="name">当日发电量: </span>
        <span class="value">{{ tooltip.powerGenerationDaily }} kWh</span>
      </div>
      <hr />
      <div @click="tapTooltip" class="link">查看风机</div>
    </div>
  </div>
</template>
<script>
import plantTitle2 from '@/components/matrixcpn/plantTitle2.vue';
import { GetGlobalMap } from '@/service/index'
import * as L from 'leaflet'
export default {
  components: {
    plantTitle2
  },
  data() {
    return {
      turb01: require('../../assets/homeIcon/turb01-01.png'),
      tower01: require('../../assets/homeIcon/tower01-01.png'),
      turb03: require('../../assets/homeIcon/turb03.png'),
      turb03Red: require('../../assets/homeIcon/turb03-red.png'),
      turb03Hui: require('../../assets/homeIcon/turb03-hui.png'),
      boosterIcon: require('../../assets/homeIcon/booster.png'),
      currentPlantStatus: {
        count: {}
      },
      map: null,
      mapData: null,
      tooltip: {
        name: ''
      },
      mapConfig: {
        local: false,
        src: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'

      },
      tooltipEl: null,
      lastShowMapTooltipId: null,
      lastShowMapTooltipPoint: null,
      logStatus: false
    }

  },
  filters: {
    getStatusName: function (key) {
      let _statusMap = {
        running: '正常发电',
        limit: '限功率',
        userShutdown: '用户停机',
        faultShutdown: '故障停机',
        maint: '维护',
        netFault: '电网故障',
        techStandby: '技术待机',
        envStandby: '环境待机',
        unknown: '未知状态',
        disconn: '连接中断'
      }
      return _statusMap[key] || '未知状态'
    }
  },
  mounted() {
    this.gloBalMapAction()
    // this.init()

    // this.initMap()
  },
  methods: {
    init(item) {
      if (this.mapConfig.local) {
        this.extendMap()
      }
      this.gloBalMapAction()
    },
    async gloBalMapAction() {
      const res = await GetGlobalMap({ level: 'plant', id: 300001 })
      const result = this.parseCallBack(res.data)
      this.mapData = result
      this.mapData.items = result.items.sort((a, b) => (a.lineName || '').localeCompare(b.lineName ||
        '') * 100 - a.name.localeCompare(b.name))
      this.initMap()
      console.log(result, '地图')
    },
    parseCallBack(res) {
      return eval(res + "; API_CALLBACK")()
    },
    initMap() {
      // if (this.map) {
      //   this.map.remove()
      // }
      // if (!this.mapData.items || this.mapData.items.length == 0) return
      // const _this = this
      const _this = this
      var minX = 999,
        maxX = 0,
        minY = 999,
        maxY = 0;
      for (var i of this.mapData.items) {
        if (i.type == 'TURB') {
          minX = Math.min(minX, i.x);
          maxX = Math.max(maxX, i.x);
          minY = Math.min(minY, i.y);
          maxY = Math.max(maxY, i.y);
        }
      }
      var center = new L.LatLng((minY + maxY) / 2, (minX + maxX) / 2 + 0.015)
      let map = L.map('pathMap', {
        center,
        zoom: 11,
        attributionControl: false
      })

      if (this.mapConfig.local) {
        //加图层
        new L.TileLayer.TileLoad(this.mapConfig.src, {
          maxZoom: 15
        }).addTo(map)
      } else {
        new L.TileLayer(
          this.mapConfig.src, {
          maxZoom: 15
        }
        ).addTo(map)
      }
      map.on('zoom', function () {
        _this.hideMapTooltip({})
      })
      map.on('zoomstart', function () {
        _this.hideMapTooltip({})
      })

      var pathColors = ['#CC3300', '#CC9900', '#99CC00', '#00CC99', '#0099CC', '#CC0099', '#FF0A47', '#9900CC'];
      var pathPoints = [];
      var upName = this.mapData.items && this.mapData.items[0] ? this.mapData.items[0].lineName : null;
      let index = 0
      for (var i of this.mapData.items) {
        console.log(i.type)
        if (i.type != 'TURB') {
          continue;
        }
        if (!i.lineName) {
          i.lineName = i.name[0];
        }
        /* 测试
         if (index == 0) {
            i.status = 'running'
         } else if (index == 1) {
            i.status = 'techStandby'
         } else if (index == 2) {
            i.status = 'maint'
         } else if (index == 3) {
            i.status = 'faultShutdown'
         } else if (index == 4) {
            i.status = 'userShutdown'
         } else if (index == 5) {
            i.status = 'netFault'
         } else if (index == 6) {
            i.status = 'limit'
         } else if (index == 7) {
            i.status = 'envStandby'
         } else if (index == 8) {
            i.status = 'unknown'
         } else if (index == 9) {
            i.status = 'disconn'
         }
         */
        var marker = new L.Marker(
          new L.LatLng(i.y, i.x), {
          icon: new L.divIcon({
            className: 'd',
            html: `
            <div  data-index="${index}" class="map-turbine-box" id="map-turbine-box-${index}" style="width: 50px;
    height: 70px;display: flex;flex-direction: column;align-items: center;margin-left: -16px;margin-top: -53px;">
									<img style="width: 40px;
    height: 40px;position: relative;z-index: 111;"  data-index="${index}" class="${i.status == 'running' || i.status == 'limit' ? 'tubine-running tubine' : 'tubine'}"
										src="${this.turb01}" />
									<img style="height: 30px;margin-top: -16px;position: relative;z-index: 110;" data-index="${index}" class="tubine-tower" src="${this.tower01}" />
									
								
									<img style="width: 40px;
    height: 15px;margin-top: -8px;" data-index="${index}" class="tubine-bottom ${i.status}" src="${this.turb03}" />
								</div>
								`
          }),
          riseOnHover: true
        }
        )
        marker.addTo(map)
        marker.on('mouseover', function (e) {
          _this.showMapTooltip(e.originalEvent)

        })
        marker.on('mouseout', function (e) {
          _this.hideMapTooltip(e.originalEvent)
        })
        marker.on('click', function (e) {
          _this.tapTooltip()
        })
        //连线
        var last = i.name == this.mapData.items[this.mapData.items.length - 1].name
        if (last) {
          pathPoints.push([i.y, i.x])
        }
        if (upName != i.lineName || last) {
          // console.log(pathPoints)
          L.polyline(pathPoints, {
            opacity: 0.7,
            color: pathColors.shift()
          }).bindTooltip(upName, {
            sticky: true
          }).addTo(map)
          pathPoints = []
        }
        pathPoints.push([i.y, i.x])
        upName = i.lineName


        index++
      }
      var booster = new L.Marker(
        new L.LatLng(this.mapData.y, this.mapData.x), {
        icon: new L.divIcon({
          html: `
            <img style="width: 55px;height: 55px;poasition:absolute;z-index:99999"   class="booster-icon" src="${this.boosterIcon}"  />
							
							`
        }),
        riseOnHover: true
      }
      )
      booster.addTo(map)

      this.map = map
    },
    tapTooltip() {
      let turbine = this.tooltip
      this.$router.push({ name: 'robot', params: { id: turbine.id } })
      // if (!turbine.type || turbine.type == 'TURB') {
      // 	if (this.info3D) {
      // 		this.$router.replace({
      // 			path: '/all-info',
      // 			query: {
      // 				turbId: turbine.id
      // 			}
      // 		})
      // 	} else {
      // 		this.$router.replace({
      // 			path: '/all-specific/info',
      // 			query: {
      // 				turbId: turbine.id
      // 			}
      // 		})
      // 	}
      // } else {
      // 	this.$cookies.remove('local_PVName')
      // 	this.$router.replace({
      // 		path: '/all-specific/inverter',
      // 		query: {
      // 			turbId: turbine.id
      // 		}
      // 	})
      // }
    },
    correct(items) {
      for (let i of items) {
        if (i.type != 'TURB') {
          continue;
        }
        if (i.x > 1000 || i.y > 1000) {
          let pos = this.CGS2000ToWGS84(i.x, i.y);
          // console.log(`${i.name}=${i.x},${i.y} -> ${pos[0]},${pos[1]}`)
          i.x = pos[0];
          i.y = pos[1];
        }
      }
    },
    hideMapTooltip(event) {
      if (!this.tooltipEl) {
        this.tooltipEl = this.$('#mapTooltip')
      }
      this.tooltipEl.hide()
    },
    showMapTooltip(event) {
      this.tooltipEl = this.$('#mapTooltip')
      let index = event.target.dataset.index
      let data = this.mapData.items[index] || {}
      var el = this.$('#map-turbine-box-' + index)
      this.tooltip = data
      this.tooltip.status = data.status || 'unknown';
      this.tooltipEl.appendTo(el)
      this.tooltipEl.show()
    },
    CGS2000ToWGS84(X, Y) {
      var L0 = 105; //中央子午线需根据实际情况设置
      var lat = 0;
      var lon = 0;
      Y -= 500000;
      var result = [0, 0];
      var iPI = 0.0174532925199433; //pi/180
      var a = 6378137.0; //长半轴 m
      var b = 6356752.31414; //短半轴 m
      var f = 1 / 298.257222101; //扁率 a-b/a
      var e = 0.0818191910428; //第一偏心率 Math.sqrt(5)
      var ee = Math.sqrt(a * a - b * b) / b; //第二偏心率
      var bf = 0; //底点纬度
      var a0 = 1 + (3 * e * e / 4) + (45 * e * e * e * e / 64) + (175 * e * e * e * e * e * e / 256) + (11025 *
        e * e * e * e * e * e * e * e / 16384) + (43659 * e * e * e * e * e * e * e * e * e * e / 65536);
      var b0 = X / (a * (1 - e * e) * a0);
      var c1 = 3 * e * e / 8 + 3 * e * e * e * e / 16 + 213 * e * e * e * e * e * e / 2048 + 255 * e * e * e *
        e * e * e * e * e / 4096;
      var c2 = 21 * e * e * e * e / 256 + 21 * e * e * e * e * e * e / 256 + 533 * e * e * e * e * e * e * e *
        e / 8192;
      var c3 = 151 * e * e * e * e * e * e * e * e / 6144 + 151 * e * e * e * e * e * e * e * e / 4096;
      var c4 = 1097 * e * e * e * e * e * e * e * e / 131072;
      bf = b0 + c1 * Math.sin(2 * b0) + c2 * Math.sin(4 * b0) + c3 * Math.sin(6 * b0) + c4 * Math.sin(8 *
        b0); // bf =b0+c1*sin2b0 + c2*sin4b0 + c3*sin6b0 +c4*sin8b0 +...
      var tf = Math.tan(bf);
      var n2 = ee * ee * Math.cos(bf) * Math.cos(bf); //第二偏心率平方成bf余弦平方
      var c = a * a / b;
      var v = Math.sqrt(1 + ee * ee * Math.cos(bf) * Math.cos(bf));
      var mf = c / (v * v * v); //子午圈半径
      var nf = c / v; //卯酉圈半径
      //纬度计算
      lat = bf - (tf / (2 * mf) * Y) * (Y / nf) * (1 - 1 / 12 * (5 + 3 * tf * tf + n2 - 9 * n2 * tf * tf) * (Y *
        Y / (nf * nf)) + 1 / 360 * (61 + 90 * tf * tf + 45 * tf * tf * tf * tf) * (Y * Y * Y * Y / (
          nf * nf * nf * nf)));
      //经度偏差
      lon = 1 / (nf * Math.cos(bf)) * Y - (1 / (6 * nf * nf * nf * Math.cos(bf))) * (1 + 2 * tf * tf + n2) * Y *
        Y * Y + (1 / (120 * nf * nf * nf * nf * nf * Math.cos(bf))) * (5 + 28 * tf * tf + 24 * tf * tf * tf *
          tf) * Y * Y * Y * Y * Y;
      result[0] = lat / iPI;
      result[1] = L0 + lon / iPI;
      return [result[1], result[0]];
    },
    extendMap() {
      L.TileLayer.TileLoad = L.TileLayer.extend({
        initialize: function (url, options) {
          options = L.setOptions(this, options)
          this.url = url + '/{z}/{x}/{y}.png'
          L.TileLayer.prototype.initialize.call(this, this.url, options)
        },
        getTileUrl: function (coords) {
          let tilePoint = coords
          let url2 = L.Util.template(this._url, L.extend({
            s: this._getSubdomain(tilePoint),
            z: (function () {
              var value = tilePoint.z.toString()
              return 'L' + value.padStart(2, '0')
            })(),
            x: (function () {
              var value = (tilePoint.y).toString(16)
              return 'R' + value.padStart(8, '0')
            })(),
            y: (function () {
              var value = (tilePoint.x).toString(16)
              return 'C' + value.padStart(8, '0')
            })()
          }))
          return url2
        }
      })
    }
  }
}
</script>


<style scoped>
.streetMap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 5px;
  padding: 0 20px;
  padding-bottom: 5px;
  border-radius: 0 0 10px 10px;
  box-sizing: border-box;
  background-color: #222b4f;
}

#pathMap {
  flex: 1;
  margin-top: 5px;
}



.leaflet-div-icon {
  border: 0;
  background: none;
}

.map-turbine-box {
  width: 50px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-left: -16px;
  margin-top: -53px;
  background-color: rebeccapurple;
}

.custom-icon.icons {
  width: 20px !important;
  height: 20px !important;
  background-color: orange !important;
}

.map-turbine-box .tubine {
  width: 40px;
  height: 40px;
  position: relative;
  z-index: 111;
}

.map-turbine-box .tubine-running {
  animation: turbine 4s linear infinite;
}

.map-turbine-box .tubine-tower {
  height: 30px;
  margin-top: -16px;
  position: relative;
  z-index: 110;
}

.map-turbine-box .tubine-bottom {
  width: 40px !important;
  height: 15px;
  margin-top: -8px;
  display: none;
}

.map-turbine-box .tubine-bottom-other {
  width: 40px !important;
  height: 15px;
  margin-top: -8px;
}


.map-turbine-box .running {
  position: relative;
  z-index: 1;
  display: block !important;
}

.map-turbine-box .techStandby {
  filter: hue-rotate(310deg);
  position: relative;
  z-index: 1;
  display: block !important;
}

.map-turbine-box .maint {
  filter: hue-rotate(265deg);
  position: relative;
  z-index: 1;
  display: block !important;
}

.map-turbine-box .faultShutdown {}

.map-turbine-box .userShutdown {
  filter: hue-rotate(250deg);
  position: relative;
  z-index: 1;
  display: block !important;
}

.map-turbine-box .netFault {
  filter: hue-rotate(150deg);
  position: relative;
  z-index: 1;
  display: block !important;
}

.map-turbine-box .limit {
  filter: hue-rotate(96deg);
  position: relative;
  z-index: 1;
  display: block !important;
}

.map-turbine-box .envStandby {
  filter: hue-rotate(30deg);
  position: relative;
  z-index: 1;
  display: block !important;
}

.map-turbine-box .unknown {}

.map-turbine-box .disconn {}

@keyframes turbine {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.none {
  display: none;
}

.tooltip {
  position: absolute;
  width: 230px;
  min-height: 226px;
  background-image: url('../../assets/images/path-tooltip.png');
  background-size: 100% 100%;
  padding: 20px;
  box-sizing: border-box;
  font-size: 14px;
  text-align: left;
  z-index: 999999;
  left: 20px;
  top: -50px;
  display: none;
  color: #D4ECFF;
}

.tooltip .item {
  line-height: 22px;
}

.tooltip .name {
  color: #999;
}

.tooltip .title {
  font-size: 16px;
  margin-bottom: 10px;
}

.tooltip .link {
  margin-top: 10px;
  color: #75aada;
  text-decoration: underline;
}

.log-status {
  position: fixed;
  width: 20px;
  height: 20px;
  z-index: 9999;
  left: 0;
  bottom: 0;
}

.booster-icon {
  width: 55px;
  height: 55px;
  position: absolute;
  z-index: 99999;
}

.running {
  color: green;
}

.techStandby {
  color: #6ebd6e;
}

.maint {
  color: #e5e923;
}

.faultShutdown {
  color: #df1f0f;
}

.userShutdown {
  color: #eaa218;
}

.netFault {
  color: #e26ded;
}

.limit {
  color: #4746ce;
}

.envStandby {
  color: #44d5eb;
}

.unknown {
  color: #9e9fa3;
}

.disconn {
  color-color: #818389;
}
</style>