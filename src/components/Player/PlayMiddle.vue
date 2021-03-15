<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="banner">
    <swiper-slide  class="cd">
      <div class="cd-warpper" ref="cdWrapper">
        <img :src="currentSong.picUrl" alt="">
      </div>
      <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide  class="lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul>
          <li v-for="(item,key) in currentLyric" :key="key" :class="{'active' :currentLineNum===key}">{{item}}</li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import ScrollView from '../ScrollView'
import { mapGetters } from 'vuex'
export default {
  name: 'PlayMiddle',
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOptions: {

        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNum: '0'
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyric'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWrapper.classList.add('active')
      } else {
        this.$refs.cdWrapper.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
      /**
      // 高亮歌词同步
      // console.log(Math.floor(newValue))
      const lineNum = Math.floor(newValue) + ''
      const result = this.currentLyric[lineNum]
      if (result !== undefined && result !== '') {
        this.currentLineNum = lineNum
        // 歌词滚动
        const currentLyricTop = document.querySelector('li.active').offsetTop
        const lyricHeight = this.$refs.lyric.$el.offsetHeight
        if (currentLyricTop > lyricHeight / 2) {
          this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 300)
        }
      }
       */
      const lineNum = Math.floor(newValue)
      this.currentLineNum = this.getActiveLineNum(lineNum)
      const currentLyricTop = document.querySelector('li.active').offsetTop
      const lyricHeight = this.$refs.lyric.$el.offsetHeight
      if (currentLyricTop > lyricHeight / 2) {
        this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 300)
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 0)
      }
    },
    currentLyric (newValue, oldValue) {
      for (const key in newValue) {
        this.currentLineNum = key
        return
      }
    }
  },
  methods: {
    getFirstLyric () {
      for (const item in this.currentLyric) {
        return this.currentLyric[item]
      }
    },
    getActiveLineNum (lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      const result = this.currentLyric[lineNum]
      if (result === undefined || result === '') {
        lineNum = this.getActiveLineNum(lineNum - 1)
        return lineNum
      } else {
        return lineNum + ''
      }
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
.banner{
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd{
    .cd-warpper{
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border:30px solid #fff;
      animation: sport 3s linear infinite;
      animation-play-state: paused;
      &.active{
        animation-play-state: running;
      }
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    p{
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin-top: 50px;
    }
  }
  .lyric{
    li{
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 20px 0 ;
      &:last-of-type{
        padding-bottom: 50%;
      }
      &.active{
        color: #fff;
      }
    }
  }

}
  @keyframes sport{
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
</style>
<style lang="scss">
  @import "../../assets/css/mixin";
  .my-bullet{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    margin: 0 20px;
  }
  .my-bullet-active{
    width: 60px;
    @include bg_color();
  }
</style>
