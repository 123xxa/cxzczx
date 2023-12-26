<template>
  <div class="content">
    <div class="box" style="position: sticky;top:0;padding-bottom:10px;margin-bottom:10px;z-index:1;">
      <div class="top-box ">
        <div class="top-box-l">
          <div>{{ token ? (userInfo && userInfo.nickname ? userInfo.nickname : '--') : $t('text47') }}</div>
          <div style="white-space: nowrap;">{{ token ? (userInfo && userInfo.id ? `UID：${userInfo.userUuid}` : '--') : $t('text48') }}</div>
        </div>
        <!-- <div class="top-box-m">
          <div>--</div>
          <div>{{ $t('text49') }}:</div>
        </div> -->
        <div class="top-box-r" v-if="token" @click="submit()">{{ $t('text50') }}</div>
        <div class="top-box-r" v-else @click="$router.push('/login')">{{ $t('text83') }}</div>
        
      </div>
      
      <div class="top-info">
        <div class="top-info-box1">
            <div>{{$t('text51') }}</div>
            <img v-show="viewFlag" @click="viewFlag =!viewFlag" src="@/assets/images/mine/a.png" style="width: 20px;height: 20px;" alt="">
            <img v-show="!viewFlag" @click="viewFlag =!viewFlag" src="@/assets/images/mine/b.png" style="width: 20px;height: 20px;" alt="">
        </div>
        <div class="top-info-box2">{{$t('text52') }} (USDT)</div>
        <div class="top-info-box3">{{ viewFlag? (token && userInfo && userInfo.usdt || 0) :'******'}}</div>
        <div class="top-info-box4" @click="toOther('/wallet')">
            <div class="top-info-box4-l">{{ viewFlag? $t('text53') +`: ${token && userInfo && userInfo.usdt || 0}` :'******'}}</div>
            <van-icon name="arrow" color="#A5A8AC" size="19"/>
        </div>
      </div>
    </div>
    <div class="box">
        <div class="item" @click="toOther('/recharge')">
            <div class="item-left">{{ $t('text56') }}</div>
            <van-icon name="arrow" color="#A5A8AC" size="19"/>
        </div>
        <div class="item" @click="toOther('/withdrawCoins')">
            <div class="item-left">{{ $t('text57') }}</div>
            <van-icon name="arrow" color="#A5A8AC" size="19"/>
        </div>
        <!-- <div class="item" @click="$router.push('/transfer')">
            <div class="item-left">{{ $t('text58') }}</div>
            <van-icon name="arrow" color="#A5A8AC" size="19"/>
        </div>
        <div class="item">
            <div class="item-left">{{ $t('text59') }}</div>
            <van-icon name="arrow" color="#A5A8AC" size="19"/>
        </div> -->
    </div>
    <div class="title">{{ $t('text54') }}</div>
    <div class="box">
        <!-- <div class="item">
            <div class="item-left">{{ $t('text60') }}</div>
            <van-icon name="arrow" color="#A5A8AC" size="19"/>
        </div> -->
        <div class="item" @click="toOther('/security')">
            <div class="item-left">{{ $t('text61') }}</div>
            <van-icon name="arrow" color="#A5A8AC" size="19"/>
        </div>

        <div class="item" @click="toOther('/identityVerification')">
            <div class="item-left">{{ $t('text102') }}</div>
            <van-icon name="arrow" color="#A5A8AC" size="19"/>
        </div>
        <!-- <div class="item">
            <div class="item-left">{{ $t('text62') }}</div>
            <van-icon name="arrow" color="#A5A8AC" size="19"/>
        </div> -->
    </div>
    <div class="title">{{ $t('text55') }}</div>
    <div class="box">
        <div class="item" @click="toWhite()">
            <div class="item-left">{{ $t('text63') }}</div>
            <van-icon name="arrow" color="#A5A8AC" size="19"/>
        </div>
        <!-- <div class="item">
            <div class="item-left">{{ $t('text64') }}</div>
            <van-icon name="arrow" color="#A5A8AC" size="19"/>
        </div> -->
        <!-- <div class="item">
            <div class="item-left">{{ $t('text65') }}</div>
            <van-switch v-model="switchChecked" size="20"  @change="changeMode" />
        </div> -->
    </div>
    <div style="height: 40px;"></div>
  </div>
</template>

<script>
import {mapGetters,mapActions,mapMutations} from "vuex"
import { logout } from "@/api/login.js";
import { Dialog  } from 'vant';
export default {
    computed:{
        ...mapGetters(['getSwitchChecked', 'userInfo', 'token'])
    },
    data() {
        return {
            switchChecked:  true,
            viewFlag: true
        }
    },
    created(){
        this.switchChecked = this.getSwitchChecked
    },
    mounted() {
        if (this.token) {
            this.setUserInfo()
        }
    },
    methods: {
        ...mapActions(['setSwitchChecked', 'setUserInfo']),
        ...mapMutations(['removeUserInfo']),
        toWhite() {
            window.open(`${window.location.origin + '/QCM.pdf'}`, "_blank");
        },
        toOther(path) {
            if (this.token) {
                this.$router.push(path)
            } else {
                this.$router.push('/login')
            }
        },
        changeMode(e) {
            this.setSwitchChecked(e)
        },
        submit() {
            Dialog.confirm({
                title: this.$t('text92'),
                message: this.$t('text93'),
                confirmButtonText: this.$t('text94'),
                cancelButtonText: this.$t('text95')
            }).then(() => {
                this.loginOut()
            }).catch(() => {})
        },
        loginOut() {
            logout().then(() => {
                this.removeUserInfo()
                this.$toast(this.$t('text91'))
            })
        },
    },
};
</script>

<style scoped lang="scss">
.content{
    background: var(--bg-color);
}
.box {
  background: var(--box-bg-color);
}
.top-box {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  .top-box-l {
    font-size: 14px;
    width: 170px;
  }
  .top-box-m {
    font-size: 14px;
    color: #ffce1c;
  }
  .top-box-r {
    padding: 5px 10px;
    box-sizing: border-box;
    background: #ffce1c;
    color: #333;
    border-radius: 5px;
  }
}
.top-info{
    margin: 0 10px 0;
    background: rgba(75,85,99,1);
    border-radius: 9px;
    padding: 20px;
    box-sizing: border-box;
    color: #FFF;
    .top-info-box1{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
    }
    .top-info-box2{
        margin: 10px 0 ;
    }
    .top-info-box3{
        font-size: 18px;
        margin: 10px 0 ;
    }
    .top-info-box4{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .top-info-box4-l{
            padding: 5px 10px;
            box-sizing: border-box;
            background: #03AD93;
            border-radius: 20px;
        }
    }
}

.title{
    padding: 15px;
    box-sizing: border-box;
    color: #F2F5FF;
}
.item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    box-sizing: border-box;
    .item-left{
        padding-left:10px;
        border-left:4px solid #FFCE1C;
    }
}
</style>