<template>
  <div class="ov">
    <van-nav-bar title placeholder fixed left-arrow>
      <template #left>
        <van-icon name="arrow-left" color="#003a9a" size="18" @click="onClickLeft" />
      </template>
      <template #title>
        <div style="color: #003a9a">{{ $t("text285") }}</div>
      </template>
      <template #right></template>
    </van-nav-bar>
    <div class="content" :style="{'padding-bottom':'70px'}">
      <div
        :class="['messageList',i.receiver=='system'?'type':'']"
        v-for="(i,k) in messageList"
        :key="k"
        :id="'id'+i.timestamp"
      >
        <pre :class="['message',i.receiver=='system'?'bg':'']" v-html="i.content"></pre>
      </div>
    </div>
    <div class="input" id="input">
      <van-field
        v-model="message"
        rows="1"
        autosize
        label
        type="textarea"
        placeholder="Please enter your message"
        ref="input"
      >
        <template #button>
          <van-button size="small" type="info" @click="send">send</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";
import { history } from "@/api/user.js";
export default {
  computed: {
    ...mapGetters(["token","userInfo"])
  },
  data() {
    return {
      message: "",
      messageList: []
    };
  },
  created() {
    console.log(this.userInfo)
    if(!this.token) return this.$router.replace('/login')
    this.history();
    const that = this;
    this.$socket.onmessage = function(event) {
      if (event.data) {
        const data = JSON.parse(event.data);
        if (data.type === "CHAT") {
          that.messageList.push(data);
          that.$nextTick(() => {
            document.getElementById("id" + data.timestamp).scrollIntoView(true);
          });
        }
      }
    };
  },
  methods: {
    async history() {
      this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0
      });
      const res = await history({
        address: this.userInfo.nickname,
        begin: 0,
        end: 30
      });
      this.messageList = res.data || [];
      this.$nextTick(() => {
        if(this.messageList.length===0) return
        document
          .getElementById("id" + res.data[res.data.length - 1].timestamp)
          .scrollIntoView(true);
      });
      this.$toast.clear();
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    send() {
      if (!this.message) return this.$toast("Please enter your message");
      let time = new Date().getTime();
      const obj = {
        type: "CHAT",
        content: this.message,
        sender: this.userInfo.nickname,
        receiver: "system",
        timestamp: time
      };

      this.messageList.push(obj);
      this.$socket.send(JSON.stringify(obj));
      this.message = "";
      this.$nextTick(() => {
        this.scrollIntoView(time);
        this.$refs.input.focus();
      });
    },
    scrollIntoView(time) {
      document.getElementById("id" + time).scrollIntoView(true);
    }
  }
};
</script>
  
  <style scoped>
.content {
  margin: 15px;
}
.input {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #00000030;
  padding: 10px;
  box-sizing: border-box;
}
.messageList {
  display: flex;
}
.type {
  justify-content: flex-end;
}
.message {
  max-width: 70%;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}
.bg {
  background: #89d961;
}
</style>