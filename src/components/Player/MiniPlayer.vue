<template>
  <transition  @enter="enter"   @leave="leave" :css="false">
    <div class="mini-player" v-show="this.isShowMiniPlayer">
      <div class="play-warpper">
        <div class="player-left" @click="showNormalPlayer">
          <img :src="currentSong.picUrl" ref="img">
          <div class="player-title">
            <h3>{{currentSong.name}}</h3>
            <p>{{currentSong.singer}}</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play" @click="play" ref="play"></div>
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui.js'
export default {
  name: 'MiniPlayer',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setIsPlaying',
      'setListPlayer'
    ]),
    showList () {
      this.setListPlayer(true)
    },
    showNormalPlayer () {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.bounceIn', { duration: 1000 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 1000 }, function () {
        done()
      })
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying',
      'currentSong'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
        this.$refs.img.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.img.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .mini-player{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 150px;
    z-index: 999;
    @include bg_color();
    .play-warpper{
      width: 95%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .player-left{
        display: flex;
        justify-content: space-between;
        img{
         width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-right: 20px;
          animation: sport 3s linear infinite;
          animation-play-state: paused;
          &.active{
            animation-play-state: running;
          }
        }
        .player-title{
          display: flex;
          flex-direction: column;
          /*align-items: center;*/
          justify-content: center;
          h3{
            @include font_size($font_large);
            @include font_color();
            @include clamp(1);
          }
          p{
            @include font_size($font_medium_s);
            @include font_color();
            opacity: 0.6;
          }
        }

      }
      .player-right{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .play{
          width: 84px;
          height: 84px;
          @include bg_img("../../assets/images/play");
          &.active{
            @include bg_img("../../assets/images/pause");
          }
        }
        .list{
          width: 130px;
          height: 130px;
          @include bg_img("../../assets/images/list")
        }
      }
    }
  }
@keyframes sport {
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
