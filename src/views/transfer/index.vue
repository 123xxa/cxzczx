<template>
  <div class="content">
    <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
      <template #title>
        <div class="title">{{ $t('text212') }}</div>
      </template>
      <template #left>
        <van-icon @click="goback" name="arrow-left" color="#fff" size="20" />
      </template>
    </van-nav-bar>
    <div class="main-box">
      <div class="top-box">
        <div class="left-icon"></div>
        <div class="right-select">
          <div class="s-item">
            <div class="s-label">{{ $t('text213') }}</div>
            <div class="s-value">{{ selectList[fromIndex].label }}</div>
          </div>
          <div class="s-item">
            <div class="s-label">{{ $t('text214') }}</div>
            <div class="s-value">{{ selectList[toIndex].label }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="middle-part">
      <div class="part-box">
        <div class="m-title">{{ $t('text220') }}</div>
        <div class="input-box">
          <van-field v-model="number" type="number" class="input" :placeholder="$t('text221')" />
          <div class="unit">{{ list[listIndex].label }}</div>
          <div class="all">{{ $t('text222') }}</div>
        </div>
      </div>
      <div class="part-box">
        <div class="ava-text">{{ $t('text223') }}:
          <div style="margin: 0 5px;">0.00000000</div>{{ list[listIndex].label }}
        </div>
        <div class="yellow-btn">{{ $t('text212') }}</div>
      </div>
    </div>
    <div class="bottom-part">
      <div class="b-title">{{ $t('text224') }}</div>
      <div class="table-th">
        <div class="th-label">{{ $t('text225') }}</div>
        <div class="th-label">{{ $t('text226') }}</div>
        <div class="th-label">{{ $t('text227') }}</div>
      </div>
      <div class="list-box" v-if="recordList && recordList.length !== 0"></div>
      <div class="empty-box" v-else>
        <img src="@/assets/images/lever/anonymous.png" alt="" class="empty-img" />
        <div class="empty-text">{{ $t('text30') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: '',
      selectList: [
        {
          label: this.$t('text215'),
          value: 0
        },
        {
          label: this.$t('text216'),
          value: 1
        },
        {
          label: this.$t('text217'),
          value: 2
        }
      ],
      fromIndex: 0,
      toIndex: 1,
      listIndex: 0,
      recordList: []
    };
  },
  computed: {
    list() {
      return this.$store.state.coinList
    }
  },
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
  background: var(--bg-color);
}

.content {
  color: #fff;

  .title {
    color: #fff;
    font-weight: 700;
  }

  .main-box {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    .top-box {
      width: 100%;
      border: 1px solid #1f2937;
      border-radius: 5px;
      display: flex;
      align-items: center;
      .left-icon {
        width: 1px;
        height: 22px;
        background: #1f2937;
        position: relative;
        margin: 0 16px;
        &::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -5px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #3b82f6;
        }
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -5px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #f6465d;
        }
      }
      .right-select {
        flex: 1;
        .s-item {
          width: 100%;
          height: 55px;
          display: flex;
          align-items: center;
          font-size: 13px;
          &:first-child {
            border-bottom: 1px solid #1f2937;
          }
          .s-label {
            color: #9ca3af;
            margin-right: 10px;
          }
          .s-value {
            color: #f2f5ff;
          }
        }
      }
    }
  }
  .middle-part {
    width: 100%;
    margin-top: 10px;
    padding: 10px 0;
    .part-box {
      width: 100%;
      padding: 0 16px;
      box-sizing: border-box;
      &:first-child {
        border-bottom: 1px solid #1f2937;
      }
      .m-title {
        padding: 11px 0;
        font-size: 13px;
        color: #f2f5ff;
      }
      .input-box {
        width: 100%;
        height: 55px;
        display: flex;
        align-items: center;
        .input {
          flex: 1;
          background: unset;
          padding-left: 0;
          ::v-deep input {
            color: #f2f5ff;
          }
          ::placeholder {
            color: #808080;
          }
          &::after {
            content: '';
            display: none;
          }
        }
        .unit {
          color: #9ca3af;
          font-size: 15px;
          padding-right: 11px;
          border-right: 1px solid #374151;
          box-sizing: border-box;
        }
        .all {
          color: #f2f5ff;
          font-size: 13px;
          padding-left: 10px;
        }
      }
      .ava-text {
        width: 100%;
        display: flex;
        align-items: center;
        color: #9ca3af;
        font-size: 13px;
        padding: 11px 0;
      }
      .yellow-btn {
        width: 100%;
        height: 50px;
        background: #ffce1c;
        border-radius: 5px;
        font-size: 15px;
        color: #000;
        line-height: 50px;
        text-align: center;
        margin: 33px 0 11px;
      }
    }
  }
  .bottom-part {
    width: 100%;
    height: fit-content;
    min-height: 50vh;
    padding: 16px 0;
    margin-top: 11px;
    box-sizing: border-box;
    .b-title {
      width: 100%;
      padding: 0 16px;
      box-sizing: border-box;
      font-size: 17px;
      color: #f2f5ff;
    }
    .table-th {
      width: 100%;
      padding: 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #1f2937;
      .th-label {
        flex: 1;
        color: #f2f5ff;
        font-size: 13px;
        &:last-child {
          text-align: right;
        }
      }
    }
    
    .empty-box {
      width: 100%;
      padding: 55px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-direction: column;
      .empty-img {
        width: 66px;
        height: 66px;
        display: block;
      }
      .empty-text {
        font-size: 13px;
        color: #f2f5ff;
      }
    }
  }
}
</style>