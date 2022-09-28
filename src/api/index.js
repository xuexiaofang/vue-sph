//当前这个模块：对api进项统一管理
import requests from "./request"; 
import mockRequest from './mockRequest'
//三级联动接口地址：/product/getBaseCategoryList  get请求 无参数
 export const reqCategoryList = () => requests.get(  "/product/getBaseCategoryList");
export const reqGetBannerList = () => mockRequest.get("/banner")
export const reqFloorList = () => mockRequest.get('/floor')
export const reqSearchList = (params) =>requests({ url: "/list", method: "post", data: params });
export const reqDetailList = (skuId) => requests({ url: `/item/${skuId}`, method: "get" });
//cart/addToCart/{ skuId }/{ skuNum } 
export const reqAddCars = (skuId,skuNum)=>{requests({ url: `/cart/addToCart/${skuId}/${skuNum}`,method:"post" });}
//获取购物车列表接口/cart/cartList
export const reqCartList = () => requests({ url: "/cart/cartList",method:'get' });
 //获取验证码接口/api/user/passport/sendCode/{phone}
export const reqSendCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
 //注册接口/api/user/passport/register
export const reqRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'post' })
//登录接口/api/user/passport/login
export const reqLogin = (data) => requests({ url: "/user/passport/login", data, method: 'post' });
//带着token去获取用户信息的接口/api/user/passport/auth/getUserInfo
export const reqGetUserInfo = () => requests({ url: "/user/passport/auth/getUserInfo", method: 'get' });
//退出 登录/api/user/passport/logout
export const reqLogout = () => requests({ url: "/user/passport/logout", method: 'get' });
//获取用户地址信息/api/user/userAddress/auth/findUserAddressList
export const reqFindUserAddressList = () =>requests({ url: "/user/userAddress/auth/findUserAddressList", method: 'get' });
  //获取订单交易页信息/api/order/auth/trade
export const reqTrade = () => requests({ url: "/order/auth/trade", method: 'get' });
  //提交订单/api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
//获取订单支付信息接口 /api/payment/weixin/createNative/{orderId}
export const reqCreateNative = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
//查看订单支付状态/api/payment/weixin/queryPayStatus/{orderId}
export const reqQueryPayStatus = (orderId) =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });
  //查看我的订单中心/api/order/auth/{page}/{limit}
  export const reqAuth = (page,limit) => requests({ url: `/order/auth/${page}/${limit}`,method:'get' });