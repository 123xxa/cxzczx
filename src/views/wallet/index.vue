<template>
    <div class="content">
        <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
            <template #title>
                <div class="title">QCM</div>
            </template>
            <template #left>
                <van-icon @click="goback" name="arrow-left" color="var(--color)" size="20" />
            </template>
        </van-nav-bar>
        <div class="top-box">
            <div class="title-box">
                <div class="m-tip">
                    <span class="l-title">{{ $t('text247') }}</span>
                    {{ $t('text248') }}（USDT）
                </div>
                <div class="img-box" @click="isView = !isView">
                    <img src="@/assets/images/mine/f-a.png" alt="" class="f-img" v-if="isView">
                    <img src="@/assets/images/mine/f-b.png" alt="" class="f-img" v-else>
                </div>
            </div>
            <div class="money">{{ isView ? (Number(amount) + Number(reviewAmount)) : '****' }}</div>
        </div>
        <div class="bottom-box" @click="$router.push({ path: '/flow', query: {amount: amount, reviewAmount: reviewAmount} })">
            <div class="inside-box">
                <div class="in-top-box">
                    <div class="symbol">USDT</div>
                    <van-icon name="arrow" color="#9ca3af" size="16" />
                </div>
                <div class="in-bottom-box">
                    <div class="b-item">
                        <div class="b-label">{{ $t('text223') }}</div>
                        <div class="b-value">{{ isView ? amount : '****' }}</div>
                    </div>
                    <!-- <div class="b-item">
                        <div class="b-label">{{ $t('text250') }}（USDT）</div>
                        <div class="b-value">{{ isView ? '0.00' : '****' }}</div>
                    </div> -->
                    <div class="b-item">
                        <div class="b-label">{{ $t('text249') }}</div>
                        <div class="b-value">{{ isView ? reviewAmount : '****' }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { getUserWallet } from '@/api/user.js'
export default {
    data() {
        return {
            isView: true,
            amount: 0,
            reviewAmount: 0
        };
    },
    created() {
        this.getInfo()
    },
    methods: {
        to(e) {
            window.open(e, "_blank");
        },
        goback() {
            this.$router.go(-1)
        },
        async getInfo() {
            const res = await getUserWallet()
            if (res.code == 200) {
                this.amount = res.data.amount || 0
                this.reviewAmount = res.data.reviewAmount || 0
            }
        }
    }
};
</script>
  
<style lang="scss" scoped>
::v-deep .van-nav-bar {
    background: var(--box-bg-color);
}

.content {
    color: var(--color);

    .title {
        color: var(--color);
        font-weight: 700;
    }

    .top-box {
        width: 100%;
        padding: 16px 22px;
        box-sizing: border-box;
        background: var(--box-bg-color);
        .title-box {
            width: 100%;
            display: flex;
            // align-items: center;
            .l-title {
                font-size: 17px;
                color: var(--color);
                // font-weight: 700;
                margin-right: 11px;
                white-space: nowrap;
            }
            .m-tip {
                flex: 1;
                font-size: 13px;
                color: #9ca3af;
                line-height: 20px;
            }
            .img-box {
                width: 22px;
                height: 22px;
                .f-img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .money {
            width: 100%;
            margin-top: 11px;
            font-size: 19px;
            font-weight: 700;
        }
    }
    .bottom-box {
        width: 100%;
        padding: 22px 11px 55px;
        box-sizing: border-box;
        .inside-box {
            width: 100%;
            padding: 16px 11px;
            box-sizing: border-box;
            border-radius: 5px;
            background: var(--box-bg-color);
            .in-top-box {
                width: 100%;
                display: flex;
                align-items: center;
                .symbol {
                    flex: 1;
                    font-size: 17px;
                    font-weight: 700;
                }
            }
            .in-bottom-box {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .b-item {
                    width: 50%;
                    margin-top: 11px;
                    font-size: 13px;
                    .b-label {
                        color: #9ca3af;
                    }
                    .b-value {
                        margin-top: 5px;
                    }
                }
            }
        }
    }
}
</style>