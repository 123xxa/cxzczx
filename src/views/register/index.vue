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
        <van-field class="input"  v-model="account" label :placeholder="$t('text72')" />
        <van-field class="input" type="password" v-model="password" label :placeholder="$t('text73')" >
            <template #button>
                <img src="@/assets/images/reg/password.png" style="width: 15px;height:15px" alt="">
            </template>
        </van-field>
        <van-field class="input" type="password" v-model="passwordAgain" label :placeholder="$t('text74')"  >
            <template #button>
                <img src="@/assets/images/reg/password.png" style="width: 15px;height:15px" alt="">
            </template>
        </van-field>
        <van-field class="input"  v-model="code" label :placeholder="$t('text75')" >
            <template #button>
                <div class="button" @click="getEmailCode">{{ isSend ? `${time}s` : $t('text81') }}</div>
            </template>
        </van-field>
        <!-- <van-field class="input"  v-model="value1" label :placeholder="$t('text76')" />
        <van-field class="input"  v-model="value1" label :placeholder="$t('text77')" /> -->
        <div style="margin-top: 20px;">
            <van-checkbox v-model="checked" shape="square">
                <span style="color: var(--color);">{{ $t('text79') }}</span>
                <span style="color:#1881D2">《{{ $t('text80') }}》</span>
            </van-checkbox>
        </div>
        <div class="button2" style="margin-top: 45px;color" @click="submit">{{ $t('text69') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getCode, register } from "@/api/login.js";
export default {
    data() {
        return {
            checked: false,
            account: '',
            password: '',
            passwordAgain: '',
            code: '',
            isSend: false,
            time: 60
        }
    },
  computed: {
    ...mapGetters(["getSwitchChecked"])
  },
  methods: {
    ...mapActions(["setToken", "setUserInfo"]),
    goback() {
      this.$router.go(-1);
    },
    async getEmailCode() {
      if (this.isSend) return
      if (!this.account) return this.$toast(this.$t('text72'))
      const res = getCode({
        email: this.account,
        type: 1
      })
      if (res.code === 200) {
        this.isSend = true
        let timer = setInterval(() => {
          this.time--;
          if (this.time === 0) {
            clearInterval(timer);
            this.isSend = false
            this.time = 60
          }
        }, 1000)
      }
    },
    async submit() {
      if (!this.checked) return this.$toast(this.$t('text90'))
      if (!this.account) return this.$toast(this.$t('text72'))
      if (!this.password) return this.$toast(this.$t('text73'))
      if (!this.passwordAgain) return this.$toast(this.$t('text74'))
      if (!this.code) return this.$toast(this.$t('text75'))
      if (this.password !== this.passwordAgain) return this.$toast(this.$t('text89'))
      const res = await register({
        account: this.account,
        password: this.password,
        code: this.code,
      })
      if (res.code == 200) {
        this.setToken(res.data.token || '')
        this.setUserInfo(res.data.walletVo || {})
        this.$router.push('/home')
      }
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