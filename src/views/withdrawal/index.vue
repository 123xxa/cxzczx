<template>
  <div class="content">
    <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
      <template #title>
        <div class="title">{{ $t('text229') }}</div>
      </template>
      <template #left>
        <van-icon @click="goback" name="arrow-left" color="var(--color)" size="20" />
      </template>
    </van-nav-bar>
    <div class="middle-part">
      <div class="part-box">
        <!-- <div class="m-title">{{ `${list[listIndex].label} ${$t('text228')}` }}</div> -->
        <div class="m-title">{{ `${$route.query.label || '-'} ${$t('text228')}` }}</div>
        <div class="m-tip">{{ $t('text223') }} {{ userInfo && userInfo.usdt || 0 }} {{ list[listIndex].label }}</div>
        <div class="chain-type">
          <div class="chain-title">{{ $t('text231') }}</div>
          <div class="type-box">
            <div class="t-item" :class="{'t-active': item.value === typeIndex}" v-for="item in typeList" :key="item.value" @click="typeIndex = item.value">{{ item.label }}</div>
          </div>
        </div>
      </div>
      <div class="part-box">
        <div class="n-box">
          <div class="n-title">{{ $t('text232') }}</div>
          <div class="input-box">
            <van-field v-model="address" type="text" class="input" :placeholder="$t('text235')" />
            <!-- <div class="input" v-if="address"></div>
            <div class="placeholder" v-else>{{ $t('text235') }}</div>
            <div class="all">{{ $t('text236') }}</div> -->
          </div>
        </div>
        <div class="n-box">
          <div class="n-title">{{ $t('text225') }}</div>
          <div class="input-box">
            <van-field v-model="amount" type="number" class="input" :placeholder="$t('text237')" />
            <div class="unit">{{ list[listIndex].label }}</div>
            <div class="all" @click="amount = (userInfo && userInfo.usdt || 0)">{{ $t('text222') }}</div>
          </div>
        </div>
        <!-- <div class="n-box">
          <div class="n-title">{{ $t('text233') }}</div>
          <div class="input-box">
            <van-field v-model="password" type="password" class="input" :placeholder="$t('text238')" />
          </div>
        </div> -->
        <div class="n-box">
          <div class="n-title">
            <div class="left">{{ $t('text234') }}</div>
            <div>{{ amount ? Number(amount || 0) - Number(handlingFee || 0) : '' }} {{ list[listIndex].label }}</div>
          </div>
        </div>
        <div class="n-box">
          <div class="n-tip">{{ $t('text21') }}：{{handlingFee}} {{ list[listIndex].label }}</div>
        </div>
        <div class="yellow-btn" @click="submit">{{ $t('text229') }}</div>
      </div>
    </div>
    <div class="bottom-part">
      <div class="b-title">{{ $t('text230') }}</div>
      <div class="list-box" v-if="recordList && recordList.length !== 0">
        <div class="list-item" v-for="item in recordList" :key="item.withdrawRecordId">
          <div class="item-flex">
            <div class="item">
              <div>{{ item.chinType ? `${item.chinType == 1 ? 'USDT-TRC20' : 'USDT-ERC20'}` : list[listIndex].label }}</div>
              <div class="break">{{ item.address ||'' }}</div>
            </div>
            <div class="item">
              <div>{{ $t('text225') }}</div>
              <div>{{ item.amount || 0 }}</div>
            </div>
            <div class="item">
              <div>{{ $t('text21') }}</div>
              <div>{{ item.handlingFee ||0 }}</div>
            </div>
            <div class="item">
              <div>{{ $t('text227') }}</div>
              <div>{{ item.createTime || '' }}</div>
            </div>
            <div class="item">
              <div>{{ $t('text266') }}</div>
              <div>{{ [$t('text267'), $t('text268'), $t('text269')][item.withdrawStatus || 0] }}</div>
            </div>
            <div class="item" v-if="item.withdrawStatus == 2">
              <div>{{ $t('text270') }}</div>
              <div class="break">{{ item.failReason || '' }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="empty-box" v-else>
        <img src="@/assets/images/lever/anonymous.png" alt="" class="empty-img" />
        <div class="empty-text">{{ $t('text30') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import { getHandlingFee, applyWithdraw, withdrawRecordList } from "@/api/withdrawal.js";
export default {
  data() {
    return {
      address: '',
      amount: '',
      password: '',
      typeList: [
        {
          label: 'ERC20',
          value: 2
        },
        {
          label: 'TRC20',
          value: 1
        },
      ],
      typeIndex: 2,
      listIndex: 0,
      handlingFee: 0,
      recordList: [],
      total: 0,
      pageSize: 20,
      pageNum: 1,
      loading: false
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    list() {
      return this.$store.state.coinList
    }
  },
  methods: {
    ...mapActions(['setUserInfo']),
    to(e) {
      window.open(e, "_blank");
    },
    goback() {
      this.$router.go(-1)
    },
    async getHandlingFee () {
      const res = await getHandlingFee()
      // console.log(res)
      if (res.code === 200) {
        this.handlingFee = parseFloat(res.data)
      }
    },
    async submit() {
      if (!this.address) return this.$toast(this.$t('text235'))
      if (!this.amount) return this.$toast(this.$t('text264'))
      if (this.amount < 10) return this.$toast(this.$t('text237'))
      if (this.amount > (this.userInfo && this.userInfo.usdt || 0)) return this.$toast(this.$t('text265'))
      const res = await applyWithdraw({
        address: this.address,
        amount: this.amount,
        chinType: this.typeIndex,
        refType: 2
      })
      if (res.code == 200) {
        this.pageNum = 1
        this.getList()
        this.$toast(this.$t('text240'))
      }
    },
    getList() {
      this.loading = true
      withdrawRecordList({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        this.total = res.total
        let arr = res.rows || []
        this.recordList = this.pageNum === 1 ? arr : [...this.recordList, ...arr]
        this.loading = false
      }).catch(err => {
        this.loading = false
      })
    },
    
    // 添加页面触底判断
		getbottom(){
			// 返回滚动条垂直滚动距离
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			// 返回该元素的像素高度，高度包含内边距（padding），不包含边框（border），外边距（margin）和滚动条
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			// 返回该元素的像素高度，高度包含内边距（padding），不包含外边距（margin）、边框（border）
			let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			let numHeight = scrollTop + clientHeight;
			// 触底了
			if (scrollHeight > clientHeight && numHeight > scrollHeight - 1) {
				// 还在加载上一次数据 直接返回
				if(this.loading) return
				return this.countPage()
			}
		},
		// 触底判断是否加载
		countPage(){
			// 判断是否已经加载全部
			if(this.recordList.length < this.total){
				this.pageNum++
				this.getList()
			}
		},
  },
  mounted () {
    this.getHandlingFee()
    this.getList()
    window.addEventListener("scroll", this.getbottom);
  },
  destroyed() {
		window.removeEventListener("scroll", this.getbottom);
	},
};
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar {
  background: var(--box-bg-color);
}

.content {
  background: var(--box-bg-color);
  min-height: 100vh;
  color: var(--color);

  .title {
    color: var(--color);
    font-weight: 700;
  }
  .middle-part {
    width: 100%;
    .part-box {
      width: 100%;
      padding: 22px;
      box-sizing: border-box;
      &:first-child {
        border-bottom: 1px solid #374151;
      }
      .m-title {
        font-size: 19px;
      }
      .m-tip {
        font-size: 13px;
        margin-top: 11px;
      }
      .chain-type {
        width: 100%;
        padding-top: 22px;
        .chain-title {
          font-size: 15px;
        }
        .type-box {
          width: 100%;
          display: flex;
          align-items: center;
          .t-item {
            width: fit-content;
            height: fit-content;
            padding: 5px 11px;
            box-sizing: border-box;
            color: #6b7280;
            border: 1px solid #6b7280;
            margin-right: 11px;
            margin-top: 11px;
          }
          .t-active {
            color: #ffce1c;
            border: 1px solid #ffce1c;
          }
        }
      }
      .n-box {
        width: 100%;
        margin-bottom: 22px;
        .n-title {
          width: 100%;
          font-size: 17px;
          display: flex;
          align-items: center;
          .left {
            flex: 1;
          }
        }
        .n-tip {
          width: 100%;
          font-size: 13px;
        }
        .input-box {
          width: 100%;
          height: 44px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #6b7280;
          .input {
            flex: 1;
            background: unset;
            padding-left: 0;
            color: var(--color);
            font-size: 14px;
            ::v-deep input {
              color: var(--color);
            }
            ::placeholder {
              color: #808080;
            }
            &::after {
              content: '';
              display: none;
            }
          }
          .placeholder {
            flex: 1;
            color: #808080;
            font-size: 14px;
          }
          .unit {
            color: #9ca3af;
            font-size: 15px;
            padding-right: 11px;
            border-right: 1px solid #374151;
            box-sizing: border-box;
          }
          .all {
            font-size: 15px;
            padding-left: 10px;
          }
        }
      }
      .yellow-btn {
        width: 100%;
        height: 50px;
        background: #ffce1c;
        border-radius: 5px;
        font-size: 15px;
        color: #000;
        line-height: 50px;
        text-align: center;
        margin-top: 11px;
      }
    }
  }
  .bottom-part {
    width: 100%;
    height: fit-content;
    min-height: 350px;
    padding: 22px;
    background: var(--bg-color);
    box-sizing: border-box;
    .b-title {
      width: 100%;
      font-size: 17px;
      color: var(--color);
      margin-bottom: 11px;
    }
    .table-th {
      width: 100%;
      padding: 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #1f2937;
      .th-label {
        flex: 1;
        color: var(--color);
        font-size: 13px;
        &:last-child {
          text-align: right;
        }
      }
    }

    .list-box {
      width: 100%;
      color: var(--color);
      .list-item {
        width: 100%;
        border-bottom: 1px solid #1f2937;
        height: fit-content;
        padding: 22px 10px 15px;
        box-sizing: border-box;
        .break {
          text-align: right;
          max-width: 50%;
          word-wrap: break-word;
          white-space: pre-line;
          word-break: break-all;
        }
        .item-flex {
            width: 100%;
            font-size: 13px;
            .item {
              width: 100%;
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
              &:first-child {
                margin-top: 0px;
              }
            }
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
}
</style>