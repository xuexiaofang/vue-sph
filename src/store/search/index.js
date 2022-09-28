import {reqSearchList} from '@/api'
const actions = {
  async GetSearchList({commit},params={}) {
        const result = await reqSearchList(params)
        if (result.code === 200) {
            commit('GETSEARCHLIST',result.data)
        }
  }
};
const mutations = {
    GETSEARCHLIST(state,searchList) {
        state.searchList = searchList;
  }
};
const state = {
    n: 'search',
    searchList:{}
};
const getters = {
    attrsList(state) {
    return state.searchList.attrsList||[];
  },
  goodsList(state) {
    return state.searchList.goodsList||[];
  },
  trademarkList(state) {
    return state.searchList.trademarkList||[];
  },
};
export default {
    actions,
    mutations,
    state,
    getters
}