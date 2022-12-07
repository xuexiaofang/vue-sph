<template>
  <div class="floorBanner">
    <div class="swiper-container" id="floor1Swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="car in list" :key="car.id">
          <img :src="car.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "MyCarousel",
  props: ["list"],
  mounted(){
  },
  watch: {
    list: {
          immediate: true,
          handler() {
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            autoplay: true,
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>