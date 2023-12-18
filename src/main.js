import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import "./assets/font/style.css"
import i18n from "./i18n/index"
Vue.config.productionTip = false
import empty from "@/components/empty/index.vue"
Vue.component("empty", empty)
import { Toast } from 'vant';
Vue.use(Toast);
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
