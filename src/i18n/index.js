import Vue from "vue"
import vueI18n from "vue-i18n"
import en from "./lang/en"
import jp from "./lang/jp"
import kr from "./lang/kr"
import ar from "./lang/ar"
import de from "./lang/de"
import fr from "./lang/fr"
import it from "./lang/it"
import th from "./lang/th"
import tr from "./lang/tr"
import vn from "./lang/vn"
Vue.use(vueI18n)
const i18n = new vueI18n({
  locale: localStorage.getItem('lang') || 'en',
  messages:  {en,jp,kr,ar,de,fr,it,th,tr,vn}
})
  
  export default i18n