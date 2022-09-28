import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store  from './store'
import TypeNav from '@/components/Type-nav'
import '@/mock/mockServer'
import 'swiper/css/swiper.css'
import MyCarousel from "@/components/MyCarousel";
import Pagination from '@/components/Pagination'
import * as API from '@/api'
import "element-ui/lib/theme-chalk/index.css";
import { MessageBox } from 'element-ui'
import VueLazyload from "vue-lazyload";
import pikaqiu from '@/assets/images/pikaqiu.gif'
Vue.use(VueLazyload, {
  loading: pikaqiu,
});
Vue.component(Pagination.name, Pagination);
Vue.component(MyCarousel.name, MyCarousel);
Vue.component(TypeNav.name, TypeNav)
// Vue.use(MessageBox);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false
// Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
}).$mount('#app')
