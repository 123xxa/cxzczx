<template>
  <van-tabbar
    v-model="active"
    active-color="#FFCE1C"
    inactive-color="#A2A6A5"
    placeholder
    class="tabbar-box"
  >
    <van-tabbar-item v-for="(i, k) in tabbarList" :key="k" @click="changeTab(i)">
      <template #icon="props">
        <img class="tabbar-img" :src="props.active ? i.selIcon : i.icon" />
      </template>
      <div class="tabbar-title">{{ i.title }}</div>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script >
import {mapGetters} from "vuex"

export default {
  computed: {
    ...mapGetters(['getSwitchChecked']),
    tabbarList() {
      return [
        {
          title: this.$t("text1"),
          icon: this.getSwitchChecked?require("@/assets/images/tabbar/index0.png"):require("@/assets/images/tabbar/index2.png"),
          selIcon: require("@/assets/images/tabbar/index1.png"),
          url: "/home"
        },
        {
          title: this.$t("text5"),
          icon: this.getSwitchChecked?require("@/assets/images/tabbar/hang0.png"):require("@/assets/images/tabbar/hang2.png"),
          selIcon: require("@/assets/images/tabbar/hang1.png"),
          url: "/market"
        },
        // {
        //   title: this.$t("text6"),
        //   icon: this.getSwitchChecked?require("@/assets/images/tabbar/trade0.png"):require("@/assets/images/tabbar/trade2.png"),
        //   selIcon: require("@/assets/images/tabbar/trade1.png"),
        //   url: "/trade"
        // },
        {
          title: this.$t("text7"),
          icon: this.getSwitchChecked?require("@/assets/images/tabbar/gang0.png"):require("@/assets/images/tabbar/gang2.png"),
          selIcon: require("@/assets/images/tabbar/gang1.png"),
          url: "/lever"
        },
        {
          title: this.$t("text8"),
          icon: this.getSwitchChecked?require("@/assets/images/tabbar/me1.png"):require("@/assets/images/tabbar/me2.png"),
          selIcon: require("@/assets/images/tabbar/me0.png"),
          url: "/mine"
        }
      ];
    }
  },
  data() {
    return {
      active: 0
    };
  },
  mounted(){
    const index = this.tabbarList.findIndex(i=>i.url == this.$route.path)
    this.active = index || 0;
  },
  methods: {
    changeTab(e) {
      if (e.url == this.$route.path) return;
      this.$router.push(e.url);
    }
  }
};
</script>
<style lang="scss" scoped>
.tabbar-img {
  width: 24px;
  height: 24px;
}
.tabbar-title {
  font-size: 10px;
}
::v-deep .van-tabbar {
  background: var(--box-bg-color);
  border-color: red;
}
::v-deep .van-tabbar-item--active {
  background:var(--box-bg-color);
}
::v-deep .van-hairline--top-bottom:after {
  border-color: var(--box-bg-color);
}
</style>