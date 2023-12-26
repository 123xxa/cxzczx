<template>
  <div class="content">
    <div class="top">
      <div class="top-t">
        <div class="top-t-item" :class="{ 'top-t-item-active': menuItem == 0 }" @click="changeMenuTitle(0)">{{ $t('text34')
        }}</div>
        <div class="top-t-item" :class="{ 'top-t-item-active': menuItem == 1 }" @click="changeMenuTitle(1)">{{ $t('text272')
        }}</div>
      </div>
      <div class="top-b">

        <img src="@/assets/images/lever/list.png" class="top-list-icon" @click="show = true" alt />
        <span class="top-b-text1">{{ list && list.length !== 0 ? list[listIndex].symbol : '--' }} / USDT</span>
        <span class="top-b-text2"
          :style="{ color: `${Number(list[listIndex].percentChange24h) >= 0 ? '#51bc86' : '#f6465d'}` }"
          v-if="list && list.length !== 0">{{ getPercent(list[listIndex].percentChange24h) >= 0 ? '+' :
            '' }}{{ getPercent(list[listIndex].percentChange24h) }}%</span>
        <!-- <div>
                    <img src="@/assets/images/lever/datamap.png" alt="" style="width:20px;height:20px;">
                    <img src="@/assets/images/lever/record1.png" alt="" style="height:15px;width: 15px;">
          </div>-->
      </div>
    </div>
    <div class="m">
      <div class="m-l"
        :style="{ color: `${Number(list && list.length !== 0 ? list[listIndex].percentChange24h : 0) >= 0 ? '#51bc86' : '#f6465d'}` }">
        {{ Number(Number(list && list.length !== 0 ? list[listIndex].price : 0).toFixed(8)) }}</div>
      <div class="m-r">
        <div style="margin-right: 5px">
          <div>{{ $t('text35') }}</div>
          <div>{{ $t('text36') }}</div>
          <!-- <div>{{ $t('text37') }}</div> -->
        </div>
        <div>
          <!-- <div class="value-high">{{ Number(Number(list && list.length !== 0 ? list[listIndex].maxPrice : 0).toFixed(8)) }}</div>
          <div class="value-low">{{ Number(Number(list && list.length !== 0 ? list[listIndex].minPrice : 0).toFixed(8)) }}</div> -->
          <div class="value-high">{{ currentHigh }}</div>
          <div class="value-low">{{ currentLow }}</div>
          <!-- <div>{{ Number(Number(list && list.length !== 0 ? list[listIndex].price : 0).toFixed(8)) }}</div> -->
        </div>
      </div>
    </div>

    <div class="time-list">
      <div :class="['time-list-item', timeType == k ? 'time-list-item-active' : '']" v-for="(i, k) in timeList"
        @click="changeChart(k)" :key="k">{{ i.title }}</div>
    </div>
    <trading-vue ref="tradingVue" :data="chartData" :width="width" :height="316" titleTxt
      :colorBack="getSwitchChecked ? '#171E26' : '#FFFFFF'" :colorText="getSwitchChecked ? '#FFFFFF' : '#000000'" :toolbar="false"
      class="trading-vue"></trading-vue>
    <div v-show="menuItem == 0">
      <div class="list" v-if="prodList && prodList.length !== 0">
        <div class="list-item" v-for="(i, k) in prodList" :key="k" @click="prodIndex = k">
          <div>{{ i.profitRatesTime }} {{ $t('text38') }}</div>
          <div class="list-item-text">{{ $t('text39') }}{{ Number(Number((i.profitRates || 0) * 100).toFixed(2)) }}%</div>
          <img src="@/assets/images/lever/icon.png" class="list-icon" alt="" v-if="prodIndex == k">
        </div>
      </div>
      <div class="text">{{ $t('text40') }}</div>
      <div class="list" style="margin-top: 15px;">
        <div class="list-item">
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
        <div class="record-tab" :class="{ 'record-tab-active': orderIndex == 0 }" @click="changeMenu(0)">{{ $t('text45') }}
        </div>
        <div class="record-tab" :class="{ 'record-tab-active': orderIndex == 1 }" @click="changeMenu(1)">{{ $t('text46') }}
        </div>
      </div>
      <OrderList :list="orderList" v-if="orderList && orderList.length !== 0" />
      <empty v-else />
      <list :show.sync="show" :list="list" :index="listIndex" @changeIndex="changeIndex" />
    </div>
    <div v-show="menuItem == 1">
      <div class="other-top-box">
        <div class="o-t-menu">
          <div class="t-menu-item" :class="{'t-l-active': otherMenuIndex == 0}" @click="changeOtherMenu(0)">{{ $t('text15') }}</div>
          <div class="t-menu-item" :class="{'t-r-active': otherMenuIndex == 1}" @click="changeOtherMenu(1)">{{ $t('text16') }}</div>
        </div>
        <div class="box-one">
          <div class="one-item o-n-box" @click="selectSellShow = true">
            <div class="text-item">{{ selectSellList[ssIndex] }}</div>
          </div>
          <div class="one-item o-n-box" @click="numOneShow = true">
            <div class="text-item">{{ numOneList[numOneIndex] }}</div>
          </div>
        </div>
        <div class="o-n-box mgt-10">
          <van-field class="input-item" v-model="numPrice" placeholder="" :disabled="ssIndex == 0" :type="ssIndex == 1 ? 'number' : 'text'" />
        </div>
        <div class="mgt-10">1.00 {{ list && list.length !== 0 ? list[listIndex].symbol : '--' }}</div>
        <div class="mgt-10">{{ $t('text274') }}</div>
        <div class="o-n-box mgt-10">
          <van-field class="input-item" v-model="numNum" :placeholder="$t('text22')" type="number" :right-icon="require('@/assets/images/down.png')" @click-right-icon="numTwoShow = true" />
        </div>
        <div class="four-box mgt-10">
          <div class="f-item" @click="fourItem = item; numNum = 0" v-for="item in 4" :key="item" :style="{color: `${fourItem === item ? 'var(--color)' : '#7286A5'}`, border: `${fourItem === item ? 'unset' : '1px solid #7286A5'}`, backgroundColor: `${fourItem === item ? (otherMenuIndex == 0 ? '#51BC86' : '#F6465D') : 'unset'}`}">{{ item * 25 }}%</div>
        </div>
        <div class="mgt-10">{{ $t('text278') }}：{{ token && userInfo && userInfo.usdt || 0 }} USDT</div>
        <div class="other-btn-green" v-if="otherMenuIndex == 0" @click="submitOther()">{{ $t('text15') }} ({{ $t('text275') }})</div>
        <div class="other-btn-red" v-else @click="submitOther()">{{ $t('text16') }} ({{ $t('text276') }})</div>
      </div>
      <div class="other-list">
        <div class="other-title">{{ $t('text28') }}</div>
        <div class="other-th">
          <div class="th-item">{{ $t('text242') }}</div>
          <div class="th-item">{{ $t('text227') }}</div>
          <div class="th-item">{{ $t('text19') }}</div>
          <div class="th-item">{{ $t('text24') }}</div>
          <div class="th-item">{{ $t('text277') }}</div>
        </div>
        <div class="empty-box">
          <img src="@/assets/images/lever/anonymous.png" alt="" class="empty-img" />
          <div class="empty-text">{{ $t('text30') }}</div>
        </div>
      </div>
      <van-popup v-model="selectSellShow" position="bottom">
        <van-picker
          show-toolbar
          :confirm-button-text="$t('text94')"
          :cancel-button-text="$t('text95')"
          :columns="selectSellList"
          @confirm="onConfirmSell"
          @cancel="selectSellShow = false"
        />
      </van-popup>
      <van-popup v-model="numOneShow" position="bottom">
        <van-picker
          show-toolbar
          :confirm-button-text="$t('text94')"
          :cancel-button-text="$t('text95')"
          :columns="numOneList"
          @confirm="onConfirmOne"
          @cancel="numOneShow = false"
        />
      </van-popup>
      <van-popup v-model="numTwoShow" position="bottom">
        <van-picker
          show-toolbar
          :confirm-button-text="$t('text94')"
          :cancel-button-text="$t('text95')"
          :columns="numTwoList"
          @confirm="onConfirmTwo"
          @cancel="numTwoShow = false"
        />
      </van-popup>
    </div>
    <van-overlay :show="confirmShow" z-index="9999">
      <div class="confirm-box" v-if="prodList && prodList.length !== 0">
        <div class="confirm-title">{{ $t('text241') }}
          <van-icon name="cross" class="close" color="#000000" size="18" @click="confirmShow = false" />
        </div>
        <div class="confirm-item" style="margin-top: 22px;">{{ list && list.length !== 0 ? list[listIndex].symbol : '--'
        }}/USDT</div>
        <div class="confirm-item">
          <div>{{ $t('text242') }}</div>
          <div v-if="menuItem == 0">{{ payDropRise == 1 ? $t('text44') : $t('text43') }}</div>
          <div v-else>{{ otherMenuIndex == 1 ? $t('text276') : $t('text275') }}</div>
        </div>
        <template v-if="menuItem == 0">
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
            <div>{{ Number(Number((prodList[prodIndex].profitRates || 0) * 100).toFixed(2)) }}%</div>
          </div>
        </template>
        <template v-else>
          <div class="confirm-item">
            <div>{{ $t('text279') }}</div>
            <div>{{ numNum || '' }}</div>
          </div>
          <div class="confirm-item">
            <div>{{ $t('text21') }}</div>
            <div>{{ numOneList[numOneIndex] || '' }}</div>
          </div>
          <div class="confirm-item" style="margin-bottom: 22px;">
            <div>{{ $t('text281') }}</div>
            <div>{{ '0' }}</div>
          </div>
        </template>
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
import { mapGetters, mapActions } from "vuex"
import { getProfitRatesList, postOrder, getLastPrice, getOrderList, getKlines } from '@/api/home.js'
export default {
  components: { TradingVue, list, OrderList },
  computed: {
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
      prodIndex: 0,
      prodList: [],
      show: false,
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
      currentLow: '',
      timer: undefined,
      // 菜单切换
      menuItem: 0,
      // 右侧菜单
      otherMenuIndex: 0,
      ssIndex: 0,
      selectSellList: [this.$t('text18'), this.$t('text17')],
      selectSellShow: false,
      numOneIndex: 0,
      numOneList: [1, 3, 5, 10, 20, 30, 50, 75, 100, 125, 150],
      numOneShow: false,
      numTwoIndex: 0,
      numTwoList: [1, 5, 10, 30, 50, 100, 300, 500, 1000, 3000, 5000, 10000, 30000, 50000],
      numTwoShow: false,
      numPrice: this.$t('text273'),
      numNum: 1,
      fourItem: 0,
    };
  },
  created() {
    this.width = document.documentElement.clientWidth;
    this.getRatesList()
    this.getList()
    this.getOrder()
    this.updateLine()
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = undefined
  },
  methods: {
    ...mapActions(['setUserInfo']),
    submitOther() {
      if (!this.numPrice) return this.$toast(this.$t('text283'))
      if (!this.numNum || this.numNum == 0) return this.$toast(this.$t('text282'))
      this.confirmShow = true
    },
    onConfirmSell(e) {
      let index = this.selectSellList.findIndex(o => o == e)
      this.ssIndex = (index === -1 ? 0 : index)
      this.numPrice = this.ssIndex === 0 ? this.$t('text273') : this.currentLow
      this.selectSellShow = false
    },
    onConfirmOne(e) {
      let index = this.numOneList.findIndex(o => o == e)
      this.numOneIndex = (index === -1 ? 0 : index)
      this.numOneShow = false
    },
    onConfirmTwo(e) {
      let index = this.numTwoList.findIndex(o => o == e)
      this.numTwoIndex = (index === -1 ? 0 : index)
      this.numNum = e
      this.numTwoShow = false
    },
    changeOtherMenu(index) {
      if (this.otherMenuIndex == index) return
      this.otherMenuIndex = index
    },
    changeMenuTitle(index) {
      if (this.menuItem == index) return
      this.menuItem = index
    },
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
      if (this.menuItem == 1) return this.$toast('text284')
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
    updateLine() {
      this.timer = setInterval(() => {
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

      &:first-child {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }

      &:last-child {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
    }

    .top-t-item-active {
      background: #ffce1c;
      color: #000000;
    }
  }

  .top-b {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .top-list-icon {
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

.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;

  .list-item {
    width: 24%;
    background: #EEEEEE;
    border-radius: 10px;
    padding: 8px 10px;
    margin: 10px 10px 0 0;
    text-align: center;
    color: #4B5563;
    position: relative;

    .list-item-text {
      color: #E27046;
    }

    .list-icon {
      width: 25px;
      height: 20px;
      position: absolute;
      bottom: 0;
      right: 0;
      border-radius: 0 0 10px 0;
    }
  }
}

.text {
  margin-top: 15px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text-item {
    display: flex;
    align-items: center;
  }
}

.trading-vue {
  background: var(--box-bg-color);
}

.input-content {
  padding: 0 15px;
  box-sizing: border-box;
  margin-top: 10px;
}

.input {
  border: 1px solid rgba(75, 85, 99, 1);
  background: #00000000;
  border-radius: 10px;
}

::v-deep .van-field__control {
  color: var(--color);
}

.btn-group {
  padding: 0 15px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border-bottom: 1px solid rgba(75, 85, 99, 1);
  color: #fff;

  .btn {
    width: 48%;
    border-radius: 5px;
    background: #51BC86;
    text-align: center;
    padding: 10px 0;
    font-size: 16px;
  }

  .btn2 {
    background: #F6465D;
  }
}

.record-tab {
  margin: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--color);

  .record-tab {
    position: relative;
  }

  .record-tab-active::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color);
  }
}

.confirm-box {
  width: 90%;
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

.other-top-box {
  width: 100%;
  height: fit-content;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  .o-t-menu {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: #FFFFFF;
    .t-menu-item {
      width: 50%;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background-color: rgba(75,85,99,0.3);
      border-top: 16px transparent;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
    .t-l-active {
      background: #51BC86;
    }
    .t-r-active {
      background: #F6465D;
    }
    &::before {
      content: "";
      width: 0;
      height: 0;
      border-top: 16px solid var(--box-bg-color);
      border-right: 16px solid transparent;
      border-left: 16px solid transparent;
      border-bottom: 16px solid var(--box-bg-color);
      position: absolute;
      z-index: 2;
    }
  }
  .box-one {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;
    .one-item {
      display: flex;
      align-items: center;
      padding-right: 4px;
      flex: 1 !important;
      margin-left: 10px;
      .text-item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:first-child {
        width: 70%;
        margin-left: 0;
      }
      &::after {
        content: '';
        width: 14px;
        height: 14px;
        background-image: url('@/assets/images/down.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .four-box {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .f-item {
      width: calc((100% - 30px) / 4);
      height: 25px;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border-radius: 2px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .o-n-box {
    width: 100%;
    height: 32px;
    border: 1px solid rgb(75,85,99);
    border-radius: 5px;
    box-sizing: border-box;
    .input-item {
      width: 100%;
      height: 30px;
      padding: 0 10px;
      border: unset;
      background: unset;
      line-height: 30px;
      font-size: 12px;
      color: var(--color);
      ::v-deep .van-icon__image {
        width: 14px;
        height: 14px;
      }
      ::placeholder {
        color: rgb(75,85,99);
      }
    }
  }
  .mgt-10 {
    margin-top: 10px;
  }
  .other-btn-green {
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 16px;
    color: #FFFFFF;
    background: #51BC86;
    border-radius: 5px;
    margin-top: 15px;
  }
  
  .other-btn-red {
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 16px;
    color: #FFFFFF;
    background: #F6465D;
    border-radius: 5px;
    margin-top: 15px;
  }
}
.other-list {
  width: 100%;
  padding: 10px 10px 60px;
  box-sizing: border-box;
  margin-top: 10px;
  border-top: 1px solid rgb(75, 85, 99);
  .other-title {
    font-size: 16px;
  }
  .other-th {
    width: 100%;
    margin-top: 20px;
    display: flex;
    .th-item {
      flex: 1;
      text-align: center;
      &:first-child {
        flex: unset;
        width: 50px;
        text-align: left;
      }
      &:last-child {
        flex: unset;
        width: fit-content;
      }
    }
  }
  .empty-box {
    width: 100%;
    padding: 55px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    .empty-img {
      width: 66px;
      height: 66px;
      display: block;
    }
    .empty-text {
      font-size: 13px;
      margin-top: 10px;
    }
  }
}
</style>