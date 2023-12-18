<template>
  <div class="content">
    <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
      <template #title>
        <div class="title">{{ $t('text69') }}</div>
      </template>
      <template #left>
        <van-icon
          @click="goback"
          name="arrow-left"
          :color="getSwitchChecked?'#FFFFFF':'#000000'"
          size="20"
        />
      </template>
    </van-nav-bar>
    <div class="top">
      <div class="top-title">{{ $t('text70') }}</div>
      <div class="top-text">
        <img src="@/assets/images/reg/1.png" style="width: 15px;height:15px" alt />
        {{ $t('text71') }}
      </div>
      <div class="box">
        <van-field class="input"  v-model="value1" label :placeholder="$t('text72')" />
        <van-field class="input"  v-model="value1" label :placeholder="$t('text73')" >
            <template #button>
                <img src="@/assets/images/reg/password.png" style="width: 15px;height:15px" alt="">
            </template>
        </van-field>
        <van-field class="input"  v-model="value1" label :placeholder="$t('text74')"  >
            <template #button>
                <img src="@/assets/images/reg/password.png" style="width: 15px;height:15px" alt="">
            </template>
        </van-field>
        <van-field class="input"  v-model="value1" label :placeholder="$t('text75')" >
            <template #button>
                <div class="button">{{ $t('text81') }}</div>
            </template>
        </van-field>
        <van-field class="input"  v-model="value1" label :placeholder="$t('text76')" />
        <van-field class="input"  v-model="value1" label :placeholder="$t('text77')" />
        <div style="margin-top: 20px;">
            <van-checkbox v-model="checked" shape="square">
                <span style="color: var(--color);">{{ $t('text79') }}</span>
                <span style="color:#1881D2">《{{ $t('text80') }}》</span>
            </van-checkbox>
        </div>
        <div class="button2" style="margin-top: 45px;color">{{ $t('text69') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            checked: false
        }
    },
  computed: {
    ...mapGetters(["getSwitchChecked"])
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
::v-deep .van-nav-bar {
  background: var(--box-bg-color);
}
.content {
  background: var(--box-bg-color);
  min-height: 100vh;
  .title {
    color: var(--color);
  }

  .top {
    margin-top: 30px;
    padding: 0 30px 60px;
    box-sizing: border-box;
    .top-title {
      color: var(--color);
      font-size: 24px;
    }
    .top-text {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #cc704b;
    }
    .box {
      margin-top: 40px;
      .input-content {
        padding: 0;
        box-sizing: border-box;
        margin-top: 10px;
      }
      .input {
        border-bottom: 1px solid rgba(75, 85, 99, 1);
        background: #00000000;
      }
      .button{
        background: #FFCE1C;
        border-radius: 10px;
        height: 30px;
        line-height: 30px;
        width: 80px;
        text-align: center;
        color:#000;

      }
      .button2{
        background: #FFCE1C;
        border-radius: 5px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color:#000;
        font-size: 14px;
      }
    }
  }
}
::v-deep .van-field__control {
        color: var(--color);
      }
      ::v-deep .van-field{
        padding: 10px 0;
      }
      ::v-deep .van-field__control::placeholder {
  color: grey;
  font-size: 12px;
}
::v-deep .van-cell::after{
    border-width: 0;
}
</style>