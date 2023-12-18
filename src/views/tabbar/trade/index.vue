<template>
 <div class="content">
    <div class="home-title">BTC/USDT</div>
    <van-row>
      <van-col span="13">
        <div class="left">
          <div class="left-top">
            <div :class="['left-top-text ', type === 0 ? 'left-top-text-active' : '']" @click="type = 0">{{ $t('text15') }}</div>
            <div :class="['left-top-text ', type === 1 ? 'left-top-text-active' : '']" @click="type = 1">{{ $t('text16') }}</div>
          </div>
          <div class="left-change">
            <img src="@/assets/images/trade/warning.png" @click="show = true" style="width: 20px; height: 20px" alt="" />
            <div class="left-change-title" @click="show = true" v-if="priceType == 0">{{ $t('text17') }}</div>
            <div class="left-change-title" @click="show = true" v-else>{{ $t('text18') }}</div>
            <img @click="show = true" src="@/assets/images/trade/down-arrow.png" style="width: 20px; height: 20px"
              alt="" />
          </div>
          <div class="left-tips" v-if="type === 1">
            <div>{{ $t('text33') }}</div>
          </div>
          <div class="left-price" v-if="type === 0">
            <div class="left-price-title">{{ $t('text19') }}</div>
            <van-field class="input"  v-model="value" label="" :placeholder="$t('text31')" />
          </div>
          <div class="left-number">
            <div class="left-number-title">
              {{ $t('text20') }}
              <span class="fee">{{ $t('text21') }}:0.1%</span>
            </div>
            <van-field class="input"  v-model="value" label="" :placeholder="$t('text22')" />
          </div>
          <div class="left-list">
            <div class="left-list-item">25%</div>
            <div class="left-list-item">50%</div>
            <div class="left-list-item">75%</div>
            <div class="left-list-item">100%</div>
          </div>
          <div class="left-bottom">
            <div class="left-bottom-item">
              <div class="left-bottom-item-title">{{ $t('text23') }}</div>
              <div class="left-bottom-item-text1">0 USDT</div>
            </div>
            <div class="left-bottom-item">
              <div class="left-bottom-item-title">{{ $t('text24') }}</div>
              <div class="left-bottom-item-text2">0 USDT</div>
            </div>
          </div>
          <div class="left-button">
            {{ $t('text25') }}
          </div>
        </div>
      </van-col>
      <van-col span="11">
        <div class="right">
          <div class="right-top">
            <div class="right-top-text">{{ $t('text19') }}</div>
            <div class="right-top-text">{{ $t('text20') }}</div>
          </div>
          <div class="right-list">
            <div class="right-list-item">
              <div class="right-list-item-content" v-for="(i, k) in 5" :key="k">
                <div>41993.2</div>
                <div class="right-list-item-content-r">2.725531</div>
                <div :style="{ width: k * 10 + '%' }" class="right-list-item-content-bg1"></div>
              </div>
            </div>
            <div class="right-list-title">1312321.32</div>
            <div class="right-list-item">
              <div class="right-list-item-content" style="color: #7286A5;" v-for="(i, k) in 5" :key="k">
                <div>41993.2</div>
                <div class="right-list-item-content-r">2.725531</div>
                <div :style="{ width: k * 10 + '%' }" class="right-list-item-content-bg2"></div>
              </div>
            </div>
          </div>
          <div class="right-button">
            {{ $t('text27') }}
          </div>
        </div>
      </van-col>
    </van-row>
    <div class="bottom">
      <div class="bottom-left">{{ $t('text28') }}</div>
      <div class="bottom-right">
        <img style="width: 20px; height: 20px" src="@/assets/images/trade/datamap.png" alt="" />
        <div class="bottom-right-button">{{ $t('text29') }}</div>
      </div>
    </div>
    <empty />
    <van-action-sheet v-model="show" :actions="actions" :cancel-text="$t('text31')" close-on-click-action
      @select="onSelect" @cancel="onCancel" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      type: 0,
      priceType: 0,
      value:'',
      actions: [
        { name: this.$t("text17"), value: 0 },
        { name: this.$t("text18"), value: 1 }
      ]
    };
  },
  methods:{
    onCancel(){
        this.show = false
    },
    onSelect(e){
        if (this.priceType != e.value) this.priceType = e.value
    }
  }
};
</script>
<style lang="scss" scoped>
.home-title {
  font-size: 16px;
  color: #fff;
  text-align: center;
  font-weight: 700;
  height: 44px;
  line-height: 44px;
  background: var(--box-bg-color);
}

.input {
  padding: 10px 0;
  background: var(--box-bg-color);
}

::v-deep .van-field__control::placeholder {
  color: grey;
  font-size: 12px;
}

::v-deep .van-field__control {
  color: var(--color);
}

.content {
  background: var(--box-bg-color);
  min-height: calc(100vh - 50px);

  .left {
    padding: 0 17px 0 19px;
    box-sizing: border-box;

    .left-top {
      display: flex;
      padding: 0 0 15px;

      .left-top-text {
        font-size: 16px;
        color: var(--color);
        width: 50%;
        text-align: center;
      }

      .left-top-text-active {
        position: relative;
      }

      .left-top-text-active::after {
        content: '';
        width: 45px;
        height: 3px;
        background: #efc11c;
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
        transition: all 0.3s;
      }
    }

    .left-change {
      font-size: 14px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 5px;
      margin-bottom: 5px;

      .left-change-title {
        width: calc(100% - 40px);
        text-align: center;
        color: var(--color);
      }
    }

    .left-tips {
      background: #0B1622;
      padding: 0 10px;
      height: 40px;
      box-sizing: border-box;
      overflow: hidden;
      line-height: 40px;
      color: grey;
      font-size: 12px;
      border: 1px solid #CED6DB;

    }

    .left-price {
      padding: 9px 9px 0;
      box-sizing: border-box;
      border: 1px solid #CED6DB;
      border-radius: 2px;

      .left-price-title {
        color: #838b99;
        font-size: 14px;
      }
    }

    .left-number {
      padding: 9px 9px 0;
      box-sizing: border-box;
      border: 1px solid #CED6DB;
      border-radius: 2px;
      margin-top: 15px;

      .left-number-title {
        color: #838b99;
        font-size: 14px;
      }

      .fee {
        color: #e95463;
        padding-left: 20px;
      }
    }

    .left-list {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left-list-item {
        border-radius: 2px;
        border: 1px solid #CED6DB;
        color: #838b99;
        width: 20%;
        text-align: center;
        padding: 2px 0;
      }
    }

    .left-bottom {
      padding: 5px 0;

      .left-bottom-item {
        width: 100%;
        display: flex;
        // align-items: center;
        justify-content: space-between;
        color: #838b99;
        font-size: 12px;
        margin-bottom: 10px;

        .left-bottom-item-title {
          width: 40%;
        }

        .left-bottom-item-text1 {
          font-weight: 800;
        }

        .left-bottom-item-text2 {
          color: #fff;
          font-weight: 800;
        }
      }
    }

    .left-button {
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background: #12b886;
      border-radius: 2px;
      font-size: 14px;
    }
  }

  .right {
    .right-top {
      box-sizing: border-box;
      padding: 5px 20px 20px 0;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }

    .right-list {
      min-height: 300px;
      display: flex;
      flex-wrap: wrap;

      .right-list-item {
        width: 100%;
        min-height: 135px;

        .right-list-item-content {
          height: 29px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          color: var(--color);
          font-size: 12px;
          line-height: 29px;

          .right-list-item-content-r {
            padding-right: 20px;
          }

          .right-list-item-content-bg1 {
            position: absolute;
            background: linear-gradient(rgba(250, 82, 82, 0.1), rgba(250, 82, 82, 0.1));
            right: 0;
            top: 0;
            bottom: 0;
            transition: all 0.5s;
          }

          .right-list-item-content-bg2 {
            position: absolute;
            background: linear-gradient(rgba(18, 184, 134, 0.1), rgba(18, 184, 134, 0.1));
            right: 0;
            top: 0;
            bottom: 0;
            transition: all 0.5s;
          }
        }
      }

      .right-list-title {
        width: 100%;
        font-size: 16px;
        color: #12b886;
        text-align: center;
        height: 30px;
        line-height: 30px;
      }
    }

    .right-button {
      color: #fff;
      padding: 5px;
      margin: 5px 5px 0 0;
      background: #9ca3af;
      border-radius: 4px;
      text-align: center;
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px 5px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(209, 213, 219, 1);

    .bottom-left {
      font-size: 16px;
      color: #f2f5ff;
    }

    .bottom-right {
      display: flex;
      align-items: center;

      .bottom-right-button {
        background: #9ca3af;
        text-align: center;
        padding: 5px 20px;
        box-sizing: border-box;
        font-size: 14px;
        margin-left: 10px;
        border-radius: 4px;
        color: #FFF;
      }
    }
  }
}</style>