import { reqDetailList, reqAddCars } from '@/api'
import {getUuid} from '@/utils/token_uuid'
const actions = {
  async getDetailInfo({ commit }, skuid) {
    const reslut = await reqDetailList(skuid);
    if (reslut.code === 200) {
      
      commit("GETDETAILINFO", reslut.data);
    }
  },
  async getAddCarsInfo(_, { skuId, skuNum }) {
      const reslut = await reqAddCars(skuId, skuNum);
    //   console.log(commit);
      return reslut
    // if (reslut.code === 200) {
    //   //添加购物车成功
    //     console.log('成功添加');
    //     console.log(commit);
    // } else {
    //     console.log('失败了');
    // }
  },
};
const mutations = {
    GETDETAILINFO(state,goodInfo) {
      state.goodInfo = goodInfo  
  }
};
//getters就是用来简化数据的，和computer一样写法
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView||{}
  }
};
const state = {
   goodInfo:{},
   uuid:getUuid()
}
export default {
    actions,
    mutations,
    getters,
    state
 }

