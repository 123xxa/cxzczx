<template>
  <div class="content">
    <div class="top">
      <img src="@/assets/images/login/wewe.png" style="width:50px;height:50px" alt />
      <setLang />
    </div>
    <div class="box">
      <div style="padding:20px 0 ">
        <van-field class="input" v-model="account" label :placeholder="$t('text72')" />
        <van-field class="input" type="password" v-model="password" label :placeholder="$t('text73')">
          <template #button>
            <img src="@/assets/images/reg/password.png" style="width: 15px;height:15px" alt />
          </template>
        </van-field>
        <div class="m">
            <van-checkbox v-model="checked" shape="square">
                <span style="color: var(--color);">{{ $t('text78') }}</span>
                
            </van-checkbox>
            <span style="color:#1881D2" @click="$router.push('/forgetPwd')">{{ $t('text82') }}</span>
        </div>
        <div class="button2" @click="submit">{{ $t('text83') }}</div>
      </div>
      <div style="text-align: center;">
        <span>{{ $t('text84') }}</span>
        <span  style="color:#1881D2" @click="$router.push('/register')">{{ $t('text69') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import setLang from "@/components/setLang";
import { login } from "@/api/login.js";
import { mapActions } from "vuex";
import { closeSocketConnection} from "@/utils/webSocket.js"
export default {
  components: { setLang },
  data() {
    return {
        checked: false,
        account: '',
        password: ''
    }
  },
  methods: {
    ...mapActions(["setToken", "setUserInfo"]),
    async submit() {
      // if (!this.checked) return this.$toast(this.$t('text90')
      if (!this.account) return this.$toast(this.$t('text72'))
      if (!this.password) return this.$toast(this.$t('text73'))
      const res = await login({
        account: this.account,
        password: this.password
      })
      if (res.code == 200) {
        this.setToken(res.data.token || '')
        this.setUserInfo(res.data.walletVo || {})
        closeSocketConnection()
        this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0
      });
        setTimeout(()=>{
          this.$toast.clear();
          this.$router.push('/home')
        },1000)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  background: var(--box-bg-color);
  min-height: 100vh;
  .top {
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  .box {
    padding: 20px;
    box-sizing: border-box;
    .input-content {
      padding: 0;
      box-sizing: border-box;
      margin-top: 10px;
    }
    .input {
      border-bottom: 1px solid rgba(75, 85, 99, 1);
      background: #00000000;
    }
    .m{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
    }
}
}
.button2{
        background: #FFCE1C;
        border-radius: 5px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color:#000;
        font-size: 14px;
        margin: 30px 0;
      }
::v-deep .van-field__control {
  color: var(--color);
}
::v-deep .van-field {
  padding: 10px 0;
}
::v-deep .van-field__control::placeholder {
  color: grey;
  font-size: 12px;
}
::v-deep .van-cell::after {
  border-width: 0;
}
</style>