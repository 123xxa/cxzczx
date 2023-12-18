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
        <div class="m-title">{{ `${list[listIndex].label} ${$t('text228')}` }}</div>
        <div class="m-tip">{{ $t('text223') }} 0 {{ list[listIndex].label }}</div>
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
            <div class="input" v-if="address"></div>
            <div class="placeholder" v-else>{{ $t('text235') }}</div>
            <div class="all">{{ $t('text236') }}</div>
          </div>
        </div>
        <div class="n-box">
          <div class="n-title">{{ $t('text225') }}</div>
          <div class="input-box">
            <van-field v-model="number" type="number" class="input" :placeholder="$t('text237')" />
            <div class="unit">{{ list[listIndex].label }}</div>
            <div class="all">{{ $t('text222') }}</div>
          </div>
        </div>
        <div class="n-box">
          <div class="n-title">{{ $t('text233') }}</div>
          <div class="input-box">
            <van-field v-model="password" type="password" class="input" :placeholder="$t('text238')" />
          </div>
        </div>
        <div class="n-box">
          <div class="n-title">
            <div class="left">{{ $t('text234') }}</div>
            <div>{{ list[listIndex].label }}</div>
          </div>
        </div>
        <div class="n-box">
          <div class="n-tip">Handling fee：0.0050 {{ list[listIndex].label }}</div>
        </div>
        <div class="yellow-btn">{{ $t('text229') }}</div>
      </div>
    </div>
    <div class="bottom-part">
      <div class="b-title">{{ $t('text230') }}</div>
      <div class="list-box" v-if="recordList && recordList.length !== 0">
    <!-- 提现记录
时间，数额，提币地址，状态（审核中，通过/不通过） -->
      </div>
      <div class="empty-box" v-else>
        <img src="@/assets/images/lever/anonymous.png" alt="" class="empty-img" />
        <div class="empty-text">{{ $t('text30') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: '',
      number: '',
      password: '',
      typeList: [
        {
          label: 'ERC20',
          value: 0
        },
        {
          label: 'TRC20',
          value: 1
        },
      ],
      typeIndex: 0,
      listIndex: 0,
      list: [
        {
          logo: require('@/assets/images/withdrawCoins/1.png'),
          label: 'USDT'
        },
        {
          logo: require('@/assets/images/withdrawCoins/2.png'),
          label: 'BTC'
        },
        {
          logo: require('@/assets/images/withdrawCoins/3.png'),
          label: 'ETH'
        },
        {
          logo: require('@/assets/images/withdrawCoins/4.png'),
          label: 'LTC'
        },
        {
          logo: require('@/assets/images/withdrawCoins/5.png'),
          label: 'BCH'
        },
        {
          logo: require('@/assets/images/withdrawCoins/6.png'),
          label: 'USDC'
        },
        {
          logo: require('@/assets/images/withdrawCoins/7.jpg'),
          label: 'XCC'
        },
        {
          logo: require('@/assets/images/withdrawCoins/8.jpg'),
          label: 'MDA'
        },
        {
          logo: require('@/assets/images/withdrawCoins/9.jpg'),
          label: 'DOTS'
        },
        {
          logo: require('@/assets/images/withdrawCoins/10.jpg'),
          label: 'FDE'
        },
        {
          logo: require('@/assets/images/withdrawCoins/11.jpg'),
          label: 'ESMY'
        },
        {
          logo: require('@/assets/images/withdrawCoins/12.jpg'),
          label: 'VTSD'
        },
        {
          logo: require('@/assets/images/withdrawCoins/13.jpg'),
          label: 'TWB'
        },
        {
          logo: require('@/assets/images/withdrawCoins/14.jpg'),
          label: 'WHD'
        },
        {
          logo: require('@/assets/images/withdrawCoins/15.jpg'),
          label: 'QCM'
        },
        {
          logo: require('@/assets/images/withdrawCoins/16.jpg'),
          label: 'ALIDD'
        },
        {
          logo: require('@/assets/images/withdrawCoins/17.jpg'),
          label: 'MTC'
        },
        {
          logo: require('@/assets/images/withdrawCoins/18.jpg'),
          label: 'AITO'
        }
      ],
      recordList: []
    };
  },
  methods: {
    to(e) {
      window.open(e, "_blank");
    },
    goback() {
      this.$router.go(-1)
    },
  }
};
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar {
  background: var(--bg-color);
}

.content {
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