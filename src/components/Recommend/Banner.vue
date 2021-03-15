<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="banner">
    <swiper-slide v-for="item in banners" :key="item.bannerId" class="item">
      <a :href="item.url">
        <img :src="item.pic" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'Banner',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      require: true
    }
  }
}
</script>

<style scoped lang="scss">
.banner{
  .item{
    img{
      width: 100%;
      height: 300px;
    }
  }

}
</style>
<style lang="scss">
  @import "src/assets/css/mixin";
  .swiper-pagination-bullet{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active{
    @include bg_color();
  }
</style>
