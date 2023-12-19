<template>
    <div class="content">
    <van-sticky >
      <div class="sticky">
        <div class="tab-box">
        <div class="tab-item">USDT</div>
      </div>
      <div class="table-th">
        <div style="flex: 1.5 1 0%" @click="toSort(1)">
          {{ $t('text11') }}
          <img :src="getSortPic(1)" class="updown" alt="" />
        </div>
        <div style="flex: 1" @click="toSort(2)">
          {{ $t('text12') }}
          <img :src="getSortPic(2)" class="updown" alt="" />
        </div>
        <div style="flex: 1; text-align: right" @click="toSort(3)">
          {{ $t('text13') }}
          <img :src="getSortPic(3)" class="updown" alt="" />
        </div>
      </div>
      </div>
    </van-sticky>
    <div class="table-item" v-for="(i, k) in list" :key="i.symbol">
      <div class="table-name">
        <div class="table-name-text">
          <span class="table-name-text1"> {{i.symbol}}<span class="table-name-text2">/USDT</span> </span>
        </div>
        <div>
          <span class="table-name-text2">{{ $t('text14') }}{{ getPercent(i.volumeChange24h) }}</span>
        </div>
      </div>
      <div class="table-price">{{ Number(Number(i.price).toFixed(8)) }}</div>
      <div class="table-rise">
        <div :class="{'table-button-up': true, 'table-button-down': Number(i.percentChange24h) >= 0}">{{Number(i.percentChange24h) >= 0 ? '+' : ''}}{{getPercent(i.percentChange24h)}}%</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getLastPrice } from "@/api/home.js";
  import {mapGetters} from "vuex"
  export default {
    data() {
      return {
        list: [],
        sortType: '',
        sortIndex: null,
      }
    },
    computed:{
        ...mapGetters(['coinMainList'])
    },
    watch: {
      coinMainList: {
        handler(newVal, oldVal) {
          let arr = newVal || []
          if (this.list && this.list.length > 0 && arr && arr.length > 0) {
            arr.map(item => {
              let index = this.list.findIndex(o => o.cryptoId == item.cryptoId)
              if (index !== -1) {
                this.list[index].volumeChange24h = item.volumeChange24h
                this.list[index].price = item.price
                this.list[index].percentChange24h = item.percentChange24h
              }
              return item
            })
            console.log(arr)
          }
        },
        immediate: true
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getSortPic(index) {
        if (this.sortIndex == index) {
          return this.sortType == 'up' ? require('@/assets/images/updown1.png') : require('@/assets/images/updown2.png')
        }
        return require('@/assets/images/updown0.png')
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
          this.list = res.data || []
        }
      },
      toSort(index) {
        if (index !== this.sortIndex) {
          this.sortIndex = index
          this.sortType = 'up'
        } else {
          this.sortType = this.sortType === 'up' ? 'down' : 'up'
        }
        
        if (this.sortIndex == 1) {
          this.list = this.multiSort(this.list, (a, b) => this.sortType === 'up' ? (a.symbol).localeCompare(b.symbol) : (b.symbol).localeCompare(a.symbol))
        } else if (this.sortIndex == 2) {
          this.list = this.multiSort(this.list, (a, b) =>  this.sortType === 'up' ? (a.price - b.price) : (b.price - a.price))
        } else {
          this.list = this.multiSort(this.list, (a, b) =>  this.sortType === 'up' ? (a.percentChange24h - b.percentChange24h) : (b.percentChange24h - a.percentChange24h))
        }
      },
      multiSort(array, ...compairers) {
          let arr = JSON.parse(JSON.stringify(array))
          return arr.sort((a, b) => {
              for (const c of compairers) {
                  const r = c(a, b)
                  if (r !== 0) {
                      return r
                  }
              }
          })
      },
    }
  }
</script>

<style lang="scss" scoped>
.content {
  background: var(--box-bg-color);
}
.sticky{
  background: var(--box-bg-color);
}
.box {
  background: var(--box-bg-color);
  margin-bottom: 10px;
}
.tab-box {
  padding: 15px 20px;
  box-sizing: border-box;
  display: flex;
  margin: 0;
  .tab-item {
    color: rgba(255, 206, 28, 1);
    font-size: 16px;
    padding-bottom: 5px;
    border-bottom: 3px solid rgba(255, 206, 28, 1);
    font-weight: 600;
  }
}
.table-th {
  display: flex;
  color: var(--color);
  font-size: 12px;
  padding: 20px;
  box-sizing: border-box;
  background: var(--box-bg-color);
  border-radius: 20px 20px 0 0;
  .updown {
    width: 8px;
    height: 10px;
    margin-left: 4px;
  }
}
.table-item {
  box-sizing: border-box;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  background: var(--box-bg-color);

  .table-name {
    flex: 1.5 1 0%;
    .name-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .table-name-text2 {
      font-size: 12px;
      color: #9ca3af;
      font-weight: 500;
    }
    .table-name-text1 {
      font-size: 14px;
      color: var(--color);
      font-weight: 700;
    }
  }
  .table-price {
    flex: 1;
    font-size: 14px;
    color: var(--color);
    font-weight: 700;
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
</style>