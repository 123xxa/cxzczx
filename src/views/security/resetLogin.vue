<template>
    <div class="content">
        <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
            <template #title>
                <div class="title">{{ $t('text257') }}</div>
            </template>
            <template #left>
                <van-icon @click="goback" name="arrow-left" color="var(--color)" size="20" />
            </template>
        </van-nav-bar>
        <div class="box">
            <van-field class="input" type="password" v-model="password" :placeholder="$t('text260')">
                <template #button>
                    <img src="@/assets/images/reg/password.png" class="input-right" alt />
                </template>
            </van-field>
            <van-field class="input" type="password" v-model="newPassword" :placeholder="$t('text261')">
                <template #button>
                    <img src="@/assets/images/reg/password.png" class="input-right" alt />
                </template>
            </van-field>
            <van-field class="input" type="password" v-model="confirmPassword" :placeholder="$t('text262')">
                <template #button>
                    <img src="@/assets/images/reg/password.png" class="input-right" alt />
                </template>
            </van-field>
            <div class="yellow-btn" @click="submit">{{ $t('text257') }}</div>
        </div>
    </div>
</template>
  
<script>
import { mapMutations } from "vuex"
import { updatePassword, logout } from '@/api/login.js'
export default {
    data() {
        return {
            // 旧密码
            password: '',
            // 新密码
            newPassword: '',
            // 确认密码
            confirmPassword: ''
        };
    },
    methods: {
        ...mapMutations(['removeUserInfo']),
        to(e) {
            window.open(e, "_blank");
        },
        goback() {
            this.$router.go(-1)
        },
        async submit() {
            if (!this.password) return this.$toast(this.$t('text260'))
            if (!this.newPassword) return this.$toast(this.$t('text261'))
            if (!this.confirmPassword) return this.$toast(this.$t('text262'))
            if (this.newPassword !== this.confirmPassword) return this.$toast(this.$t('text89'))
            const res = await updatePassword({
                password: this.password,
                newPassword: this.newPassword
            })
            if (res.code == 200) {
                this.$toast(this.$t('text263'))
                setTimeout(() => {
                    logout().then(() => {
                        this.removeUserInfo()
                        this.$router.replace({ path: '/login' })
                    })
                }, 1000)
            }
        }
    }
};
</script>
  
<style lang="scss" scoped>
::v-deep .van-nav-bar {
    background: var(--box-bg-color);
}
::v-deep .van-field__control {
    color: var(--color);
}
::v-deep .van-field {
    font-size: 14px;
    padding: 10px 0;
}
::v-deep .van-field__control::placeholder {
    color: grey;
    font-size: 14px;
}
::v-deep .van-cell::after {
    border-width: 0;
}
.content {
    width: 100%;
    min-height: 100vh;
    background: var(--box-bg-color);
    color: var(--color);

    .title {
        color: var(--color);
        font-weight: 700;
    }
    .box {
        width: 100%;
        padding: 60px 24px 24px;
        box-sizing: border-box;
        .input {
            width: 100%;
            height: 60px;
            border-bottom: 1px solid rgba(75, 85, 99, 1);
            background: unset;
            display: flex;
            align-items: center;
            .input-right {
                width: 18px;
                height: 18px;
            }
        }
        .yellow-btn {
            width: 100%;
            height: 44px;
            margin-top: 96px;
            background: #ffce1c;
            border-radius: 6px;
            font-size: 16px;
            color: #000;
            line-height: 44px;
            text-align: center;
        }
    }
}
</style>