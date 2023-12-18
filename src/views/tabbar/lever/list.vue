<template>
  <van-overlay :show="show" @click="close" z-index="10001">
    <div class="overlay-content">
      <van-sticky>
        <div class="sticky">
          <div class="tab-box">
            <div class="tab-item">USDT</div>
          </div>
        </div>
      </van-sticky>
     <div class="table-content">
        <div class="table-item" v-for="(i, k) in 20" :key="k">
      <div class="table-name">
        <div class="table-name-text">
          <span class="table-name-text1"> BTC<span class="table-name-text2">/USDT</span> </span>
        </div>
        <div>
        </div>
      </div>
      <div class="table-rise">
        <div class="table-button-text">123123.12</div>
      </div>
    </div>
     </div>
          
    </div>
  </van-overlay>
</template>

<script>
export default {
    props:{
        show:{
            default:false
        }
    },
  data() {
    return {
      
    };
  },
  methods:{
    close(){
        this.$emit('update:show',false)
    },
  }
};
</script>

<style lang="scss" scoped>
.overlay-content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background: var(--bg-color);
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
  .table-content{
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
  .table-item {
  box-sizing: border-box;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  background: var(--bg-color);
  border-bottom: 1px solid #4B5563;
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
    color: #fff;
    font-weight: 700;
  }
  .table-rise {
    flex: 1;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .table-button-text{
      color: #51bc86;
    }
  }
}
}
</style>