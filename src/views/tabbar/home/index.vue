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
      <div class="nav-item" v-for="(i, k) in navList" :key="k">
        <img :src="i.icon" class="nav-icon" alt />
        <div>{{ i.name }}</div>
      </div>
    </div>
    <div class="box recharge-box">
      <div style="width: 100%;">
        <div class="recharge-box-top">{{$t('text9')}}</div>
        <div class="recharge-box-bottom">{{$t('text10')}}</div>
      </div>
    </div>
    <div class="box proportion-box">
      <div v-for="(i,k) in proportionList" :key="k" class="proportion-item">
        <div>{{i.title}}</div>
        <div class="proportion-content">{{i.content}}</div>
        <div class="proportion-percentage">{{i.percentage}}</div>
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
      <div v-for="(i,k) in 2" :key="k" class="table-item">
        <div class="table-name">
          <img src="@/assets/images/home/b1.png" class="name-icon" alt />
          <div class="table-name-text">
            <span class="table-name-text1">
              BTC
              <span class="table-name-text2">/USDT</span>
            </span>
          </div>
        </div>
        <div class="table-price">41835.14</div>
        <div class="table-rise">
          <div :class="['table-button-up',k==1?'table-button-down':'']">+0.12%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import setLang from "@/components/setLang";
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
      navList: [
        {
          name: this.$t("text2"),
          icon: require("@/assets/images/home/ppmp.png")
        },
        {
          name: this.$t("text3"),
          icon: require("@/assets/images/home/lmlm.png")
        },
        {
          name: this.$t("text4"),
          icon: require("@/assets/images/home/lockMining.png")
        }
      ],
      proportionList: [
        {
          title: "BTC/USDT",
          content: "41806.12",
          percentage: "-0.87%"
        },
        {
          title: "ETH/USDT",
          content: "41806.12",
          percentage: "-0.87%"
        },
        {
          title: "LTC/USDT",
          content: "41806.12",
          percentage: "-0.87%"
        }
      ]
    };
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
    width: 33.33%;
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