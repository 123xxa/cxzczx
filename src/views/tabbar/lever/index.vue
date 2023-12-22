<template>
  <div class="content">
    <div class="top">
        <div class="top-t">
          <div :class="['top-t-l top-t-item top-t-item-active']">{{ $t('text34') }}</div>
        </div>
        <div class="top-b">
  
          <img src="@/assets/images/lever/list.png" class="top-list-icon" @click="show =true" alt />
          <span class="top-b-text1">{{ list && list.length !== 0 ? list[listIndex].symbol : '--' }} / USDT</span>
          <span class="top-b-text2" :style="{color: `${Number(list[listIndex].percentChange24h) >= 0 ? '#51bc86' : '#f6465d'}`}" v-if="list && list.length !== 0">{{getPercent(list[listIndex].percentChange24h) >= 0 ? '+' : ''}}{{getPercent(list[listIndex].percentChange24h)}}%</span>
          <!-- <div>
                    <img src="@/assets/images/lever/datamap.png" alt="" style="width:20px;height:20px;">
                    <img src="@/assets/images/lever/record1.png" alt="" style="height:15px;width: 15px;">
          </div>-->
        </div>
      </div>
    <div class="m">
      <div class="m-l" :style="{color: `${Number(list && list.length !== 0 ? list[listIndex].percentChange24h : 0) >= 0 ? '#51bc86' : '#f6465d'}`}">{{ Number(Number(list && list.length !== 0 ? list[listIndex].price : 0).toFixed(8)) }}</div>
      <div class="m-r">
        <div style="margin-right: 5px">
          <div>{{ $t('text35') }}</div>
          <div>{{ $t('text36') }}</div>
          <!-- <div>{{ $t('text37') }}</div> -->
        </div>
        <div>
          <!-- <div class="value-high">{{ Number(Number(list && list.length !== 0 ? list[listIndex].maxPrice : 0).toFixed(8)) }}</div>
          <div class="value-low">{{ Number(Number(list && list.length !== 0 ? list[listIndex].minPrice : 0).toFixed(8)) }}</div> -->
          <div class="value-high">{{currentHigh}}</div>
          <div class="value-low">{{currentLow}}</div>
          <!-- <div>{{ Number(Number(list && list.length !== 0 ? list[listIndex].price : 0).toFixed(8)) }}</div> -->
        </div>
      </div>
    </div>

    <div class="time-list">
      <div
        :class="['time-list-item', timeType == k ? 'time-list-item-active' : '']"
        v-for="(i, k) in timeList"
        @click="changeChart(k)"
        :key="k"
      >{{ i.title }}</div>
    </div>
    <trading-vue
      ref="tradingVue"
      :data="chartData"
      :width="width"
      :height="316"
      titleTxt
      :colorBack="getSwitchChecked?'#171E26':'#FFFFFF'"
      :colorText="getSwitchChecked?'#FFFFFF':'#000000'"
      :toolbar="false"
      class="trading-vue"
    ></trading-vue>

    <div class="list" v-if="prodList && prodList.length !== 0">
      <div class="list-item" v-for="(i,k) in prodList" :key="k" @click="prodIndex = k">
         <div>{{ i.profitRatesTime }} {{ $t('text38') }}</div>
         <div class="list-item-text">{{ $t('text39') }}{{Number(Number((i.profitRates || 0) * 100).toFixed(2))}}%</div>
         <img src="@/assets/images/lever/icon.png" class="list-icon" alt="" v-if="prodIndex == k">
      </div>
    </div>
    <div class="text">{{ $t('text40') }}</div>
    <div class="list" style="margin-top: 15px;">
      <div class="list-item" >
         <div>USDT</div>
         <img src="@/assets/images/lever/icon.png" class="list-icon" alt="">
      </div>
    </div>
    <div class="text">{{ $t('text41') }}</div>
    <div class="input-content">
      <van-field class="input" v-model="amount" label="" right-icon="arrow" placeholder="" type="number" />
    </div>
    <div class="text">
      <div class="text-item">
        <img src="@/assets/images/lever/moy.png" style="width: 20px; height: 20px;" alt="">
        <span>{{ $t('text42') }}</span>
      </div>
      <div>{{ token && userInfo && userInfo.usdt || 0 }} USDT</div>
    </div>
    <div class="btn-group">
      <div class="btn" @click="openVan(0)">{{ $t('text43') }}</div>
      <div class="btn btn2" @click="openVan(1)">{{ $t('text44') }}</div>
    </div>
    <div class="record-tab">
      <div class="record-tab" :class="{'record-tab-active': orderIndex == 0}" @click="changeMenu(0)">{{ $t('text45') }}</div>
      <div class="record-tab" :class="{'record-tab-active': orderIndex == 1}" @click="changeMenu(1)">{{ $t('text46') }}</div>
    </div>
    <OrderList :list="orderList" v-if="orderList && orderList.length !== 0" />
    <empty v-else />
    <list :show.sync="show" :list="list" :index="listIndex" @changeIndex="changeIndex" />
    <van-overlay :show="confirmShow" z-index="9999">
      <div class="confirm-box" v-if="prodList && prodList.length !== 0">
        <div class="confirm-title">{{ $t('text241') }}
          <van-icon name="cross" class="close" color="#000000" size="18" @click="confirmShow = false" />
        </div>
        <div class="confirm-item" style="margin-top: 22px;">{{ list && list.length !== 0 ? list[listIndex].symbol : '--' }}/USDT</div>
        <div class="confirm-item">
          <div>{{ $t('text242') }}</div>
          <div>{{ payDropRise == 1 ? $t('text44') : $t('text43') }}</div>
        </div>
        <div class="confirm-item">
          <div>{{ $t('text41') }}</div>
          <div>{{ amount }}</div>
        </div>
        <div class="confirm-item">
          <div>{{ $t('text38') }}</div>
          <div>{{ prodList[prodIndex].profitRatesTime }}</div>
        </div>
        <div class="confirm-item" style="margin-bottom: 22px;">
          <div>{{ $t('text39') }}</div>
          <div>{{Number(Number((prodList[prodIndex].profitRates || 0) * 100).toFixed(2))}}%</div>
        </div>
        <div class="c-btn-group">
          <div class="btn cancel" @click="confirmShow = false">{{ $t('text95') }}</div>
          <div class="btn confirm" @click="submit">{{ $t('text94') }}</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import TradingVue from "trading-vue-js";
import list from "./list.vue";
import OrderList from "./orderList.vue";
import {mapGetters,mapActions} from "vuex"
import { getProfitRatesList, postOrder, getLastPrice, getOrderList, getKlines } from '@/api/home.js'
export default {
  components: { TradingVue, list, OrderList },
  computed:{
    ...mapGetters(['getSwitchChecked', 'coinMainList', 'userInfo', 'token'])
  },
  watch: {
    coinMainList: {
      handler(newVal, oldVal) {
        let arr = newVal || []
        if (this.list && this.list.length > 0 && arr && arr.length > 0 && JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          arr.map(item => {
            let index = this.list.findIndex(o => o.cryptoId == item.cryptoId)
            if (index !== -1) {
              this.list[index].volumeChange24h = item.volumeChange24h
              this.list[index].price = item.price
              this.list[index].percentChange24h = item.percentChange24h
            }
            return item
          })
        }
        this.$forceUpdate()
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      updateSwitch: false,
      prodIndex:0,
      prodList:[],
      show:false,
      width: 0,
      // chartData: Data2,
      chartData: {},
      timeType: 0,
      timeList: [
        {
          title: "1m",
          value: 1
        },
        {
          title: "3m",
          value: 2
        },
        {
          title: "30m",
          value: 3
        },
        {
          title: "1h",
          value: 4
        },
        {
          title: "2h",
          value: 5
        },
        {
          title: "4h",
          value: 6
        },
        {
          title: "1d",
          value: 7
        }
      ],
      amount: '',
      payDropRise: 0,
      confirmShow: false,
      list: [],
      listIndex: 0,
      // 订单列表
      orderIndex: 0,
      orderList: [],
      currentHigh: '',
      currentLow: ''
    };
  },
  created() {
    this.width = document.documentElement.clientWidth;
    this.getRatesList()
    this.getList()
    this.getOrder()
    this.updateLine()
  },
  methods: {
    ...mapActions(['setUserInfo']),
    getPercent(e) {
      if (!(e && String(e).length > 0)) return '0'
      let n = String(e)
      let list = n.split('')
      let index = list.findIndex(o => o === '.')
      if (index !== -1) {
        let b = list.slice(0, index)
        let a = list.slice(index + 1, list.length)
        if (a.length > 2) {
          if (Number(a[0]) === 0 && Number(a[1]) === 0) {
            let nIn = a.findIndex(o => Number(o) !== 0)
            if (nIn !== -1) {
              let last = nIn + 2
              return `${b.join('')}.${a.slice(0, last > a.length ? a.length : last).join('')}`
            }
          } else {
            return `${b.join('')}.${a.slice(0, 2).join('')}`
          }
        }
      }
      return `${n}`
    },
    changeIndex(index) {
      this.listIndex = index
      this.getList()
    },
    openVan(type) {
      this.payDropRise = type
      this.confirmShow = true
    },
    async getList() {
      const res = await getLastPrice()
      if (res.code == 200) {
        this.list = res.data || []
        this.getChartsData()
      }
    },
    async getRatesList() {
      const res = await getProfitRatesList()
      if (res.code == 200) {
        this.prodList = res.data || []
      }
    },
    async submit() {
      const res = await postOrder({
        profitRatesTime: this.prodList[this.prodIndex].profitRatesTime,
        amount: this.amount,
        payDropRise: this.payDropRise,
        cryptoId: this.list[this.listIndex].cryptoId
      })
      if (res.code == 200) {
        this.$toast(this.$t('text243'))
        this.confirmShow = false
        this.setUserInfo()
        this.getOrder()
      }
    },
    changeMenu(index) {
      if (this.orderIndex == index) return
      this.orderIndex = index
      this.getOrder()
    },
    async getOrder() {
      if (!this.token) return
      const res = await getOrderList({
        status: this.orderIndex
      })
      if (res.code == 200) {
        this.orderList = res.data || []
      }
    },
    changeChart(index) {
      if (this.timeType == index) return
      this.timeType = index
      this.getChartsData()
    },
    async getChartsData() {
      if (!(this.list && this.list.length > 0)) return
      // const res = await getKline({
      //   // period: this.timeList[this.timeType].title,
      //   period: "1min",
      //   // currency_match_id: this.list[this.listIndex].cryptoId,
      //   currency_match_id: 1,
      //   sizeNumber: 20
      // })
      this.updateSwitch = true
      const res = await getKlines({
        symbol: this.list[this.listIndex].symbol + "USDT",
        interval: this.timeList[this.timeType].title, // "1m",
        limit: 200
      })
      if (res.code == 200) {
        const ohlcv = res.data.map((item) => {
          // [timestamp, open, high, low, close, volume]
          return [
            parseInt(item[0]),
            parseFloat(item[1]),
            parseFloat(item[2]),
            parseFloat(item[3]),
            parseFloat(item[4]),
            parseFloat(item[5]),
          ]
        })

        this.currentHigh = ohlcv[ohlcv.length - 1][2]
        this.currentLow = ohlcv[ohlcv.length - 1][3]

        this.chartData = { ohlcv }
        this.$refs.tradingVue.resetChart()
        this.updateSwitch = false
      }
    },
    updateLine () {
      setInterval(() => {
        if (!this.updateSwitch) {
          this.getChartsData()
        }
      }, 2000)
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  background: var(--box-bg-color);
  min-height: calc(100vh - 50px);
}
.top {
  background: var(--box-bg-color);
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(17, 24, 39, 1);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .top-t {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    .top-t-item {
      background: #262e39;
      height: 30px;
      padding: 0 10px;
      line-height: 30px;
      color: #fff;
    }
    .top-t-item-active {
      background: #ffce1c;
      color: #000000;
    }
    .top-t-l {
      border-radius: 20px;
    }
  }
  .top-b {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .top-list-icon{
      background: var(--box-bg-color);
      width: 20px; 
      height: 20px;
      position: relative;
    }
    .top-b-text1 {
      font-size: 14px;
      margin: 0 10px;
      color: var(--color);
    }
    .top-b-text2 {
      color: #f6465d;
      font-size: 12px;
    }
  }
}
.m {
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .m-l {
    color: rgba(246, 70, 93, 1);
    font-size: 20px;
    padding-left: 15px;
  }
  .m-r {
    min-width: 100px;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    font-size: 12px;
    color: var(--color);
  }
}
.time-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .time-list-item {
    padding: 10px 0;
  color: var(--color);
  }
  .time-list-item-active {
    border-bottom: 1px solid var(--color);
  }
}

.list{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
 .list-item{
    width: 24%;
    background: #EEEEEE;
    border-radius: 10px;
    padding: 8px 10px;
    margin:  10px 10px 0 0 ;
    text-align: center;
    color: #4B5563;
    position: relative;
    .list-item-text{
      color: #E27046;
    }
    .list-icon{
      width: 25px;
      height: 20px;
      position: absolute;
      bottom: 0;
      right: 0;
      border-radius: 0 0 10px 0;
    }
 }
}

.text{
  margin-top: 15px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text-item{
    display: flex;
  align-items: center;
  }
}
.trading-vue{
  background: var(--box-bg-color);
}
.input-content{
  padding: 0 15px;
  box-sizing: border-box;
  margin-top: 10px;
}
.input{
  border: 1px solid rgba(75,85,99,1);
  background: #00000000;
  border-radius: 10px;
}
::v-deep .van-field__control{
  color:  var(--color);
}
.btn-group{
  padding: 0 15px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border-bottom: 1px solid rgba(75,85,99,1);
  color:  #fff;
 .btn{
    width: 48%;
    border-radius:5px;
    background: #51BC86;
    text-align: center;
    padding: 10px 0;
    font-size: 16px;
}
.btn2{
  background: #F6465D;
}
}
.record-tab{
  margin: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--color);
  .record-tab{
    position: relative;
  }
  .record-tab-active::after{
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 2px;
    background:  var(--color);
  }
}
.confirm-box {
  width: 360px;
  height: fit-content;
  position: fixed;
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  color: #333333;
  font-size: 14px;
  border-radius: 5px;
  overflow: hidden;
  .confirm-title {
    width: 100%;
    height: 55px;
    line-height: 55px;
    text-align: center;
    font-size: 17px;
    color: #000000;
    border-bottom: 1px solid #e5e7eb;
    position: relative;
    .close {
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
    }
  }
  
  .confirm-item {
    width: 100%;
    padding: 0 22px;
    box-sizing: border-box;
    margin-top: 11px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .c-btn-group {
    width: 100%;
    display: flex;
    align-items: center;
    .btn {
      width: 50%;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 15px;
      background: #f2f2f2;
      box-sizing: border-box;
      &:first-child {
        border-right: 1px solid #e5e7eb;
      }
    }
    .cancel {
      color: #333333;
    }
    .confirm {
      color: #40affe;
    }
  }
}
</style>