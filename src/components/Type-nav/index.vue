<template>
  <!-- 商品分类导航 -->
  <div>
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="notShow">
          <h2 class="all" @mouseenter="isShow">全部商品分类</h2>
          <div class="sort" v-show="show">
            <div class="all-sort-list2">
              <div
                @click="goSearch"
                class="item bo"
                v-for="(item, index) in categoryList.slice(0, 15)"
                :key="item.categoryId"
                @mouseenter="changeIndex(index)"
                :class="{ cur: currentId === index }"
              >
                <h3 @mouseenter="changeIndex(index)" style="padding: 0">
                  <a
                    :data-categoryName="item.categoryName"
                    :data-category1Id="item.categoryId"
                    style="width: 100%; display: inline-block"
                    >{{ item.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="c in item.categoryChild"
                    :key="c.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c.categoryName"
                          :data-category2Id="c.categoryId"
                          >{{ c.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c2 in c.categoryChild" :key="c2.categoryId">
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category3Id="c2.categoryId"
                            >{{ c2.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentId: -1,
      show: true,
    };
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会执行一次
      // 注入一个参数state，其实为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // changeIndex(index) {
    //   this.currentId = index;
    // },
    changeIndex: throttle(function (index) {
      this.currentId = index;
    }, 50),
    changeLeave() {
      this.currentId = -1;
    },
    goSearch(e) {
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      let location = { name: "search" };
      let query = { categoryName: categoryname };
      if (categoryname) {
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
      }
      location.query = query;
      if (this.$route.params) {
        location.params = this.$route.params;
      }
      this.$router.push(location);
    },
    isShow() {
      if (this.$route.path !== "/home") {
        this.show = true;
      }
    },
    notShow() {
      this.currentId = -1;
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background: rgb(16, 98, 131);
        }
      }
    }

    // //过渡动画开始状态（进入）
    // .sort-enter{
    //   height: 0% !important;
    // }
    // //过渡动画结束状态（进入）
    // .sort-enter-to{
    //   height: 461px !important;
    //   transform: rotate(360deg) !important;
    // }
    // //进入动画的时间、速率
    // .sort-enter-active{
    //   transition: all 0.5 linear !important;

    // }
  }
}
</style>