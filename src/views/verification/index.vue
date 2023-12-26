<template>
    <div class="content">
        <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
            <template #title>
                <div class="title">Identity Verification</div>
            </template>
            <template #left>
                <van-icon @click="goback" name="arrow-left" color="var(--color)" size="20" />
            </template>
        </van-nav-bar>
        <div class="top">
            <div class="title">Identity Verification</div>
            <div style="color: #81858c; font-size: 14px;">Complete Identity Verification to access services.</div>
        </div>
        <div class="type">
            <div class="type-item">
                <div class="type-img"><img src="@/assets/images/mine/v-i-1.svg"></div>
                Driver's License
            </div>
            <div class="type-item">
                <div class="type-img"><img src="@/assets/images/mine/v-i-2.svg"></div>
                ID Card
            </div>
            <div class="type-item">
                <div class="type-img"><img src="@/assets/images/mine/v-i-3.svg"></div>
                Passport
            </div>
            <div class="type-item">
                <div class="type-img"><img src="@/assets/images/mine/v-i-4.svg"></div>
                Residence Permit
            </div>
        </div>
        <div class="requirements">
            <div class="requirements-title">Requirements</div>
            <div class="requirements-item">Use your valid government-issued identification document for verification.</div>
        </div>
        <div class="upload">
            <div class="upload-item">
                <div class="upload-title">Front</div>
                <div class="upload-wrapper">
                    <van-uploader :after-read="afterReadFont">
                        <img :src="imgPathFont" alt="" v-if="imgPathFont" class="upload-img">
                        <div class="upload-box" v-else></div>
                    </van-uploader>
                </div>
            </div>
            <div class="upload-item">
                <div class="upload-title">Back</div>
                <div class="upload-wrapper">
                    <van-uploader :after-read="afterReadBack">
                        <img :src="imgPathBack" alt="" v-if="imgPathBack" class="upload-img">
                        <div class="upload-box" v-else></div>
                    </van-uploader>
                </div>
            </div>
        </div>
        <div class="yellow-btn" @click="submit">submit</div>
    </div>
</template>
  
<script>
import { imageUploader, putCertification } from '@/api/user.js'
export default {
    name: "identityVerification",
    data() {
        return {
            imgPathFont: '',
            imgPathBack: ''
        }
    },
    methods: {
        to(e) {
            window.open(e, "_blank");
        },
        goback() {
            this.$router.go(-1)
        },
        async afterReadFont (file) {
            let content = file.file;
            let formData = new FormData();
            formData.append("file", content);
            const res = await imageUploader(formData)
            if (res.code == 200) {
                this.imgPathFont = res.data
            }
        },
        async afterReadBack (file) {
            let content = file.file;
            let formData = new FormData();
            formData.append("file", content);
            const res = await imageUploader(formData)
            if (res.code == 200) {
                this.imgPathBack = res.data
            }
        },
        async submit() {
            const res = await putCertification({
                idCardPositive: this.imgPathFont,
                idCardReverse: this.imgPathBack
            })
            if (res.code == 200) {
                this.$toast("success")
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
    box-sizing: border-box;
    padding: 24px 10px;
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
    .top {
        width: 100%;
        box-sizing: border-box;
        padding: 32px 160px 32px 32px;
        border-radius: 8px;
        background: url('~@/assets/images/mine/identity-verification.svg') no-repeat center right,linear-gradient(90.97deg,#FFF4DE .69%,#FFFFFF 95.07%);
        .title {
            color: #333333;
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: bold;
        }
    }
    .type {
        width: 100%;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: bold;
        margin: 16px 0 0;
        .type-item {
            display: flex;
            padding: 8px 0 8px 20px;
            border-radius: 8px;
            align-items: center;
        }
        .type-img {
            width: 32px;
            height: 32px;
            background: #fff;
            border-radius: 4px;
            margin-right: 16px;
        }
    }
    .requirements {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 12px 0;
        .requirements-title {
            font-size: 16px;
            font-weight: bold;
        }
        .requirements-item {
            font-size: 14px;
            opacity: 0.8;
            margin-top: 10px;
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
    .upload {
        margin: 20px 0 30px;
        display: flex;
        justify-content: space-between;
        .upload-item {
            width: 48%;
        }
        .upload-title {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .upload-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
        }
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
}
</style>