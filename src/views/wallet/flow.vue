<template>
    <div class="content">
        <van-nav-bar class="my-nav-bar" :border="false" left-text fixed placeholder>
            <template #title>
                <div class="title">{{ $t('text256') }}</div>
            </template>
            <template #left>
                <van-icon @click="goback" name="arrow-left" color="var(--color)" size="20" />
            </template>
        </van-nav-bar>
        <div class="top-box">
            <div class="t-title">USDT</div>
            <div class="t-box">
                <div class="t-item">
                    <div class="t-label">{{ $t('text223') }}</div>
                    <div class="t-value">{{ amount }}</div>
                </div>
                <div class="t-item">
                    <div class="t-label">{{ $t('text251') }}</div>
                    <div class="t-value">{{ reviewAmount }}</div>
                </div>
                <!-- <div class="t-item">
                    <div class="t-label">{{ $t('text250') }}($)</div>
                    <div class="t-value">{{ '0.00' }}</div>
                </div> -->
            </div>
        </div>
        <div class="bottom-box">
            <div class="b-title">{{ $t('text252') }}</div>
            <div class="table-th">
                <div class="th-item">{{ $t('text225') }}</div>
                <div class="th-item">{{ $t('text226') }}</div>
                <div class="th-item">{{ $t('text227') }}</div>
            </div>
            <div class="list-box" v-if="list && list.length !== 0">
                <div class="list-item" v-for="item in list" :key="item.id">
                    <div class="item-item">{{ refType==2? item.usdt : item.eth }}</div>
                    <div class="item-item">
                        {{
                            {
                                1: $t('text253'),
                                50: $t('text254'),
                                60: $t('text255'),
                                64: $t('text286')
                            }[item.module]
                        }}
                    </div>
                    <div class="item-item">{{ item.createTime }}</div>
                </div>
            </div>
            <div class="empty-box" v-else>
                <img src="@/assets/images/lever/anonymous.png" alt="" class="empty-img" />
                <div class="empty-text">{{ $t('text30') }}</div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { getBalanceLog } from '@/api/user.js'
export default {
    data() {
        return {
            loading: false,
            isView: true,
            amount: 0,
            reviewAmount: 0,
            list: [],
            total: 0,
            pageSize: 20,
            pageNum: 1,
            refType:undefined
        };
    },
    created() {
        if (this.$route.query.amount) {
            this.amount = this.$route.query.amount || 0
        }
        if (this.$route.query.reviewAmount) {
            this.reviewAmount = this.$route.query.reviewAmount || 0
        }
        if (this.$route.query.refType) {
            this.refType = this.$route.query.refType 
        }
        this.getList();
    },
	mounted() {
		window.addEventListener("scroll", this.getbottom);
	},
	destroyed() {
		window.removeEventListener("scroll", this.getbottom);
	},
    methods: {
        to(e) {
            window.open(e, "_blank");
        },
        goback() {
            this.$router.go(-1)
        },
        getList() {
            this.loading = true
            getBalanceLog({
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                refType:this.refType
            }).then(res => {
                this.total = res.total
                let arr = res.rows || []
                this.list = this.pageNum === 1 ? arr : [...this.list, ...arr]
                this.loading = false
            }).catch(err => {
                this.loading = false
            })
        },
        // 添加页面触底判断
		getbottom(){
			// 返回滚动条垂直滚动距离
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			// 返回该元素的像素高度，高度包含内边距（padding），不包含边框（border），外边距（margin）和滚动条
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			// 返回该元素的像素高度，高度包含内边距（padding），不包含外边距（margin）、边框（border）
			let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			let numHeight = scrollTop + clientHeight;
			// 触底了
			if (scrollHeight > clientHeight && numHeight > scrollHeight - 1) {
				// 还在加载上一次数据 直接返回
				if(this.loading) return
				return this.countPage()
			}
		},
		// 触底判断是否加载
		countPage(){
			// 判断是否已经加载全部
			if(this.list.length < this.total){
				this.pageNum++
				this.getList()
			}
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

    .top-box {
        width: 100%;
        padding: 16px 16px 27px;
        box-sizing: border-box;
        background: var(--box-bg-color);
        .t-title {
            width: 100%;
            font-size: 19px;
        }
        .t-box {
            width: 100%;
            margin-top: 11px;
            display: flex;
            justify-content: space-between;
            .t-item {
                width: 50%;
                font-size: 13px;
                // &:last-child {
                //     text-align: right;
                // }
                .t-value {
                    margin-top: 5px;
                }
            }
        }
    }
    .bottom-box {
        width: 100%;
        padding: 16px 11px;
        box-sizing: border-box;
        .b-title {
            width: 100%;
            font-size: 17px;
            margin-bottom: 11px;
        }
        .table-th {
            width: 100%;
            display: flex;
            align-items: center;
            padding: 11px 0;
            font-size: 13px;
            border-bottom: 1px solid var(--box-bg-color);
            .th-item {
                width: 33.33%;
                &:last-child {
                    text-align: right;
                }
            }
        }
        .list-box {
            width: 100%;
            .list-item {
                width: 100%;
                height: 50px;
                border-bottom: 1px solid var(--box-bg-color);
                display: flex;
                align-items: center;
                font-size: 13px;
                .item-item {
                    width: 33.33%;
                    &:last-child {
                        text-align: right;
                    }
                }
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
        margin-top: 10px;
      }
    }
}
</style>