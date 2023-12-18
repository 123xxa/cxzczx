<template>
  <div>
    <div class="lang-box" @click="show = !show">
      <div class="lang">{{langs[getLang].name}}</div>
      <img
        class="lang-box-img"
        :src="langs[getLang].img"
        alt
      />
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="lang-box-list">
        <div
          v-for="(item,key) in langs"
          :key="key"
          @click="changeLang(item.code)"
          class="lang-box-item"
        >
          <span>{{item.name}}</span>
          <img class="lang-box-img" :src="item.img" alt />
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script >
import { mapGetters ,mapActions} from 'vuex';
export default {
    computed: {
     ...mapGetters(["getLang"])
    },
  data() {
    return {
        show:false,
      langs: {
        en: {
          name: "English",
          code: "en",
          img: require("@/assets/images/en.png")
        },
        jp: {
          name: "日本語",
          code: "jp",
          img: require("@/assets/images/jp.png")
        },
        kr: {
          name: "한국어",
          code: "kr",
          img: require("@/assets/images/kr.png")
        },
        vn: {
          name: "Tiếng Việt",
          code: "vn",
          img: require("@/assets/images/vn.png")
        },
        th: {
          name: "ไทย",
          code: "th",
          img: require("@/assets/images/th.png")
        },
        ar: {
          name: "عربي",
          code: "ar",
          img: require("@/assets/images/ar.png")
        },
        de: {
          name: "Deutsche",
          code: "de",
          img: require("@/assets/images/de.png")
        },
        it: {
          name: "Italiano",
          code: "it",
          img: require("@/assets/images/it.png")
        },
        fr: {
          name: "français",
          code: "fr",
          img: require("@/assets/images/fr.png")
        },
        tr: {
          name: "Türkçe",
          code: "tr",
          img: require("@/assets/images/tr.png")
        }
      }
    };
  },
  methods: {
    ...mapActions(['setLang']),
    changeLang(e){
    if(e === this.getLang){
        return;
    }
    this.setLang(e)
    this.$i18n.locale = e
}
  }
};
</script>
<style lang="scss" scoped>
.lang-box {
  display: flex;
  align-items: center;
  color: #9ca3af;
  font-size: 12px;
  cursor: pointer;
}
.lang-box-img {
  width: 16px;
  height: 12px;
  margin-left: 5px;
}
.lang-box-list {
  width: 106px;
  position: absolute;
  color: #9ca3af;
  background: #1f2937;
  padding: 0 10px;
  right: 0;
  top: 46px;
  .lang-box-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 35px;
    border-bottom: 1px solid #111827;
  }
}
</style>
