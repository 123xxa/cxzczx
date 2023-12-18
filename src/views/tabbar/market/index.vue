<template>
    <div class="content">
    <van-sticky >
      <div class="sticky">
        <div class="tab-box">
        <div class="tab-item">USDT</div>
      </div>
      <div class="table-th">
        <div style="flex: 1.5 1 0%">
          {{ $t('text11') }}
          <img src="@/assets/images/updown0.png" class="updown" alt="" />
        </div>
        <div style="flex: 1">
          {{ $t('text12') }}
          <img src="@/assets/images/updown0.png" class="updown" alt="" />
        </div>
        <div style="flex: 1; text-align: right">
          {{ $t('text13') }}
          <img src="@/assets/images/updown0.png" class="updown" alt="" />
        </div>
      </div>
      </div>
    </van-sticky>
    <div class="table-item" v-for="(i, k) in 20" :key="k">
      <div class="table-name">
        <div class="table-name-text">
          <span class="table-name-text1"> BTC<span class="table-name-text2">/USDT</span> </span>
        </div>
        <div>
          <span class="table-name-text2">{{ $t('text14') }}1006281.9504</span>
        </div>
      </div>
      <div class="table-price">41835.14</div>
      <div class="table-rise">
        <div :class="['table-button-up', k % 2 == 0 ? 'table-button-down' : '']">+0.12%</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.content {
  background: var(--box-bg-color);
}
.sticky{
  background: var(--box-bg-color);
}
.box {
  background: var(--box-bg-color);
  margin-bottom: 10px;
}
.tab-box {
  padding: 15px 20px;
  box-sizing: border-box;
  display: flex;
  margin: 0;
  .tab-item {
    color: rgba(255, 206, 28, 1);
    font-size: 16px;
    padding-bottom: 5px;
    border-bottom: 3px solid rgba(255, 206, 28, 1);
    font-weight: 600;
  }
}
.table-th {
  display: flex;
  color: var(--color);
  font-size: 12px;
  padding: 20px;
  box-sizing: border-box;
  background: var(--box-bg-color);
  border-radius: 20px 20px 0 0;
  .updown {
    width: 8px;
    height: 10px;
    margin-left: 4px;
  }
}
.table-item {
  box-sizing: border-box;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  background: var(--box-bg-color);

  .table-name {
    flex: 1.5 1 0%;
    .name-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .table-name-text2 {
      font-size: 12px;
      color: #9ca3af;
      font-weight: 500;
    }
    .table-name-text1 {
      font-size: 14px;
      color: var(--color);
      font-weight: 700;
    }
  }
  .table-price {
    flex: 1;
    font-size: 14px;
    color: var(--color);
    font-weight: 700;
  }
  .table-rise {
    flex: 1;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .table-button-up {
      width: 70px;
      height: 30px;
      border-radius: 4px;
      background: rgba(246, 70, 93, 1);
      color: #fff;
      font-size: 12px;
      text-align: center;
      line-height: 30px;
    }
    .table-button-down {
      background: #51bc86;
    }
  }
}
</style>