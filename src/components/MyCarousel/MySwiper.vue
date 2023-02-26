<template>
    <div>
        <swiper class="banner" :options="swiperOption" ref="mySwiper">
            <swiper-slide  v-for="car in list" :key="car.id">
                <img :src="car.imgUrl" />
            </swiper-slide>
           <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>

    </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
  import "swiper/css/swiper.css";

export default {
    name: 'MySwiper',
    props:['list'],
    components:{
        swiper,
        swiperSlide
    },
    data() {
        return {
            swiperOption:{
                autoplay: true,
              speed: 300,//切换速度
              loop: true,
              pagination: {
                el: ".swiper-pagination", //分页器
                clickable: true,
                // type:'fraction',
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                },//前进后退按钮

            }

        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="less" scoped>
.banner{
   width:100%;
   height: 100%;
}
</style>