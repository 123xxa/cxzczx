<template>
    <div class="content">
        <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
            <template #title>
                <div class="title">{{ $t('text271') }}</div>
            </template>
            <template #left>
                <van-icon @click="goback" name="arrow-left" color="var(--color)" size="20" />
            </template>
        </van-nav-bar>
        <div class="top-title">{{ $t('userTitle') }}</div>
        <div class="top-box" v-html="$t('userAgreement')">
        </div>
    </div>
</template>
  
<script>
export default {
    methods: {
        to(e) {
            window.open(e, "_blank");
        },
        goback() {
            this.$router.go(-1)
        },
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

    .top-title {
        text-align: center;
        font-size: 16px;
        margin-top: 30px;
    }

    .top-box {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        background: var(--box-bg-color);
        font-size: 12px;
        ::v-deep p {
            margin: 0;
        }
    }
}
</style>