import { reqSubmitOrder } from '@/api'
const actions = {
 async submitOrder(tradeNo,data) {
        const result = await reqSubmitOrder(tradeNo,data);
        console.log(result);
  },
};
const mutations = {};
const getters = {};
const state = {};
export default {
    actions,
    mutations,
    getters,
    state
}