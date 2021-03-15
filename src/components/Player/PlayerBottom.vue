<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span ref="eleCurrentTime">00:00</span>
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot">
          </div>
        </div>
      </div>

      <span ref="eleTotalTime">00:00</span>
    </div>
    <div class="bottom-controll">
      <div class="mode loop" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div class="favorite" @click="favorite" :class="{'active' :isFavorite(currentSong)}"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/modeType'
import { formartTime } from '../../tools/tools'

export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurrentTime',
      'setFavoriteList'
    ]),
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    mode () {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else {
        this.setModeType(modeType.loop)
      }
    },
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    next () {
      this.setCurrentIndex(this.currentIndex + 1)
    },

    progressClick (event) {
      // 计算进度条位置
      // const normalLeft = event.target.offsetLeft
      const normalLeft = this.$refs.progressBar.offsetLeft
      const eventLeft = event.pageX
      const clickLeft = eventLeft - normalLeft
      // const progressWidth = event.target.offsetWidth
      const progressWidth = this.$refs.progressBar.offsetWidth
      const value = clickLeft / progressWidth
      this.$refs.progressLine.style.width = value * 100 + '%'
      // 计算应该从哪播放
      const currentTime = this.totalTime * value
      // console.log(currentTime)
      this.setCurrentTime(currentTime)
    },
    favorite () {
      this.setFavoriteList(this.currentSong)
    },
    isFavorite (song) {
      const result = this.favoriteList.find((currentValue) => {
        return currentValue.id === song.id
      })
      return result !== undefined
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex',
      'songs',
      'favoriteList',
      'currentSong'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    modeType (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.add('loop')
        this.$refs.mode.classList.remove('random')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.add('one')
        this.$refs.mode.classList.remove('loop')
      } else {
        this.$refs.mode.classList.add('random')
        this.$refs.mode.classList.remove('one')
      }
    },
    totalTime (newValue, oldValue) {
      const timeObj = formartTime(newValue)
      this.$refs.eleTotalTime.innerHTML = timeObj.minutes + ':' + timeObj.seconds
    },
    currentTime (newValue, oldValue) {
      // 1.格式化时间
      const timeObj = formartTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = timeObj.minutes + ':' + timeObj.seconds

      /** 修改进度条 */
      const value = parseInt(newValue / this.totalTime * 100)
      this.$refs.progressLine.style.width = value + '%'
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
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
  .player-bottom{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    .bottom-progress{
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        @include font_size($font_samll);
        @include font_color();
      }
      .progress-bar{
        width: 100%;
        margin: 0 10px;
        height: 10px;
        background: #fff;
        .progress-line{
          width: 0%;
          height: 100%;
          background: #000;
          position: relative;
          .progress-dot{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #000;
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translate(-50%,-50%);
          }
        }
      }
    }
    .bottom-controll{
      width: 80%;
      margin: 0 auto;
      padding: 50px 0;
      display: flex;
      justify-content: space-between;
      div{
        width: 84px;
        height: 84px;
        display: flex;
        justify-content: space-between;
      }
      .mode{
        &.loop{
          @include bg_img("../../assets/images/loop");
        }
        &.one{
          @include bg_img("../../assets/images/one");
        }
        &.random{
          @include bg_img("../../assets/images/shuffle");
        }
      }
      .prev{
        @include bg_img("../../assets/images/prev");
      }
      .next{
        @include bg_img("../../assets/images/next");
      }
      .play{
        @include bg_img("../../assets/images/play");
        &.active{
          @include bg_img("../../assets/images/pause");
        }
      }
      .favorite{
        @include bg_img("../../assets/images/un_favorite");
        &.active{
          @include bg_img("../../assets/images/favorite");
        }
      }

    }
  }

</style>
