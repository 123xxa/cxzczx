<template>
  <div class="content">
    <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
      <template #title>
        <div class="title">{{ $t('text211') }}</div>
      </template>
      <template #left>
        <van-icon @click="goback" name="arrow-left" color="var(--color)" size="20" />
      </template>
    </van-nav-bar>
    <div class="main-box">
      <div class="list-item" v-for="item in list" :key="item.label" @click="$router.push('/withdrawal?label='+item.label)">
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
          logo: require('@/assets/images/withdrawCoins/4.png'),
          label: 'ETH'
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
  color: var(--color);

  .title {
    color: var(--color);
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
      border-bottom: 1px solid var(--box-bg-color);
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