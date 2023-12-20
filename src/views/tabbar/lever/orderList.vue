<template>
    <div class="order-box">
        <div class="order-item" v-for="item in list" :key="item.id">
            <div class="order-flex" style="margin-top: 0px;">
                <div>{{ item.symbol || '--' }}/USDT</div>
                <div class="result" :style="{color: `${item.isWin == 1 ? '#51BC86' : item.isWin == -1 ? '#F6465D' : 'var(--color)'}`}">{{ item.isWin == 1 ? $t('text244') : item.isWin == -1 ?  $t('text245') :  $t('text246') }}</div>
            </div>
            <div class="order-flex">
                <div>{{ $t('text242') }}</div>
                <div>{{ item.payDropRise == 1 ? $t('text44') : $t('text43') }}</div>
            </div>
            <div class="order-flex">
                <div>{{ $t('text41') }}</div>
                <div>{{ item.amount }}</div>
            </div>
            <div class="order-flex">
                <div>{{ $t('text38') }}</div>
                <div>{{ item.profitRatesTime }}</div>
            </div>
            <div class="order-flex">
                <div>{{ $t('text39') }}</div>
                <div>{{Number(Number((item.profitRates || 0) * 100).toFixed(2))}}%</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props: {
            list: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style lang="scss" scoped>
.order-box {
    width: 100%;
    min-height: 330px;
    background: var(--box-bg-color);
    color: var(--color);
    font-size: 12px;
    padding: 0 15px;
    box-sizing: border-box;
    .order-item {
        width: 100%;
        height: fit-content;
        padding: 22px 10px 15px;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(75,85,99,1);
        .order-flex {
            width: 100%;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .result {
                font-size: 16px;
                font-weight: 700;
            }
        }
    }
}
</style>