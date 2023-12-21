<template>
  <div class="content">
    <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
      <template #title>
        <div class="title">{{ $t('text200') }}</div>
      </template>
      <template #left>
        <van-icon @click="goback" name="arrow-left" color="var(--color)" size="20" />
      </template>
    </van-nav-bar>
    <div class="main-box">
      <div class="code-img">
          <div class="img" id="qrcode"></div>
      </div>
      <div class="text201">{{ $t('text201') }}</div>
      <div class="my-address">{{ address }}</div>
      <div class="yellow-btn" @click="copy(address)">{{ $t('text202') }}</div>
      <div class="input-content">
        <div class="input-label">{{ $t('text203') }}</div>
        <van-field class="input" v-model="account" :placeholder="$t('text204')" />
        <div class="input-label">{{ $t('text205') }}</div>
        <van-field class="input" v-model="amount" type="number" :placeholder="$t('text206')" />
        <div class="input-label" style="margin: 20px 0;">{{ $t('text207') }}</div>
        <van-uploader :after-read="afterRead">
          <img :src="imgPath" alt="" v-if="imgPath" class="upload-img">
          <div class="upload-box" v-else></div>
        </van-uploader>
        <div class="input-label" style="margin: 0;">{{ $t('text208') }}</div>
      </div>
      <div class="yellow-btn" @click="submit">{{ $t('text209') }}</div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode2'
import { appRecharge, getRechargeAddress, imageUploader } from '@/api/user.js'
export default {
  data() {
    return {
      // 1 TRC20 2 ERC20
      chainType: 1,
      address: '',
      account: '',
      amount: '',
      value1: '',
      imgPath: ''
    };
  },
  created() {
    if (this.$route.query.chainType) {
      this.chainType = this.$route.query.chainType
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const res = await getRechargeAddress()
      if (res.code == 200) {
        this.address = res.data
        this.$nextTick(() => {
          let div = document.getElementById("qrcode")
            if (div) {
              var qrcode = new QRCode(div, {
                  text: this.address,
                  width: 118,
                  height: 118,
                  colorDark : "#000",
                  colorLight : "#fff",
                  correctLevel : QRCode.CorrectLevel.H
              });
            }
        })
      }
    },
    copy(text) {
      if (!(text && text.length > 0)) return
      let that = this
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(
          function () {
            that.$toast(that.$t('text210'));
          },
          function () {
            that.copy2(text);
          }
        );
      } else {
        that.copy2(text);
      }
    },
    copy2(text) {
      let that = this
      const div = document.createElement("div")
      div.style.position = "absolute";
      div.style.top = "-1000px";
      div.style.left = 0;
      div.style.opacity = 0;
      div.style.zIndex = -10;
      div.className = "";
      div.innerText = text
      document.body.appendChild(div);
      const range = document.createRange();
      range.selectNode(div);
      const selection = document.getSelection();
      /* 移除之前选中内容 */
      if (selection.rangeCount>0) selection.removeAllRanges();
      selection.addRange(range);
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        that.$toast(that.$t('text210'));
      }
      selection.removeAllRanges();
      document.body.removeChild(div);
    },
    to(e) {
      window.open(e, "_blank");
    },
    goback(){
        this.$router.go(-1)
    },
    async afterRead(file) {
      // // 此时可以自行将文件上传至服务器
      // console.log(file);
      let content = file.file;
      //创建一个新的FormData
      let formData = new FormData();
      // upload这个名字是后台给的
      formData.append("file", content);
      //获取formdata表单所有的数据
      const res = await imageUploader(formData)
      if (res.code == 200) {
        this.imgPath = res.data
      }
    },
    async submit() {
      if (!this.account) return this.$toast(this.$t('text204'))
      if (!this.amount) return this.$toast(this.$t('text206'))
      if (!this.imgPath) return this.$toast(this.$t('text239'))
      const res = await appRecharge({
        address: this.account,
        amount: this.amount,
        certificateImage: this.imgPath,
        chinType: this.chainType,
        tokenType: 2
      })
      if (res.code == 200) {
        this.$toast(this.$t('text240'))
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar {
  background: var(--bg-color);
}
.content {
  color: var(--color);
  .title {
    color: var(--color);
    font-weight: 700;
  }
  .main-box {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    .code-img {
      width: 150px;
      height: 150px;
      padding: 15px;
      box-sizing: border-box;
      .img {
        width: 100%;
        height: 100%;
        border: 1px solid #FFFFFF;
        box-sizing: border-box;
      }
    }
    .text201 {
      margin: 20px 0;
      font-size: 16px;
    }
    .my-address {
      margin-bottom: 20px;
      font-size: 14px;
    }
    .yellow-btn {
      width: 100%;
      height: 40px;
      background: #ffce1c;
      border-radius: 5px;
      font-size: 16px;
      color: #000;
      line-height: 40px;
      text-align: center;
    }
    .input-content {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      .input-label {
        width: 100%;
        font-size: 14px;
        margin: 10px 0;
      }
      .input {
        background: #f7f6fb;
        border-radius: 8px;
        height: 40px;
        margin-top: 5px;
        color: #000 !important;
        padding: 7px 12px;
        border: unset;
        font-size: 13px;
        line-height: 26px;
        ::v-deep input {
          color: #000;
        }
        ::placeholder {
          color: #808080;
        }
      }
      .upload-img {
        width: 88px;
        height: 88px;
        margin: 5px 0px 10px 0px;
        border: 1px solid var(--color);
      }
      .upload-box {
        width: 88px;
        height: 88px;
        border: 1px solid var(--color);
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin: 5px 30px 10px 30px;
        &::before {
          content: "";
          width: 56px;
          height: 3px;
          background: var(--color);
          position: absolute;
          border-radius: 3px;
        }
        &::after {
          content: "";
          width: 3px;
          height: 56px;
          background: var(--color);
          position: absolute;
          border-radius: 3px;
        }
      }
    }
  }
}
</style>