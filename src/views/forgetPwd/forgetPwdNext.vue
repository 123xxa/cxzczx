<template>
    <div class="content">
        <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
      <template #title>
        <div class="title">{{ $t('text85') }}</div>
      </template>
      <template #left>
        <van-icon
          @click="$router.go(-1)"
          name="arrow-left"
          :color="getSwitchChecked?'#FFFFFF':'#000000'"
          size="20"
        />
      </template>
    </van-nav-bar>
    <div class="box">
        <van-field class="input"  v-model="password" label :placeholder="$t('text73')" >
            <template #button>
                <img src="@/assets/images/reg/password.png" style="width: 15px;height:15px" alt="">
            </template>
        </van-field>
        <van-field class="input"  v-model="passwordAgain" label :placeholder="$t('text74')"  >
            <template #button>
                <img src="@/assets/images/reg/password.png" style="width: 15px;height:15px" alt="">
            </template>
        </van-field>
        <van-field class="input"  v-model="code" label :placeholder="$t('text75')" >
            <template #button>
              <div class="button" @click="getEmailCode">{{ isSend ? `${time}s` : $t('text81') }}</div>
            </template>
        </van-field>
        <div class="button2" @click="submit">{{ $t('text88') }}</div>
    </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getCode, resetAccount } from "@/api/login.js";
    export default {
        data() {
            return {
              account: '',
              code: '',
              password: '',
              passwordAgain: '',
              isSend: false,
              time: 60
            }
        },
        computed: {
    ...mapGetters(["getSwitchChecked"])
  },
  methods:{
    ...mapActions(["setToken", "setUserInfo"]),
    async getEmailCode() {
      this.account = this.$route.query.e
      if (this.isSend) return
      if (!this.account) return this.$toast(this.$t('text72'))
      const res = await getCode({
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
    async submit(){
        if (!this.password) return this.$toast(this.$t('text73'))
        if (!this.passwordAgain) return this.$toast(this.$t('text74'))
        if (!this.code) return this.$toast(this.$t('text75'))
        const res = await resetAccount({
            account: this.account,
            password: this.password,
            code: this.code,
        })
        if (res.code == 200) {
            this.$router.push('/login')
        }
    }
  }
    }
</script>

<style lang="scss" scoped>
.content {
  background: var(--box-bg-color);
  min-height: 100vh;
}
::v-deep .van-nav-bar {
  background: var(--box-bg-color);
}

.title {
    color: var(--color);
    font-size: 14px;
    font-weight: 700;
  }
  .box{
    padding: 20px;
    box-sizing: border-box;
    .button2{
        background: #FFCE1C;
        border-radius: 5px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color:#000;
        font-size: 14px;
        margin: 50px 0;
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