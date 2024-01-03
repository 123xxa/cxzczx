<template>
  <div>
    <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
      <template #right>
        <div>
          <setLang />
        </div>
      </template>
      <template #title>
        <div class="home-title">{{ $t('text1') }}</div>
      </template>
    </van-nav-bar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(i, k) in bannerList" :key="k">
        <img :src="i" alt class="swipe-img" />
      </van-swipe-item>
    </van-swipe>
    <div class="box nav-box">
      <div class="nav-item"  @click="toOther('/identityVerification')">
        <img src="@/assets/images/home/lmlm.png" class="nav-icon" alt />
        <div>{{$t("text3") }}</div>
      </div>
      <div class="nav-item"  @click="toOther('/chat')">
        <img src="@/assets/images/home/kefu.png" class="nav-icon" alt />
        <div>{{$t("text285") }}</div>
      </div>
    </div>
    <div class="box recharge-box" @click="toOther('/recharge')">
      <div style="width: 100%;">
        <div class="recharge-box-top">{{$t('text9')}}</div>
        <div class="recharge-box-bottom">{{$t('text10')}}</div>
      </div>
    </div>
    <div class="box proportion-box">
      <div v-for="(i,k) in proportionList" :key="k" class="proportion-item" v-if="k < 3">
        <div>{{i.symbol}}/USDT</div>
        <div class="proportion-content" :style="{color: `${Number(i.percentChange24h) >= 0 ? '#51bc86' : '#f6465d'}`}">{{Number(Number(i.price).toFixed(8))}}</div>
        <div class="proportion-percentage" :style="{color: `${Number(i.percentChange24h) >= 0 ? '#51bc86' : '#f6465d'}`}">{{getPercent(i.percentChange24h) >= 0 ? '+' : ''}}{{getPercent(i.percentChange24h)}}%</div>
      </div>
    </div>
    <div class="box tab-box">
      <div class="tab-item">USDT</div>
    </div>
    <div class="box table-box">
      <div class="table-th">
        <div style="flex: 1.5 1 0%;">{{$t('text11')}}</div>
        <div style="flex:1">{{$t('text12')}}</div>
        <div style="flex:1;text-align:right">{{$t('text13')}}</div>
      </div>
      <div v-for="(i,k) in proportionList" :key="i.symbol" class="table-item">
        <div class="table-name">
          <img :src="i.symbol ? getLogo(i.symbol) : ''" class="name-icon" alt />
          <div class="table-name-text">
            <span class="table-name-text1">
              {{i.symbol}}
              <span class="table-name-text2">/USDT</span>
            </span>
          </div>
        </div>
        <div class="table-price">{{Number(Number(i.price).toFixed(8))}}</div>
        <div class="table-rise">
          <div :class="{'table-button-up': true, 'table-button-down': Number(i.percentChange24h) >= 0}">{{getPercent(i.percentChange24h) >= 0 ? '+' : ''}}{{getPercent(i.percentChange24h)}}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import setLang from "@/components/setLang";
import { getLastPrice } from "@/api/home.js";
import {mapGetters} from "vuex"
export default {
  name: "Home",
  components: { setLang },
  data() {
    return {
      bannerList: [
        require("@/assets/images/home/banner1.jpg"),
        require("@/assets/images/home/banner2.jpg"),
        require("@/assets/images/home/banner3.jpg")
      ],
      proportionList: []
    };
  },
  computed: {
    ...mapGetters(['coinList', 'coinMainList', 'token']),
  },
  watch: {
    coinMainList: {
      handler(newVal, oldVal) {
        let arr = newVal || []
        if (this.proportionList && this.proportionList.length > 0 && arr && arr.length > 0 && JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          arr.map(item => {
            let index = this.proportionList.findIndex(o => o.cryptoId == item.cryptoId)
            if (index !== -1) {
              this.proportionList[index].volumeChange24h = item.volumeChange24h
              this.proportionList[index].price = item.price
              this.proportionList[index].percentChange24h = item.percentChange24h
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
  created() {
    this.getList()
  },
  methods: {
    toOther(path) {
      if (this.token) {
        this.$router.push(path)
      } else {
        this.$router.push('/login')
      }
    },
    getLogo(e) {
      let index = this.coinList.findIndex(o => {
        return String(o.label).toLocaleLowerCase() === String(e).toLocaleLowerCase()
      })
      if (index !== -1) return this.coinList[index].logo
      return this.coinList[0].logo
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
    async getList() {
      const res = await getLastPrice()
      if (res.code == 200) {
        this.proportionList = res.data || []
      }
    }
  }
};
</script>

<style scoped lang="scss">
::v-deep .van-nav-bar {
  background: var(--box-bg-color);
}
.home-title {
  color: var(--color);
}
.my-swipe {
  width: 100%;
  height: 150px;
  .swipe-img {
    width: 100%;
    height: 100%;
  }
}
.box {
  background: var(--box-bg-color);
  margin-bottom: 10px;
}
.nav-box {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  .nav-item {
    text-align: center;
    // width: 33.33%;
    width: 50%;
    font-size: 14px;
    color: #9ca3af;
    .nav-icon {
      width: 30px;
      height: 30px;
      margin-bottom: 10px;
    }
  }
}
.recharge-box {
  text-align: center;
  color: var(--color);
  height: 60px;
  display: flex;
  align-items: center;
  .recharge-box-top {
    font-size: 14px;
    font-weight: 700;
    text-align: center;
  }
  .recharge-box-bottom {
    text-align: center;
    padding-top: 5px;
  }
}
.proportion-box {
  display: flex;
  justify-content: space-between;
  height: 99px;
  align-items: center;
  border-bottom: 1px solid rgba(31, 41, 55, 1);
  margin-bottom: 0;
  .proportion-item {
    width: 33.33%;
    text-align: center;
    font-size: 12px;
    color: #9ca3af;
    .proportion-content {
      font-size: 16px;
      color: #f6465d;
    }
    .proportion-percentage {
      color: rgba(246, 70, 93, 1);
    }
  }
}

.tab-box {
  padding: 10px 20px 0;
  box-sizing: border-box;
  display: flex;
  margin: 0;
  .tab-item {
    color: rgba(255, 206, 28, 1);
    font-size: 14px;
    padding-bottom: 5px;
    border-bottom: 3px solid rgba(255, 206, 28, 1);
  }
}
.table-box {
  margin: 0;
  .table-th {
    display: flex;
    color: rgba(156, 163, 175, 1);
    font-size: 14px;
    padding: 10px 20px 0;
    box-sizing: border-box;
  }
  .table-item {
    box-sizing: border-box;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    .table-name {
      flex: 1.5 1 0%;
      display: flex;
      align-items: center;
      .name-icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
      // .table-name-text{
      //   display: flex;
      //   align-items: flex-end;
      // }
      .table-name-text1 {
        font-size: 18px;
        color: var(--color);
        .table-name-text2 {
          font-size: 12px;
          color: #9ca3af;
        }
      }
    }
    .table-price {
      flex: 1;
      font-size: 16px;
      color: #9ca3af;
    }
    .table-rise {
      flex: 1;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .table-button-up {
        width: 70px;
        height: 30px;
        border-radius: 4px;
        background: rgba(246, 70, 93, 1);
        color: #fff;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
      }
      .table-button-down {
        background: #51bc86;
      }
    }
  }
}
</style>