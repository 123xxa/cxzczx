<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  import { getSocket } from '@/utils/webSocket'
  export default {
    created(){
      this.$store.commit('SET_SWITCH_CHECKED',this.$store.state.switchChecked)
    },
    mounted() {
      getSocket()
    },
  }
</script>
<style >
.van-dialog__header {
  color: #000000;
}
:root{
  --bg-color:#111827;
  --box-bg-color:#171E26;
  --color:#FFFFFF
}
body {
  background: var(--bg-color);
  color: var(--color);
  overflow-x: hidden;
  font-size: 12px;
}
</style>
