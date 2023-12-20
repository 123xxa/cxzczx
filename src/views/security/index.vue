<template>
    <div class="content">
        <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
            <template #title>
                <div class="title">{{ $t('text61') }}</div>
            </template>
            <template #left>
                <van-icon @click="goback" name="arrow-left" color="var(--color)" size="20" />
            </template>
        </van-nav-bar>
        <div class="top-box" @click="$router.push('/resetLogin')">
            <div style="flex: 1; margin-right: 12px;">{{ $t('text258') }}</div>
            <div style="margin-right: 12px;">{{ $t('text259') }}</div>
            <van-icon name="arrow" color="var(--color)" size="18"/>
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
    width: 100%;
    min-height: 100vh;
    background: var(--box-bg-color);
    color: var(--color);

    .title {
        color: var(--color);
        font-weight: 700;
    }

    .top-box {
        width: 100%;
        padding: 24px 12px;
        box-sizing: border-box;
        border-bottom: 1px solid #374151;
        display: flex;
        align-items: center;
        font-size: 16px;
    }
}
</style>