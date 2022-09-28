import {
  reqSendCode,
  reqRegister,
  reqLogin,
  reqGetUserInfo,
  reqLogout,
} from "@/api";
const actions = {
  async getCode({commit},phone) {
        const reslut = await reqSendCode(phone);
        if (reslut.code === 200) {
            commit('GETCODE', reslut.data)
            return 'ok'
        }
        else {
            return Promise.reject(new Error('获取验证码失败'))
        }
    },
   async getRegister(_,userObj) {
       const result = await reqRegister(userObj); 
       if (result.code === 200) {
          return 'ok'
       } else {
           return Promise.reject(new Error('注册失败'))
      }
       
    },
  async getLogin({commit},userObj) {
      const result = await reqLogin(userObj)
      if (result.code === 200) {
            localStorage.setItem("token",result.data.token);
          commit('GETLOGIN', result.data.token)
          return '登录成功'
      } else {
          return Promise.reject(new Error('登录失败'))
      }
    },
   async getUserInfo({commit}) {
       const result = await reqGetUserInfo()
       if (result.code === 200) {
           commit("GETUSERINFO", result.data);
           return '获取用户信息成功'
      }else{
        return Promise.reject(new Error('获取用户信息失败'))
      }
           
    },
 async  getLogout({commit}){
     const result = await reqLogout()
     if (result.code === 200) {
         localStorage.removeItem('token', '')
         console.log('退出成功');
        commit('GETLOGOUT')
         return '退出登录成功'
     } else {
         return Promise.reject(new Error('退出登录'))
     }
   }
       
 
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  GETLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
    GETLOGOUT(state) {
        state.userInfo = {},
            state.token = ''
          
  }
};
const getters = {

};
const state = {
    code: '',
    token: localStorage.getItem('token'),
    userInfo:{}
};
export default {
    actions,
    mutations,
    getters,
    state
}