<template>
  <transition  @enter="enter"   @leave="leave" :css="false">
    <div class="normal-player" v-show="this.isFullScreen" ref="normalPlayer">
      <div class="player-warpper">
        <PlayerHeader></PlayerHeader>
        <PlayMiddle :currentTime="currentTime"></PlayMiddle>
        <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl" alt="">
      </div>
    </div>
  </transition>

</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayMiddle from './PlayMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui.js'
export default {
  name: 'NormalPlayer',
  components: {
    PlayMiddle,
    PlayerHeader,
    PlayerBottom
  },
  computed: {
    ...mapGetters([
      'isFullScreen',
      'currentSong'
    ])
  },
  methods: {
    ...mapActions([
      'setSongLyric'
    ]),
    enter (el, done) {
      Velocity(el, 'transition.flipYIn', { duration: 1000 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 1000 }, function () {
        done()
      })
    }
  },
  watch: {
    currentSong (newValue, oldValue) {
      if (newValue.id === '') {
        return
      }
      // console.log(newValue)
      this.setSongLyric(newValue.id)
    }
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
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
  .normal-player{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    @include bg_sub_color();
    .player-warpper{
      width: 100%;
      height: 100%;
      z-index: 999;
    }
    .player-bg{
      width: 100%;
      height: 100%;
      img{
        position: absolute;
        left: 50%;
        top: 50%;
        height: 100%;
        transform: translate(-50%,-50%);
        filter: blur(30px);
      }
    }
  }

</style>
