<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="cate.categoryName">
              {{ cate.categoryName }}<i @click="del">×</i>
            </li>
            <li class="with-x" v-show="cate.keyword">
              {{ cate.keyword }}<i @click="delKeyword">×</i>
            </li>
            <li class="with-x" v-show="cate.trademark">
              {{ cate.trademark.split(":")[1] }}<i @click="delTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-show="cate.props"
              v-for="(p, index) in cate.props"
              :key="index"
              @click="delProp(index)"
            >
              {{ p.split(":")[1] }}<i>×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector @getAttr="getAttr" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: zonghe }" @click="sort(1)">
                  <a
                    >综合<i
                      v-show="zonghe"
                      class="iconfont"
                      :class="{
                        'icon-down': isDown,
                        'icon-direction-up': isUp,
                      }"
                    ></i
                  ></a>
                </li>
                <li :class="{ active: jiage }" @click="sort(2)">
                  <a
                    >价格<i
                      v-show="jiage"
                      class="iconfont"
                      :class="{
                        'icon-down': isDown,
                        'icon-direction-up': isUp,
                      }"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"
                      ><img v-lazy="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="cate.pageNo" :pageSize="cate.pageSize" :total="total" :continues="continues" @getPageInfo="getPageInfo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
import Pagination from "../../components/Pagination/index.vue";
export default {
  name: "MySearch",
  components: {
    SearchSelector,
    Pagination
},
  data() {
    return {
      continues:5,
      cate: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      total:(state)=>state.search.searchList.total
    }),
    zonghe() {
      return this.cate.order.indexOf("1") !== -1;
    },
    jiage() {
      return this.cate.order.indexOf("2") !== -1;
    },
    isUp() {
      return this.cate.order.indexOf("asc") !== -1;
    },
    isDown() {
      return this.cate.order.indexOf("desc") !== -1;
    },
  },
  methods: {
    getPageInfo(p){
      this.cate.pageNo = p
      this.getData()
    },
    sort(a) {
      if(a==1){
        if(this.cate.order.indexOf('1:desc')!==-1){
          this.cate.order = "1:asc"
        }else{
          this.cate.order = "1:desc"
        }
        // this.cate.order = this.isUp?"1:desc":"1:asc"
      }else{
        if(this.cate.order.indexOf('2:desc')!==-1){
          this.cate.order = "2:asc"
        }else{
          this.cate.order = "2:desc"
        }
      }
      this.getData();
    },
    // 搜索商品
    getData() {
      this.$store.dispatch("GetSearchList", this.cate);
    },
    del() {
      this.cate.categoryName = undefined;
      this.cate.category1Id = undefined;
      this.cate.category2Id = undefined;
      this.cate.category3Id = undefined;
      this.getData();
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    delKeyword() {
      this.cate.keyword = undefined;
      this.getData();
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
      this.$bus.$emit("clearSearch", false);
    },
    delTrademark() {
      this.cate.trademark = "";
      this.getData();
    },
    getAttr(attr, attrVal) {
      let prop = `${attr.attrId}:${attrVal}:${attr.attrName}`;
      if (this.cate.props.indexOf(prop) === -1) {
        this.cate.props.push(prop);
        this.getData();
      } else {
        alert("请勿重复勾选");
      }
    },
    delProp(index) {
      this.cate.props.splice(index, 1);
      this.getData();
    },
  },
  props:['keyword'],
  beforeMount() {
    Object.assign(this.cate, this.$route.query, this.keyword);
    // this.cate = {...this.$route.query,...this.$route.params}
    // console.log(this.cate);
  },
  mounted() {
    this.getData();
    this.$bus.$on("sendTradeName", (Trade) => {
      this.cate.trademark = `${Trade.tmId}:${Trade.tmName}`;
      this.getData();
      // this.$route.push({name:'search',query:{
      //   trademark:this.cate.trademark
      // }})
    });
  },
  watch: {
    $route: {
      // deep:true,
      handler() {
        Object.assign(this.cate, this.$route.query, this.$route.params);
        this.getData();
        this.cate.category1Id = undefined;
        this.cate.category2Id = undefined;
        this.cate.category3Id = undefined;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      
    }
  }
}
</style>
