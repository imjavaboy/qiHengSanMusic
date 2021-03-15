<template>
  <transition  @enter="enter"   @leave="leave" :css="false">
    <div class="list-player" v-show="this.isShowListPlayer">
      <div class="player-wrapper">
        <div class="player-top">
          <div class="top-left">
            <div class="mode loop" @click="mode" ref="mode"></div>
            <p v-if="this.modeType === 0">顺序播放</p>
            <p v-else-if="this.modeType === 1">单曲循环</p>
            <p v-else>随机播放</p>
          </div>
          <div class="top-right">
            <div class="del" @click="delAll"></div>
          </div>
        </div>
        <div class="player-middle">
          <ScrollView ref="scrollView">
            <ul  ref="play">
              <li class="item" v-for="(item,index) in songs" :key="item.id" @click="selectMusic(index)">
                <div class="item-left">
                  <div class="item-play" @click="play" v-show="index === currentIndex"></div>
                  <p>{{item.name}}</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite" @click.stop="favorite(item)" :class="{'active' :isFavorite(item)}"></div>
                  <div class="item-del" @click.stop="del(index)"></div>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <div class="player-bottom">
          <p @click.stop="hidden">关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollView from '../ScrollView'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui.js'
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'ListPlayer',
  components: {
    ScrollView
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setListPlayer',
      'setDelSong',
      'setCurrentIndex',
      'setFavoriteList'
    ]),
    hidden () {
      this.setListPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.slideDownIn', { duration: 1000 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideDownOut', { duration: 1000 }, function () {
        done()
      })
    },
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
    del (index) {
      this.setDelSong(index)
    },
    delAll () {
      this.setDelSong()
    },
    selectMusic (index) {
      this.setCurrentIndex(index)
    },
    favorite (item) {
      this.setFavoriteList(item)
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
      'isShowListPlayer',
      'songs',
      'currentIndex',
      'currentSong',
      'favoriteList'
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
    isShowListPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.scrollView.refresh()
      }
    }

  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";

.list-player{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 999;
  height: 700px;
  overflow: hidden;
  @include bg_sub_color();
  .player-wrapper{
    height: 100%;
     .player-top{
       width: 100%;
       height: 100px;
       display: flex;
       justify-content: space-between;
       align-items: center;
       background: #fff;
       position: relative;
       z-index: 999;
       .top-left{
         display: flex;
         align-items: center;
         padding-left: 20px;
         .mode{
           width: 56px;
           height: 56px;
           margin-right: 20px;
           &.loop{
             @include bg_img('../../assets/images/small_loop');
           }
           &.one{
             @include bg_img('../../assets/images/small_one');
           }
           &.random{
             @include bg_img('../../assets/images/small_shuffle');
           }
         }
         p{
           @include font_color();
           @include font_size($font_medium_s);
         }
       }
       .top-right{
         .del{
           width: 84px;
           height: 84px;
           @include bg_img('../../assets/images/small_del');
         }
       }
     }
    .player-middle{
      height: 100%;
     ul{
       &.active{
         .item{
           .item-play{
             @include bg_img("../../assets/images/small_pause");
           }
         }
       }
     }
      .item{
        border-top: 1px solid #ccc;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left{
          display: flex;
         align-items: center;
          .item-play{
            width: 56px;
            height: 56px;
            @include bg_img("../../assets/images/small_play");
            margin-right: 20px;
          }
          p{
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .item-right{
          display: flex;
          align-items: center;
          .item-favorite{
            width: 56px;
            height: 56px;
            @include bg_img("../../assets/images/small_un_favorite");
            &.active{
              @include bg_img("../../assets/images/small_favorite");
            }

          }
          .item-del{
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img("../../assets/images/small_close");
          }
        }
      }
    }
    .player-bottom{
      width: 100%;
      height: 100px;
      line-height: 100px;
      position: fixed;
      left: 0;
      bottom: 0;
      @include bg_color();
      p{
        text-align: center;
        @include font_size($font_large);
       color: #fff;
      }
    }
  }
}
</style>
