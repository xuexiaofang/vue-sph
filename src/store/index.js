import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import search from './search'
import home from './home'
import detail from './detail'
import shopCart from './shopCart'
import user from './user/user'
import trade from './trade'
import pay from './pay'
export default new Vuex.Store({
  modules: {
    search,
    home,
    detail,
    shopCart,
    user,
    trade,
    pay
  },
});