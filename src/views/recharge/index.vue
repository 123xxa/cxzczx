<template>
  <div class="content">
    <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
      <template #title>
        <div class="title">{{ $t('text66') }}</div>
      </template>
      <template #left>
        <van-icon @click="goback" name="arrow-left" color="#000000" size="20" />
      </template>
    </van-nav-bar>
    <div class="bg">
      <div class="box top">
        <div class="top-title">{{ $t('text67') }}</div>
        <div class="top-item" v-for="(i,k) in rechargeList" :key="k" @click="$router.push({ path: '/depositCoins', query: {chainType: i.chainType} })">
          <div class="top-item-l">
            <img :src="i.icon" alt style="width: 20px;height: 20px;" />
            <div>{{ i.title }}</div>
          </div>
          <van-icon name="arrow" color="#8D99A9" />
        </div>
      </div>
      <div class="footer">
        <div class="footer-item" @click="to('https://banxa.com/')">
          <img src="@/assets/images/recharge/banxa-logo.svg" class="footer-item-img" alt />
          <div class="footer-item-text">{{ $t('text68') }}</div>
        </div>
        <div class="footer-item" @click="to('https://c2c.binance.com/en/?fiat=USD')">
          <div>
            <img src="@/assets/images/recharge/binance.png" style="width: 30px;height: 30px;" alt />
            <span style="color:#303133;font-size: 16px;">Binance</span>
          </div>
          <div class="footer-item-text">{{ $t('text68') }}</div>
        </div>
        <div class="footer-item" @click="to('https://www.coinbase.com/')">
          <img src="@/assets/images/recharge/ppp.svg" class="footer-item-img" alt />
          <div class="footer-item-text">{{ $t('text68') }}</div>
        </div>
        <div class="footer-item" @click="to('https://crypto.com/')">
          <img src="@/assets/images/recharge/crypto-blue.jpg" class="footer-item-img" alt />
          <div class="footer-item-text">{{ $t('text68') }}</div>
        </div>
        <div class="footer-item" @click="to('https://www.kraken.com/')">
          <img src="@/assets/images/recharge/kraken1.jpg" class="footer-item-img" alt />
          <div class="footer-item-text">{{ $t('text68') }}</div>
        </div>
        <div class="footer-item" @click="to('https://www.bitbank.com/')">
          <img src="@/assets/images/recharge/bitbank.png" class="footer-item-img" alt />
          <div class="footer-item-text">{{ $t('text68') }}</div>
        </div>
        <div class="footer-item" @click="to('https://www.kucoin.com/assets/payments?lang=en_US')">
          <img src="@/assets/images/recharge/ppppp.png" class="footer-item-img" alt />
          <div class="footer-item-text">{{ $t('text68') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rechargeList: [
        {
          icon: require("@/assets/images/recharge/1.png"),
          title: "USDT-TRC20",
          chainType: 1
        },
        // {
        //   icon: require("@/assets/images/recharge/2.png"),
        //   title: "USDT-TRC20"
        // },
        {
          icon: require("@/assets/images/recharge/3.png"),
          title: "USDT-ERC20",
          chainType: 2
        },
        // {
        //   icon: require("@/assets/images/recharge/4.png"),
        //   title: "ETH-ERC20"
        // },
        // {
        //   icon: require("@/assets/images/recharge/5.png"),
        //   title: "USDC-ERC20"
        // }
      ]
    };
  },
  methods: {
    to(e) {
      window.open(e, "_blank");
    },
    goback(){
        this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  color: #fff;
  .title {
    color: #000;
    font-weight: 700;
  }
  .bg {
    background: url("@/assets/images/recharge/cz-bg.jpg");
    width: 100%;
    min-height: 100vh;
    background-size: cover;
    padding: 20px;
    box-sizing: border-box;
  }
  .box {
    background: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .top {
    .top-title {
      padding: 15px 0;
      font-size: 14px;
      color: #303133;
    }
    .top-item {
      padding: 12px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-item-l {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
        color: #303133;
      }
    }
  }
  .footer {
    margin: 20px 0 0;
    padding-bottom: 10px;
    .footer-item {
      padding: 10px 15px;
      box-sizing: border-box;
      margin-bottom: 10px;
      background: #fff;
      border-radius: 10px;
      .footer-item-img {
        width: 100px;
        height: 20px;
      }
      .footer-item-text {
        color: #00ab86;
        font-size: 14px;
        padding-top: 10px;
      }
    }
  }
}
</style>