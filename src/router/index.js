import VueRouter from "vue-router";
import Vue from "vue";
// import MyHome from "@/pages/MyHome";

import MyDetail from "@/pages/Detail"
import addCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import store from '@/store'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import GroupOrder from '@/pages/Center/GroupOrder'
import MyOrder from '@/pages/Center/MyOrder'
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      name: "center",
      path: "/center",
      component: Center,
      meta: { isShow: false },
      children: [
        {
          path: "myorder",
          component: MyOrder,
        },
        {
          path: "grouporder",
          component: GroupOrder,
        },
        {
          path: "/center",
          redirect: "/center/myorder",
        },
      ],
    },
    {
      name: "paysuccess",
      path: "/paysuccess",
      component: PaySuccess,
      meta: { isShow: false },
    },
    {
      name: "login",
      path: "/login",
      component: Login,
      meta: { isShow: false }, //标识当前路由是否有footer组件
    },
    {
      name: "register",
      path: "/register",
      component: Register,
      meta: { isShow: false },
    },
    {
      name: "home",
      path: "/home",
      component: () => import("@/pages/MyHome"),
      meta: { isShow: true },
    },
    {
      name: "search",
      path: "/search/:keyword?",
      component: () => import("@/pages/MySearch"),
      meta: { isShow: true },
      props: true,
    },
    {
      name: "detail",
      path: "/detail/:skuid",
      component: MyDetail,
      meta: { isShow: true },
      props: true,
    },
    {
      name: "addcartsuccess",
      path: "/addcartsuccess",
      component: addCartSuccess,
      meta: { isShow: true },
      props: true,
    },
    {
      name: "shopcart",
      path: "/shopcart",
      component: ShopCart,
      meta: { isShow: true },
      props: true,
    },
    {
      name: "trade",
      path: "/trade",
      component: Trade,
      meta: { isShow: false },
      beforeEnter: (_, from, next) => {
        if (from.path === "/shopcart") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      name: "pay",
      path: "/pay",
      component: Pay,
      meta: { isShow: false },
      beforeEnter: (_, from, next) => {
        if (from.path === "/trade") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: "/",
      redirect: "/home",
    },
    {
      path:'/swiper',
      component: () => import("@/components/MyCarousel/MySwiper.vue"),
    }
  ],
  scrollBehavior() {
    // 始终滚动到顶部
    return { y: 0 };
  },
});
router.beforeEach(async(to,_,next) => {
  if (store.state.user.token) {
    //如果登录了
    // console.log('登录成功');
    if (to.path ==='/login'||to.path=='register') {
      //如果登录了再去登录就不可以
      next('/')
    } else {
      //登录了去的其他页面
      if (store.state.user.userInfo.loginName) {
        // console.log('登录且有用户信息');

         next();
      } else {
        //派发获取用户信息的actions
        try {
          await store.dispatch("getUserInfo");
          console.log('发送获取用户信息的请求');
          //  console.log('获取用户信息成功，页面此时有用户信息');
          next()
        } catch (error) {
          //失败的情况是token失效了，要退出登录，重新登录
          await store.dispatch("getLogout")
          console.log('token失效,请重新登录');
            next('/login')
        }
      }
    }
 
  } else {
    //如果没登录
    if (to.path.indexOf('/trade')!=-1 || to.path.indexOf('/pay')!=-1  || to.path.indexOf('/center')!=-1 ) {
      next(`/login?redirect=${to.path}`)
    } else {
      next();
    }
}
})
export default router;
