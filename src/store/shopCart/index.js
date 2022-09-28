import {reqCartList} from '@/api'
const actions = {
   async getCartInfo() {
        const reslut = await reqCartList()
        if (reslut.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('获取购物车信息失败'))
        }
    }
}
const mutations = {

}
const getters = {

}
const state = {

}

export default {
    actions,
    mutations,
    getters,
    state
}