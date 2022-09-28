import {
  reqCategoryList,
  reqGetBannerList,
  reqFloorList,
} from "@/api";

const actions = {
  async categoryList({ commit }) {
    const reslut = await reqCategoryList();
    if (reslut.code === 200) {
      commit("CATEGORYLIST", reslut.data);
    }
  },
  async getBannerList({ commit }) {
    const reslut = await reqGetBannerList();
    if (reslut.code === 200) {
      commit("GETBANNERLIST", reslut.data);
    }
  },
  async GetFloorList({ commit }) {
    const reslut = await reqFloorList();
    if (reslut.code === 200) {
      commit("GETFLOORLIST", reslut.data);
    }
  },
};
const mutations = {
  CATEGORYLIST(state, val) {
    state.categoryList = val;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  },
};
const state = {
  m: "home",
  categoryList: [],
  bannerList: [],
  floorList:[]
  
};
const getters = {};
export default {
  actions,
  mutations,
  state,
  getters,
};
