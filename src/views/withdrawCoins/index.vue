<template>
  <div class="content">
    <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
      <template #title>
        <div class="title">{{ $t('text211') }}</div>
      </template>
      <template #left>
        <van-icon @click="goback" name="arrow-left" color="#fff" size="20" />
      </template>
    </van-nav-bar>
    <div class="main-box">
      <div class="list-item" v-for="item in list" :key="item.label">
        <div class="left-img">
          <img :src="item.logo" alt="" class="img">
        </div>
        <div class="label">{{ `${item.label} ${$t('text228')}` }}</div>
        <van-icon name="arrow" color="#606060" size="14" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      ]
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
  color: #fff;

  .title {
    color: #fff;
    font-weight: 700;
  }

  .main-box {
    width: 100%;

    .list-item {
      width: 100%;
      padding: 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background: var(--bg-color);
      border-bottom: 2px solid var(--box-bg-color);
      .left-img {
        width: 33px;
        height: 33px;
        .img {
          width: 100%;
          height: 100%;
        }
      }
      .label {
        flex: 1;
        margin-left: 10px;
        font-size: 15px;
      }
    }

  }
}</style>