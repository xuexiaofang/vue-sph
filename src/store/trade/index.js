import { reqFindUserAddressList, reqTrade } from "@/api";
const actions = {
   async getFindUserAddressList({commit}) {
        const result = await reqFindUserAddressList()
        if (result.code === 200) {
            commit('GETFINDUSERADDRESSLIST',result.data)
        }
    },
    async getTrade({commit}) {
        const result = await reqTrade()
        if (result.code === 200) {
           commit('GETTRADE',result.data) 
        }
    }
}
const mutations = {
  GETFINDUSERADDRESSLIST(state, addressInfo) {
    state.addressInfo = addressInfo;
  },
    GETTRADE(state,tradeInfo) {
      state.tradeInfo=tradeInfo
  }
};
const state = {
    addressInfo: [],
    tradeInfo:{}
}
const getters = {
   
}
export default {
    actions,
    mutations,
    state,
    getters
}